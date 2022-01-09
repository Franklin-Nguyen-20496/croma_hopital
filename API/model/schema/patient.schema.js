'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
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
    disease: {
        type: String,
        required: [true, "We don't have any disease"],
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
    }
});

module.exports = patientSchema;
