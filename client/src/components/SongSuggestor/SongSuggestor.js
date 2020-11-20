import React from 'react';
import './SongSuggestor.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

const API_URL = 'http://localhost:8080/'

class SongSuggestor extends React.Component {

    state = {
        songObj:{},
        mood: '',
    }

    moodSongGetter = (text) => {
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
      
          const body = {
            text: text
          }
          axios.post(`${API_URL}mood`, body, headers)
          
          .then((response) => {
            // console.log(`${API_URL}mood`)
            // console.log(response);
            
            this.setState({ 
                songObj: response,
                mood: response.data.mood,
            })

          })
          .then(response => {
              console.log(this.state.songObj)
          });
    }

    componentDidMount() {
        this.moodSongGetter(this.props.formInputText);
    }


    moodSongCreator = (object) => {

        // console.log("This should be artist name", object.data.artist.name)
        return (
            <>
                <p className="mood__label">your moody mood is</p>
                <h2>{object.data.mood}</h2>
                <h1>{object.data.name}</h1>
                
                <h3>{object.data.artist.name}</h3>
                <a href={object.data.url}>View song on Last.fm</a>
            </>
        )
    }

    

    
    
    render() {

        if (!this.state.mood) {
            return (
                <h1>SOrry, loading</h1>
            )
        } 

        if (this.state.mood) {
            return (
                <div>
                   {this.moodSongCreator(this.state.songObj)}
                   <Link exact="true" to='/'>I have more thoughts</Link>
                </div>
            );
        }
        
    }
    
};

export default SongSuggestor;