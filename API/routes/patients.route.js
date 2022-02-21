'use strict';
const express = require('express');
const router = express.Router();
const config = require('config');
const redis = require('../helpers/redis.helper')
const patientsController = require('../controllers/patients.controller')

class Router {
    registerRouter() {

        router.get('/', (req, res) => {
            console.log('req.query in patients', req.query)
            return patientsController.getAll(req.query)
                .then(result => {
                    // console.log(result)
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        });

        router.put('/update/:id', (req, res) => {
            return patientsController.updateOne(req.body)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => console.log(err));
        })

        router.get('/:id', (req, res) => {
            return patientsController.getOne(req.params.id)
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => console.log(err))
        })

        return router;
    }
}

module.exports = new Router().registerRouter();