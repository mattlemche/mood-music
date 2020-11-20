import React from 'react';
import './Form.css';
// import axios from 'axios';
import SongSuggestor from '../SongSuggestor/SongSuggestor';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo/moody-logo.svg';

// const API_URL = 'http://localhost:8080/'

class App extends React.Component {

  state = { 
    formInput: '',
  }

  handleTextInput = (e) => {
    e.preventDefault();

    this.setState({ 
      formInput: e.target.formInput.value
    });
  } 

  

  render() {
    if (this.state.formInput) {
      return (
        <SongSuggestor formInputText={this.state.formInput}/>
      );
     
    } 
    return (
      <div className="form-div">
        <img src={logo} alt="moody logo" className="logo logo--link"/>
        <h3 className="form-title">go on.</h3>
        <h3 className="form-title">tell it like it is.</h3>
        <p className="form-instructions">
        In a few sentences, describe how your day has been. <span>moody</span> will analyze how you’re feeling and suggest a song to suit your mood!
        </p>
        <form className="form-form" onSubmit={this.handleTextInput}>
          <textarea className="form" name="formInput" type="text">
            </textarea>
          <button className="button" type="submit">Read my thoughts</button>
        </form>
    </div>
    );
  
  }

  
}

export default App;
