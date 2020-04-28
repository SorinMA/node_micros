const express = require('express')
const request = require('request');
const ip = require('ip')
const app = express()
const port = 3000
let infos = undefined

app.get('/', (req, res) => {
    // home screen - show curent data
    try {
        request('http://' + String(ip.address()) + ':3002/', function (error, response, body) {
            if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
            res.send(info)
            } else {
                res.send(String(ip.address()) + ':3002/  0 response')
            }
        })
    } catch (e) {
        console.log(String(ip.address()) + ':3002/  0 response')
        res.send(e)
    }
})

app.get('/get_news', (req, res) => {
    // get news
    try {
        request('http://' + String(ip.address()) + ':3001/c19api', function (error, response, body) {
            if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
            infos = info
            res.send(info)
            } else {
                res.send(String(ip.address()) + ':3001/c19api  0 response')
            }
        })
    } catch (e) {
        console.log(String(ip.address()) + ':3001/c19api  0 response')
        res.send(e)
    }
})

app.get('/save_latest', (req, res) => {
    // save what we got to db
    console.log(infos)
    console.log('http://' + String(ip.address()) + ':3002/dbManager?date='+String(Date.now())+'&new_deaths='+String(infos[0])+'&new_healed='+String(infos['NewRecovered']))
    try {
        request.put('http://' + String(ip.address()) + ':3002/dbManager?date='+
        String(Date.now())+'&new_deaths='+String(infos['NewDeaths'])+
        '&new_healed='+String(infos['NewRecovered']), function (error, response, body) {
            if (!error && response.statusCode == 200) {
            res.sendStatus(200)
            } else {
                res.send(String(ip.address()) + ':3002/save_latest  0 response-')
            }
        })
    } catch (e) {
        console.log(String(ip.address()) + ':3002/save_latest  0 response')
        res.send(e)
    }
})

app.listen(port, () => console.log(`Controller on at http://localhost:${port}`))