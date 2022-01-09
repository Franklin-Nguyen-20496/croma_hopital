'use strict';
const mongoose = require('mongoose');
const config = require('config');
const userSchema = require('./schema/user.schema');
const authSchema = require('./schema/auth.schema');
const waitingPatientSchema = require('./schema/waitingPatient.schema');
const patientSchema = require('./schema/patient.schema')

class Db {

    initModels() {
        console.log('Creating models');
        this.users = mongoose.model('user', userSchema);
        this.auths = mongoose.model('auth', authSchema);
        this.waitingPatients = mongoose.model('waitingPatient', waitingPatientSchema);
        this.patients = mongoose.model('patient', patientSchema)
        console.log('Model was created');
    }

    async initData() {
        try {
            console.log('Initing admin account');

            const admin = {
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
            console.log('err', err);
        }
    }

    connect() {
        mongoose.connect(config.get('db.URI'), config.get('db.options'), (err) => {
            if (err) {
                console.error('error in connect database', err);
            }
            else {
                this.initModels();
                this.initData();
            }
        });
    }
}

module.exports = new Db();