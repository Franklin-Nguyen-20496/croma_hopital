'use strict';
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { v4: uuidV4 } = require('uuid');

const medicineSchema = new schema({
    id: {
        type: String,
        default: () => { return uuidV4() },
        unique: [true, "This id is already used"],
    },
    name: {
        type: String,
        required: [true, 'Unknown name of medicine'],
        unique: [true, "This name is already used"],
    },
    unit: {
        type: String,
        required: [true, 'Unknown unit of medicine'],
    },
    total: {
        type: Number,
        default: 0,
    },
})

module.exports = medicineSchema;