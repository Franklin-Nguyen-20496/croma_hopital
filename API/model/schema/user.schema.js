'use strict';
const mongoose = require('mongoose');
const config = require('config')
const bcrypt = require('bcrypt');
const { v4: uuidV4 } = require('uuid');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    id: {
        type: String,
        default: () => { return uuidV4() },
    },
    name: {
        type: String,
        required: [true, "Please fill a full name"],
    },
    email: {
        type: String,
        required: [true, "Please type correct email"],
        unique: [true, "This email is already used"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    age: {
        type: Number,
        required: [true, "Please type your age"]
    },
    address: {
        type: String,
        required: [true, "Please type your address"]
    },
    position: {
        type: Number,
        required: [true, "Please type your position"]
    },
    role: {
        type: Number,
        required: true
    },
    file: {
        type: String,
    },
    patientsID: {
        type: [String],
    },
});

// hash password

userSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(config.bcrypt.SALT_ROUNDS);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    }
    catch (err) {
        return next(err);
    }
});

module.exports = userSchema;
