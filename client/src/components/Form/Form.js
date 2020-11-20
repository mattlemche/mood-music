import React from 'react';
import './Form.css';
// import axios from 'axios';
import SongSuggestor from '../SongSuggestor/SongSuggestor';

// const API_URL = 'http://localhost:8080/'

class App extends React.Component {

  state = { 
    formInput: '',
  }

  componentDidMount() {
    // const headers = {
    //   "Accept": "application/json",
    //   "Content-Type": "application/json"
    // }

    // const body = {
    //   text: "my mood is sad."
    // }
    // axios.post('https://sentim-api.herokuapp.com/api/v1/', body, headers )
    // .then(response => {
    //   console.log(response.data.result.polarity);
    // })
    // .catch(error => console.log(error));
  }


  handleTextInput = (e) => {
    e.preventDefault();

    this.setState({ 
      formInput: e.target.formInput.value
    });


    // const headers = {
    //   "Accept": "application/json",
    //   "Content-Type": "application/json"
    // }

    // const body = {
    //   text: e.target.formInput.value
    // }
    // axios.post(`${API_URL}mood`, body, headers)
    
    // .then((response) => {
    //   console.log(`${API_URL}mood`)
    //   console.log(response);
    // });
  } 

  

  render() {
    if (this.state.formInput) {
      return (
        <SongSuggestor formInputText={this.state.formInput}/>
      );
     
    } 
    return (
      
      <div>
        <h3 className="form___title">go on.</h3>
        <h3 className="form___title">tell it like it is.</h3>
        <p className="form__instructions">
        Describe how you’re feeling and <span>moody</span> will analyze how you’re feeling. We’ll select the perfect music to go with what’s happing for you right now. 

        </p>
        <form onSubmit={this.handleTextInput}>
          <textarea className="form" name="formInput" type="text" rows="10">
            </textarea>
          <button type="submit">Read my thoughts</button>
        </form>
      </div>
    );
  }

  
}

export default App;
