'use strict';
const config = require('config');
const bcrypt = require('bcrypt');

class passwordHelper {
    hashPassword(value) {
        return bcrypt.hash(value, config.bcrypt.SALT_ROUNDS, (err, hashed) => {
            if (err) next(err);
            console.log('password-hashed', hashed);
            return hashed;
        })
    }
}

module.exports = new passwordHelper();