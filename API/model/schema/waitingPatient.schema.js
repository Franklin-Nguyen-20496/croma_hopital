'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidV4 } = require('uuid');

const waitingPatientSchema = new Schema({
    id: {
        type: String,
        default: () => { return uuidV4() },
    },
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
        default: () => { return 0 },
    },
    gender: {
        type: Number,
        default: () => { return 0 },
    },
    antecedent: {
        type: String,
        default: '',
    },
    covid19: {
        type: Boolean,
        default: '',
    },
    file: {
        type: String,
        default: '',
    },
    selected: {
        type: Boolean,
        default: false,
    }
});

module.exports = waitingPatientSchema;
