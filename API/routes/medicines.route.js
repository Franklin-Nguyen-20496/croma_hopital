'use strict';
const express = require('express');
const router = express.Router();
const config = require('config');
const redis = require('../helpers/redis.helper');
const medicinesController = require('../controllers/medicines.controller');

class Router {
    registerRouter() {

        router.get('/', (req, res) => {
            return medicinesController.getAll()
                .then(result => {
                    console.log(result)
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        });

        router.get('/id/:id', (req, res) => {
            return medicinesController.getById(req.params.id)
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        })

        router.post('/create', (req, res) => {
            return medicinesController.createOne(req.body)
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        })

        router.put('/update', (req, res) => {
            return medicinesController.update(req.body)
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        })

        router.delete('/delete/:id', (req, res) => {
            return medicinesController.delete(req.params.id)
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        })

        return router;
    }
}

module.exports = new Router().registerRouter();