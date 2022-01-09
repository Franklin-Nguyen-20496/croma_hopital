'use strict';
const db = require('../model');
const bcrypt = require('bcrypt');
const jwtHelper = require('../helpers/jwt.helper');
const jwt = require('jsonwebtoken');
const config = require('config')

class AuthController {

    async login(value) {
        try {
            const user = await db.users.findOne({ email: value.email });
            if (!user) return false;
            // if(!user || d) return null;
            console.log('user', user);

            const compare = await bcrypt.compare(value.password, user.password);
            console.log('compare', compare);
            if (!compare) {
                return false;
            }
            const { email, role } = user;
            const access_token = await jwtHelper.setToken({ email, role }, '24h');
            const refresh_token = await jwtHelper.setToken({ email, role }, '24h');
            const login = await db.auths.create({ token: refresh_token });
            console.log(access_token, refresh_token, login);
            return {
                access_token,
                refresh_token,
                data: user,
            };
        }
        catch (err) {
            console.log(err);
        }
    }

    async logout(body) {
        try {
            if (body.token) {
                await db.auths.deleteOne({ token: body.token });
                return {
                    status: 200,
                    message: 'logout success'
                };
            }
            else {
                return {
                    status: 200,
                    message: 'logout success'
                };
            }

        } catch (err) {
            console.log(err);
            return {
                status: 401,
                message: 'something wrong to auth controller',
            }
        }
    }

    async refresh(body) {
        try {
            let result = false;
            if (body.token) {
                console.log('body.token', body.token);
                await db.auths.deleteOne({ token: body.token });

                await jwt.verify(body.token, config.jwt.SECRET_KEY, async (err, data) => {
                    try {
                        // res.locals.role = data.role;
                        console.log(err, data);
                        // if (err) res.sendStatus(401); // Not authorized
                        if (data) {
                            const user = await db.users.findOne({ email: data.email });
                            const { email, role } = data;
                            const access_token = await jwtHelper.setToken({ email, role }, '24h');
                            const refresh_token = await jwtHelper.setToken({ email, role }, '24h');
                            await db.auths.create({ token: refresh_token });
                            console.log('access_token', access_token);
                            console.log('refresh_token', refresh_token);
                            result = {
                                access_token,
                                refresh_token,
                                data: user,
                            };
                        }
                        else {
                            result = false;
                        }
                    } catch (error) {
                        console.log(error);
                    }
                })
            }
            return result;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new AuthController();