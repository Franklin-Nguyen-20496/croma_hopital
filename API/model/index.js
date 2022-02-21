'use strict';
const mongoose = require('mongoose');
const config = require('config');
const { v4: uuidV4 } = require('uuid');

const userSchema = require('./schema/user.schema');
const authSchema = require('./schema/auth.schema');
const waitingPatientSchema = require('./schema/waitingPatient.schema');
const patientSchema = require('./schema/patient.schema');
const roomSchema = require('./schema/room.schema');
const pollSchema = require('./schema/poll.schema');
const medicineSchema = require('./schema/medicine.schema');
const recipeSchema = require('./schema/recipe.schema')

class Db {

    async initModels() {
        console.log('Creating models');

        this.users = mongoose.model('user', userSchema);
        this.auths = mongoose.model('auth', authSchema);
        this.waitingPatients = mongoose.model('waitingPatient', waitingPatientSchema);
        this.patients = mongoose.model('patient', patientSchema);
        this.rooms = mongoose.model('room', roomSchema);
        this.polls = mongoose.model('poll', pollSchema);
        this.medicines = mongoose.model('medicine', medicineSchema);
        this.recipes = mongoose.model('recipe', recipeSchema)

        console.log('Model was created');
    }

    async initAdminAccount() {
        try {
            console.log('Initing admin account');

            const admin = {
                id: uuidV4(),
                name: 'Admin',
                email: 'hoang01663011503@yahoo.com',
                password: config.password,
                age: 25,
                address: 'Quảng Nam',
                position: 4,
                role: 1,
            }

            const query = {
                email: admin.email,
            }

            const result = await this.users.findOne(query);
            if (!result) {
                await this.users.create(admin);
                console.log('Created Admin account')
                console.log('password', config.password)
            }
            else {
                console.log('Created Admin account')
            }

        }
        catch (err) {
            throw new Error('Some thing wrong to create admin');
        }
    }

    async initDefaultRooms() {
        try {
            const rooms = await this.rooms.find({});
            if (!rooms || rooms.length === 0) {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 6; j++) {
                        await this.rooms.create({
                            id: uuidV4(),
                            name: Number(`${i + 1}0${j + 1}`),
                            position: (i + 1),
                            level: (j + 1),
                            member: [],
                        })
                    }
                }
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    connect() {
        mongoose.connect(config.get('db.URI'), config.get('db.options'), async (err) => {
            try {
                if (err) {
                    console.error('error in connect database', err);
                }
                else {
                    await this.initModels();
                    await this.initAdminAccount();
                    await this.initDefaultRooms();
                }
            } catch (error) {
                console.log('error', error);
            }

        });
    }
}

module.exports = new Db();