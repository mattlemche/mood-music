const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const axios = require('axios');

const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static('data'));

const moodData = './data/moody-moods.json'

app.get('/', (req, res) => {
    const data = fs.readFileSync(moodData);
    res.json(data);
});

// Post request to Sentiment API to return polarity to React App.

app.post('/mood', (req, res) => {
    console.log(req.body);
    const userSentence = req.body;
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    axios.post('https://sentim-api.herokuapp.com/api/v1/', userSentence, headers)
    .then(response => {
        console.log(response.data.result)
        const moodPolarity = response.data.result;
        return res.json(moodPolarity);
    })
    .catch(error => {
        console.log('Axios request to post at Senti-API error: ', error);
    });   
});



app.listen(port, () => {
    console.log(`Express is listening on ${port}`);
})