'use strict';
const jwt = require('jsonwebtoken');
const config = require('config');
const key = config.jwt;

class Middleware {
    async verifyRole(req, res, next) {
        try {
            const authorizationHeader = req.headers['authorization'];
            if (authorizationHeader) {
                // console.log('authorization', authorizationHeader);
                const tokenHeader = authorizationHeader.split(' ')[1];
                if (!tokenHeader) {
                    res.locals.role = 6;
                }
                else {
                    await jwt.verify(tokenHeader, key.SECRET_KEY, (err, data) => {

                        console.log(err, data);

                        if (err) {
                            res.locals.role = null;
                        }
                        else {
                            res.locals.role = data.role;
                        }
                    })
                }
            }
            next();
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = new Middleware();