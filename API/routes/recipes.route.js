'use strict';
const express = require('express');
const router = express.Router();
const config = require('config');
const recipesController = require('../controllers/recipes.controller')

class Router {
    registerRouter() {

        router.get('/', (req, res) => {
            return recipesController.getAll()
                .then(result => {
                    // console.log(result)
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        });

        router.post('/create', (req, res) => {
            console.log('req.body in recipes create', req.body)
            return recipesController.create(req.body)
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => console.log(err))
        })

        router.put('/update', (req, res) => {
            console.log('req.body in recipes update', req.body);
            return recipesController.update(req.body)
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => console.log(err))
        })

        return router;
    }
}

module.exports = new Router().registerRouter();