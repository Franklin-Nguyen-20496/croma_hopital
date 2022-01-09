'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('config');
const http = require('http');
// var socket = require('socket.io');

// import from helper
// const redis = require('./helpers/redis.helper');
const { verifyRole } = require('./helpers/middleware');

const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

const app = express();

let gridFile;

const port = process.env.PORT || 5000;

// only allow port 3000
const corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));


const httpServer = http.createServer(app);

// MIDDLEWARE PLUGIN
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// logger every thing in request
app.use(morgan('combined'));
// use myself middleware
app.use(verifyRole);

// add routes
const routerIndex = require('./routes')(app);
routerIndex.registerRoutes();

httpServer.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

const socket = require('./controllers/socket.controller');
const io = socket(httpServer, {
    cors: {
        origin: config.clientSide || 'http://localhost:3000',
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

io.init();

// Connect, init models and init Database'
console.log('connect mongoDB');
const db = require('./model');
db.connect();

// open gate to read stream imgs
const conn = mongoose.connection;

conn.once('open', function () {
    gridFile = Grid(conn.db, mongoose.mongo);
    gridFile.collection('photos');
    console.log('inited gfs collection');
})

app.get('/file/:filename', async (req, res) => {
    try {
        console.log('in get img');
        const file = await gridFile.files.findOne({
            filename: req.params.filename
        });

        const readStream = gridFile.createReadStream(file.filename);

        readStream.pipe(res);
    } catch (error) {
        console.log('error', error)
        res.send('not found');
    }
})

app.delete('/file/:filename', async (req, res) => {
    try {
        await gridFile.files.deleteOne({
            filename: req.params.filename
        });
        res.send('delete success');
    } catch (error) {
        console.log(error);
        res.send('An error in delete file photo');
    }
})
