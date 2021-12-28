'use strict';
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const authSchema = new schema({
    token: {
        type: String,
        required: [true, "Invalid token"],
    }
})

module.exports = authSchema;