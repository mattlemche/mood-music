import React from 'react';
import './SongSuggestor.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Header from '../Header/Header';



const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://moody-music-app.herokuapp.com/moody-api/'
    : 'http://localhost:5000/moody-api/';
// const API_URL = 'https://moody-music-app.herokuapp.com/moody-api/';



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
            
            this.setState({ 
                songObj: response,
                mood: response.data.moodMessage.mood,
            })

            return response;

          })
          .catch(err => console.log(err));
    }

    componentDidMount() {
        this.moodSongGetter(this.props.history.location.state.text);
        
    }


    moodSongCreator = (object) => {

        return (
            <>

            <div className="mood">
                    <p className="mood__label">your moody-mood is</p>
                    <h2 className="mood__result">{this.state.mood}</h2>
            </div>

            <div className='result'>                
                <div className="song">
                    <p className="song__label">Your mood suggests the song</p>
                    <h1 className="song__title">{object.data.name}</h1>
                    <p className="song__label">by</p>
                    <h3 className="song__artist">{object.data.artist.name}</h3>
                </div>
                
                <a href={object.data.url} rel="noreferrer" target="_blank" className="link link--small">View song on Last.fm</a>
            </div>
            
            </>
        )
    }

    

    
    
    render() {

        if (!this.state.mood) {
                return (
                    <>
                        <Header />
                        <section className="section section--loading">
                            <h1 className="heading1">...processing your feelings</h1>
                        </section>
                    </>
                    
                    
                )
        }
        
        
        if (this.state.mood) {
            return (
                <>
                    <Header />
                    <section className=" section section--mood-outcome">
                        {this.moodSongCreator(this.state.songObj)}
                        <div>
                            <p className="mood__label">
                                Change of heart?
                            </p>
                            <Link exact="true" to='/' className="link">
                            <Button buttonText="I have more thoughts" />
                                </Link>
                        </div>
                        
                    </section>
                
                </>
                
            );
        }
     

       
        
    }
    
};

export default SongSuggestor;