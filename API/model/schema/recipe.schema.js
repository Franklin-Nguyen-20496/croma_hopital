'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidV4 } = require('uuid');

const item = new Schema({
    medicineID: {
        type: String,
        required: [true, "Please fill a medicine ID"],
    },
    medicineName: {
        type: String,
        required: [true, "Please fill a medicine name"],
    },
    total: {
        type: Number,
        min: [1, 'min of total medicine is 1'],
        required: [true, "invalid total of medicine"],
    },
    unit: {
        type: String,
        required: [true, "invalid unit of medicine"],
    }
})

const recipeSchema = new Schema({
    id: {
        type: String,
        default: () => { return uuidV4() },
        unique: [true, "This id is already existed"],
    },
    components: {
        type: [item],
        required: [true, "recipe must be exist components"],
    },
    name: {
        type: String,
        // unique: [true, "name of recipe already used"],
        required: [true, "no name of recipe"]
    },
    description: {
        type: String,
        default: '',
    },
    doctorID: {
        type: String,
        required: [true, "recipe must be exist components"],
    },
    type: {
        type: Number,
        min: [1, 'min of level is 1'],
        max: [2, 'max of level is 2'],
        required: [true, "level must be validate"],
    }
});

module.exports = recipeSchema;
