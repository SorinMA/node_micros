const express = require('express')
const request = require('request');
const app = express()
const port = 3001
const api_url = 'https://api.covid19api.com/summary'

app.get('/', (req, res) => {
    // home screen - show curent data
    res.send('c19api_on: retrive update from /c19api via post request')
})

app.get('/c19api', (req, res) => {
    // get news
    try {
        request(api_url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
            res.send(info['Global'])
            }
        })
    } catch (e) {
        res.send(e)
    }
})


app.listen(port, () => console.log(`C19api on at http://localhost:${port}`))