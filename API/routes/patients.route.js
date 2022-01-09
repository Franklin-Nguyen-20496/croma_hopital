'use strict';
const express = require('express');
const router = express.Router();
const config = require('config');
const redis = require('../helpers/redis.helper')
const patientsController = require('../controllers/patients.controller')

class Router {
    registerRouter() {

        router.get('/', (req, res) => {
            return patientsController.getAll()
                .then(result => {
                    // console.log(result)
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        });

        return router;
    }
}

module.exports = new Router().registerRouter();