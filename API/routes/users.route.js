'use strict';
const express = require('express');
const router = express.Router();
const config = require('config');
const createClient = require('redis');

const usersController = require('../controllers/users.controller');
const upload = require('../helpers/upload');
const jwtHelper = require('../helpers/jwt.helper');
const middleware = require('../helpers/middleware');

class Router {
    registerRouter() {

        router.get('/', async (req, res) => {

            // console.log('res.locals.role', res.locals.role);
            if (!res.locals.role) {
                return res.status(401).json({ message: 'token_not_valid' });
            } else
                if (res.locals.role === config.role.ADMIN) {
                    return usersController.getAll()
                        .then(result => {
                            // console.log(result)
                            res.status(200).send(result);
                        })
                        .catch(err => console.log(err))
                }
                else {
                    return res.status(403).json({ message: 'Forbidden' });
                }
        })

        router.post('/create', (req, res) => {
            console.log('req.locals.role', res.locals.role);
            if (res.locals.role && res.locals.role === config.role.ADMIN) {
                return usersController.createUser(req.body)
                    .then((result) => {
                        if (!result) return res.status(405)
                            .json('Method not allowed, may be email already valid'); //Method not allowed
                        else return res.status(200).json(result);
                    })
                    .catch((error) => {
                        console.error('error in create a user', error);
                    })
            }
            else {
                return res.status(401).json({ message: 'token_not_valid' });
            }
        })

        router.put('/update/:id', (req, res) => {
            console.log('req.locals.role', res.locals.role);
            if (res.locals.role &&
                (res.locals.role === config.role.ADMIN || res.locals.role === config.role.DEAN || res.locals.role === config.role.DOCTOR)
            ) {
                return usersController.updateUser(req.body, req.params.id)
                    .then((result) => {
                        if (result.data) {
                            return res.status(200).json(result);
                        }
                        return res.status(403).json(result);
                    })
                    .catch((error) => {
                        console.error('error in create a user', error);
                    })
            }
            else {
                return res.status(401).json({ message: 'token_not_valid' });
            }
        })

        router.delete('/delete/:id', (req, res) => {
            console.log('req.locals.role', res.locals.role);
            if (res.locals.role && res.locals.role === config.role.ADMIN) {
                return usersController.deleteUser(req.params.id)
                    .then(result => {
                        if (result) return res.status(200).json({ message: result });
                        else return res.status(403).json({ message: result });
                    })
                    .catch(err => console.log(err))
            }
            else {
                return res.status(401).json({ message: 'token_not_valid' });
            }
        })

        // get users doctor
        router.get('/doctors', (req, res) => {
            return usersController.getAllDoctors()
                .then(result => {
                    console.log('result in get all doctors', result)
                    res.status(200).json(result)
                })
                .catch(err => console.log(err))
        })

        // get users- all nurses
        router.get('/nurses', (req, res) => {
            return usersController.getAllNurses()
                .then(result => {
                    console.log('result in get all nurses', result)
                    res.status(200).json(result)
                })
                .catch(err => console.log(err))
        })

        router.get('/id/:id', (req, res) => {
            return usersController.getById(req.params.id)
                .then(result => {
                    // console.log('result in get user by id', result)
                    res.status(200).json(result)
                })
                .catch(err => console.log(err))
        })

        return router;
    }
}

module.exports = new Router().registerRouter();