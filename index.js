const express = require('express');
const Datastore = require('nedb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening at ${port}`));

app.use(express.static('public'));

app.use(express.json({limit: '1mb'}));

const database = new Datastore({ filename: 'database.db', autoload: true });
database.persistence.setAutocompactionInterval(5);
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