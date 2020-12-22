import React from 'react';
import './Form.scss';
import SongSuggestor from '../SongSuggestor/SongSuggestor';
import Header from '../Header/Header';
import Button from '../Button/Button';


class App extends React.Component {

  state = { 
    formInput: '',
    isCompleted: false,
  }

  handleSubmit = (e) => {
   

    console.log("logging formresults", e.target.formInput.value)

    if (!e.target.formInput.value) {
      return alert(`It's okay, you can tell us. Moody can't suggest a song without a bit of input from you. Don't worry, we won't tell anyone how you're feeling.`)
    }

    this.setState({ 
      isCompleted: true,
    });
  } 

  handleIpnutChange = (e) => {
    e.preventDefault();

    this.setState({ 
      formInput: e.target.value
    })
  }

  render() {
    if (this.state.isCompleted) {
      return (
        <SongSuggestor formInputText={this.state.formInput}/>
      );
    } 

    console.log("Logging state from form", this.state.formInput)
    return (

      <>
      <Header />
      <section className="section section--form">
        
        <h3 className="heading3">go on.</h3>
        <h3 className="heading3">tell it like it is.</h3>
        <p className="paragraph">
        In a few sentences, describe how your day has been. 
        With care, <span className="wordmark wordmark--inline">moody</span> will analyze how you’re feeling and suggest a song to suit your mood!
        </p>
        <form className="form" onSubmit={this.handleSubmit}>
          <textarea 
          className="form__input form__input--long" 
          name="formInput" 
          type="text"
          onChange={this.handleIpnutChange}
          value={this.state.formInput}
          placeholder={ this.state.formInput ? this.state.formInput : "I'm feeling a little heart-broken today."}>
            </textarea>
            
            <Button buttonType="submit" buttonText="read my thoughts" />
            
        </form>
    </section>
      </>
     
    );
  
  }

  
}

export default App;
