'use strict';
const express = require('express');
const router = express.Router();
// const config = require('config');
// const redis = require('../helpers/redis.helper');
const roomsController = require('../controllers/rooms.controller');

class Router {
    registerRouter() {

        router.get('/', (req, res) => {
            return roomsController.getAll()
                .then(result => {
                    // console.log(result)
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        });

        router.get('/name/:name', (req, res) => {
            return roomsController.getOneByName(req.params.name)
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        })

        router.post('/create', (req, res) => {
            console.log('create rooms', req.body);
            return roomsController.createOne(req.body)
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        })

        router.delete('/delete/:id', (req, res) => {
            console.log(`delete rooms id ${req.params.id}`);
            return roomsController.deleteOne(req.params.id)
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        })

        return router;
    }
}

module.exports = new Router().registerRouter();