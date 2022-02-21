'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidV4 } = require('uuid');

const roomSchema = new Schema({
    id: {
        type: String,
        default: () => { return uuidV4() },
    },
    name: {
        type: Number,
        required: [true, "Please fill a full name"],
        unique: [true, 'This name of room is valid'],
    },
    position: {
        type: Number,
        required: [true, 'Unknown position'],
        min: [1, 'Position of Croma only 1 -> 6'],
        max: [3, 'Position of Croma only 1 -> 6'],
    },
    level: {
        type: Number,
        min: [1, 'Level of room required 1 -> 6'],
        max: [6, 'Level of room required 1 -> 6'],
        required: [true, 'Unknown level of room'],
    },
    member: {
        type: [String],
    },
});

module.exports = roomSchema;
