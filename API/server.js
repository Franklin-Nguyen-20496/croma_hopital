'use strict';
const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
var bodyParser = require('body-parser')
const { verifyRole } = require('./helpers/middleware');

const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

const app = express();

let gfs;

const port = process.env.PORT || 5000;

// only allow port 3000
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

// MIDDLEWARE PLUGIN
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// logger every thing in request
app.use(morgan('combined'));
// use myself middleware
app.use(verifyRole);

// add routes
const routerIndex = require('./routes')(app);
routerIndex.registerRoutes();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// Connect, init models and init Database'
console.log('connect mongoDB');
const db = require('./model');
db.connect();

// open gate to read stream imgs
const conn = mongoose.connection;
// console.log('mongoose.connection', mongoose.connection);

conn.once('open', function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('photos');
    console.log('inited gfs collection');
})

app.get('/file/:filename', async (req, res) => {
    try {
        console.log('in get img');
        const file = await gfs.files.findOne({
            filename: req.params.filename
        });
        // console.log('gfs', gfs);
        const readStream = gfs.createReadStream(file.filename);
        // console.log('readStream', readStream);
        readStream.pipe(res);
    } catch (error) {
        console.log('error', error)
        res.send('not found');
    }
})

app.delete('/file/:filename', async (req, res) => {
    try {
        await gfs.files.deleteOne({
            filename: req.params.filename
        });
        res.send('delete success');
    } catch (error) {
        console.log(error);
        res.send('An error in delete file photo');
    }
})