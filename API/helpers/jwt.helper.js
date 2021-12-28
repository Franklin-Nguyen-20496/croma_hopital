'use strict';
const jwt = require('jsonwebtoken');
const config = require('config');
const key = config.jwt;

class jwtHelper {

    setToken(value, time) {
        return jwt.sign(value, key.SECRET_KEY, { expiresIn: time })
    }

    verifyToken(token) {
        if (!token) return false
        try {
            const decoded = jwt.verify(token, key.SECRET_KEY)
            if (!decoded) {
                return false
            }
            return decoded;
        } catch (error) {
            return false
        }
    }
}

module.exports = new jwtHelper();