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
                <p className="mood-label">your moody mood is</p>
                <h2 className="mood">{object.data.mood}</h2>
                <div className="song-suggest">
                    <p className="song-label">Your mood suggests the song</p>
                <h1 className="song-title">{object.data.name}</h1>
                <p className="song-label">by</p>
                <h3 className="artist-name">{object.data.artist.name}</h3>
                </div>
                
                
                
                <a href={object.data.url} className="small-link">View song on Last.fm</a>
            </>
        )
    }

    

    
    
    render() {

        if (!this.state.mood) {
                return (
                    <div className="loading-container">
                        <h1 className="loading">processing your feelings</h1>
                    </div>
                    
                )
        }
        
        
            if (this.state.mood) {
                return (
                    <div className="mood-outcome">
                       {this.moodSongCreator(this.state.songObj)}
                       <Link exact="true" to='/' className="link">I have more thoughts</Link>
                    </div>
                );
            }
     

       
        
    }
    
};

export default SongSuggestor;