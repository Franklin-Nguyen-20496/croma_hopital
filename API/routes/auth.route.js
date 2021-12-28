'use strict';
const express = require('express');
const router = express.Router();

const middleware = require('../helpers/middleware')
const authController = require('../controllers/auth.controller');

class Router {
    registerRouter() {

        router.post('/login', (req, res) => {
            console.log('req.body', req.body)
            return authController.login(req.body)
                .then((result) => {
                    if (!result) {
                        console.log('result', result);
                        res.status(401).json({
                            message: 'invalid email or password',
                        })
                    }
                    else {
                        console.log('result', result);
                        res.status(200).json(result);
                    }
                })
                .catch((error) => {
                    console.error('error in get all users', error);
                })
        });

        router.post('/logout', (req, res) => {
            console.log('req.body log out', req.body);
            return authController.logout(req.body)
                .then(result => res.status(200).json(result))
                .catch(error => {
                    console.log(error);
                })
        });

        router.post('/refresh', (req, res) => {
            console.log('req.body refresh', req.body);
            return authController.refresh(req.body)
                .then(result => {
                    if (result) res.status(200).json(result);
                    else res.status(403).json({ message: 'Forbidden' })
                })
                .catch(error => {
                    console.log(error);
                })
        })

        return router;
    }
}

module.exports = new Router().registerRouter();