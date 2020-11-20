const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const axios = require('axios');
const { Console } = require('console');

const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static('data'));

const moodData = './data/moody-moods.json';

const MOOD_URL = 'https://sentim-api.herokuapp.com/api/v1/';
const MUSIC_URL = 'http://ws.audioscrobbler.com/2.0/';
const MUSIC_API_KEY = 'f74d19587688118fb25cbc705319d2df';
const genreRequest = (genre) => {
    return `${MUSIC_URL}?method=tag.gettoptracks&tag=${genre}&api_key=${MUSIC_API_KEY}&format=json`
};


app.get('/', (req, res) => {
    const data = fs.readFileSync(moodData);
    res.json(data);
});

// Post request to Sentiment API to return polarity to React App.

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

app.post('/mood', (req, res) => {
    const userSentence = req.body;
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    axios.post(MOOD_URL, userSentence, headers)
    .then(response => {
        console.log(response.data.result)
        const moodPolarity = response.data.result;
        return moodPolarity.polarity;

    }).then(response => {

        const genreFinder = (polarity) => {
            if (polarity >= -1 && polarity <= -0.8) {
                return {
                    genre: 'blues',
                    mood: "hanging on by a thread"
                };
            } else if (polarity >= -0.7 && polarity <= -0.5) {
                return {
                    genre: 'singer-songwriter',
                    mood: "down in the dumps"
                };
            } else if (polarity >= -0.4 && polarity <= -0.2) {
                return {
                    genre: 'alternative',
                    mood: "a weenie bit low"
                };
            } else if (polarity >= -0.1 && polarity <= 0.1) {
                return {
                    genre: 'chillout',
                    mood: "melancholy, yet hopeful"
                };
            } else if (polarity >= 0.2 && polarity <= 0.4) {
                return {
                    genre: 'jazz',
                    mood: "things are looking up"
                };
            } else if (polarity >= 0.5 && polarity <= 0.7) {
                return {
                    genre: 'pop',
                    mood: "feeling like sunshine"
                };
            } else if (polarity >= 0.8 && polarity <= 1) {
                return {
                    genre: 'dance',
                    mood: "jumping for joy"
                };
            } else {
                return {
                    genre: 'blues',
                    mood: "down in the dumps"
                };
            }
        }

        const genre = genreFinder(response);

        return genre

    }).then(response => {
        console.log(response);
        
        const moodMessage = response.mood

        axios.get(genreRequest(response.genre))
        .then(response => {

            // finds a random index in song array
            const randomSong = response.data.tracks.track[getRandomNumber(0, response.data.tracks.track.length)];

            // adds mood message to song object
            const songAndMood = { ...randomSong, mood: moodMessage };
            console.log(songAndMood);
            return res.send(songAndMood);
        })
    })
    .catch(error => {
        console.log('Axios request to post at Senti-API error: ', error);
    });   
});



app.listen(port, () => {
    console.log(`Express is listening on ${port}`);
})