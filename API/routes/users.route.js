'use strict';
const express = require('express');
const router = express.Router();
const config = require('config');

const jwtHelper = require('../helpers/jwt.helper');
const middleware = require('../helpers/middleware');
const usersController = require('../controllers/users.controller');
const upload = require('../helpers/upload');

class Router {
    registerRouter() {

        router.get('/', async (req, res) => {
            // console.log('res.locals.role', res.locals.role);

            return usersController.getAll()
                .then((result) => {
                    console.log('res.locals.role', res.locals.role)
                    if (res.locals.role && res.locals.role === config.role.ADMIN) {
                        // console.log('result', result);
                        return res.status(200).json(result);
                    }
                    else {
                        return res.status(401).json({
                            message: 'token_not_valid'
                        });
                    }

                })
                .catch((error) => {
                    console.error('error in get all users', error);
                })

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
            if (res.locals.role && res.locals.role === config.role.ADMIN) {
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
            }
            else {
                return res.status(401).json({ message: 'token_not_valid' });
            }
        })

        return router;
    }
}

module.exports = new Router().registerRouter();