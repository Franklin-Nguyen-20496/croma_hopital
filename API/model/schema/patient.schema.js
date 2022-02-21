'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidV4 } = require('uuid');

const patientSchema = new Schema({
    id: {
        type: String,
        default: () => { return uuidV4() },
        unique: [true, "This id is already existed"],
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
    position: {
        type: Number,
        required: [true, "We don't have any type of disease"],
    },
    disease: {
        type: String,
        required: [true, "We don't have any disease"],
    },
    age: {
        type: Number,
        default: 0,
    },
    gender: {
        type: Number,
        default: 0,
    },
    antecedent: {
        type: String,
        default: '',
    },
    covid19: {
        type: Boolean,
        default: false,
    },
    file: {
        type: String,
        default: '',
    },
    room: {
        type: Number,
        default: 0,
    },
    doctorID: {
        type: String,
        default: '',
    },
    nurseID: {
        type: String,
        default: '',
    },
    medicationTime: {
        type: Number,
        default: 0,
    },
    timeStart: {
        type: Date,
    },
    recipeName: {
        type: String,
        default: '',
    },
    recipeID: {
        type: String,
        default: '',
    },
    finished: {
        type: Boolean,
        default: false,
    },
    updateAt: {
        type: String,
        default: '',
    }
});

module.exports = patientSchema;
