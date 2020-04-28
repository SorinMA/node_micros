const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
const port = 3002
const dbUrl = "mongodb://localhost:27017/c19";

app.get('/', (req, res) => {
    // home screen - show curent data
    try {
        MongoClient.connect(dbUrl, function(err, db) {
            if (err) console.log(err);
            
            let dbo = db.db("c19");
            dbo.collection("c19").find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result);
                db.close();
              });
        });  
    } catch (e) {
        res.send(e);
    }
})

app.put('/dbManager', (req, res) => {
    try {
        MongoClient.connect(dbUrl, function(err, db) {
            if (err) console.log(err);
            
            let dbo = db.db("c19");
            if (dbo.collection('c19').find() == false)
                dbo.createCollection("c19", function(err, res) {
                    if (err) throw err;
                    console.log("c19 Collection created!");
                });
            else {
                try {
                    var inset_to = { date: String(req.param('date')), new_deaths: String(req.param('new_deaths')), new_healed: String(req.param('new_healed')) }; // will be replaced with req
                } catch(e) {
                    res.send(e);
                }
                dbo.collection("c19").insertOne(inset_to, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
                }); 

                res.send(200);
            }
           
        });
    } catch (e) {
        res.send(e);
    }
})


app.listen(port, () => console.log(`dbManager on at http://localhost:${port}`))