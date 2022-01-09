'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const waitingPatientSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please fill a full name"],
    },
    phone: {
        type: String,
        required: [true, "Please type your number"],
        unique: [true, "This number is already used"],
    },
    score: {
        type: Number,
        required: [true, "Please type your status"],
    },
    age: {
        type: Number,
    },
    gender: {
        type: Number,
    },
    antecedent: {
        type: String,
    },
    covid19: {
        type: String,
    },
    file: {
        type: String,
    },
    selected: {
        type: Boolean,
        default: false,
    }
});

module.exports = waitingPatientSchema;
