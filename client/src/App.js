import React from 'react';
import './App.css';
import axios from 'axios';

const API_URL = 'http://localhost:8080/'

class App extends React.Component {

  componentDidMount() {
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }

    const body = {
      text: "my mood is sad."
    }
    axios.post('https://sentim-api.herokuapp.com/api/v1/', body, headers )
    .then(response => {
      console.log(response.data.result.polarity);
    })
    .catch(error => console.log(error));
  }

  handleTextInput = (e) => {
    e.preventDefault();

    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }

    const body = {
      text: e.target.formInput.value
    }
    axios.post(`${API_URL}mood`, body, headers)
    
    .then((response) => {
      console.log(`${API_URL}mood`)
      console.log(response);
    })
  } 

  render() {
    return (
      <div>
        <h1>Is this working?</h1>
        <form onSubmit={this.handleTextInput}>
          <textarea className="form" name="formInput" type="text" rows="10">
            </textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  
}

export default App;
