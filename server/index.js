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
                return 'blues';
            } else if (polarity >= -0.7 && polarity <= -0.5) {
                return 'singer-songwriter';
            } else if (polarity >= -0.4 && polarity <= -0.2) {
                return 'alternative';
            } else if (polarity >= -0.1 && polarity <= 0.1) {
                return 'chillout';
            } else if (polarity >= 0.2 && polarity <= 0.4) {
                return 'jazz';
            } else if (polarity >= 0.5 && polarity <= 0.7) {
                return 'pop';
            } else if (polarity >= 0.8 && polarity <= 1) {
                return 'dance';
            } else {
                return 'psychedelic';
            }
        }

        const genre = genreFinder(response);

        return genre

    }).then(response => {
        console.log(response);

        axios.get(genreRequest(response))
        .then(response => {

            

            
            const randomSong = response.data.tracks.track[getRandomNumber(0, response.data.tracks.track.length)]
            console.log(randomSong);
            return res.send(randomSong);
        })
    })
    .catch(error => {
        console.log('Axios request to post at Senti-API error: ', error);
    });   
});



app.listen(port, () => {
    console.log(`Express is listening on ${port}`);
})