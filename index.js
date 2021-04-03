const express = require('express');
const Datastore = require('nedb');

const app = express();

app.listen(3000, () => console.log("Listening at 3000"));

app.use(express.static('public'));

app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (req, res) => {
    console.log(req.body);
    database.insert(req.body);
    res.json({
        status: "success",
        latitude: req.body.lat,
        longitude: req.body.long,
        timestamp: req.body.timestamp
    });
});