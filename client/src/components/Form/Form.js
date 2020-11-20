

import React, { Component } from 'react';

class Form extends Component {
    state = {
        mood: "",
        success: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            mood: e.target.mood.value,
            success: true
        }, () => console.log('submitted mood', this.state))

        e.target.reset();
        setInterval(() => this.props.history.push('/videoplayer'), 5000)
    }

    render() {
        return (
            <form onSubmit = {this.handleSubmit}>
            <h1>How is your mood</h1>
            <label htmlFor="mood"> 😃 Happy
                <input type="radio" label="happy" name="mood" value= "happy" />
            </label>
            <label htmlFor="mood"> 😍 In Love
                <input type="radio" name="mood" value="inLove" />
            </label>
            <label htmlFor="mood"> 😉 Naughty
                <input type="radio" name="mood" value= "naughty" />
            </label>
            <label htmlFor="mood"> 😇 Angelic
                <input type="radio" name="mood" value="angelic" />
            </label>
            <label htmlFor="mood"> 🤩 Inspired
                <input type="radio" name="mood" value= "inspired" />
            </label>
            <label htmlFor="mood"> 🥶 Cold 
                <input type="radio" name="mood" value="cold" />
            </label>
            <div>{this.state.success  && <p>Generating your Mood ⏳</p>}</div>
            <button type="submit">Submit</button>
        </form>
        );
    }
}

export default Form;