import React from 'react';
import './SongSuggestor.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Header from '../Header/Header';

const API_URL = 'https://moody-music-app.herokuapp.com/'

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
                mood: response.data.moodMessage.mood,
            })

            return response;

          })
          .then(response => {
              console.log(this.state.songObj)
          })
          .catch(err => console.log(err));
    }

    componentDidMount() {
        this.moodSongGetter(this.props.formInputText);
    }


    moodSongCreator = (object) => {

        console.log("Loggin state obj", object.data.moodMessage.mood)

        return (
            <>

            <div className="mood">
                    <p className="mood__label">your moody-mood is</p>
                    <h2 className={ this.state.mood ? `mood__result mood__result--${object.data.moodMessage.genre}` : 'mood__result'}>{this.state.mood}</h2>
            </div>

            <div className='result'>                
                <div className={ this.state.mood ? `song song--${object.data.moodMessage.genre}` : 'song'}>
                    <p className="song__label">Your mood suggests the song</p>
                    <h1 className="song__title">{object.data.name}</h1>
                    <p className="song__label">by</p>
                    <h3 className="song__artist">{object.data.artist.name}</h3>
                </div>
                
                <a href={object.data.url} className="link link--small">View song on Last.fm</a>
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