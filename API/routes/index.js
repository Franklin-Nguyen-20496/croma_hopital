'use strict';
const apiRoutes = require('express').Router();
const userRouter = require('./users.route');
const authRouter = require('./auth.route');
const uploadRouter = require('./upload.route');
const waitingPatientRouter = require('./waitingPatient.route');
const patientRouter = require('./patients.route');

class RouterIndex {
    constructor(app) {
        this.app = app;
    }

    registerRoutes() {
        this.app.use('/', apiRoutes);
        apiRoutes.use('/users', userRouter);
        apiRoutes.use('/auth', authRouter);
        apiRoutes.use('/file', uploadRouter);
        apiRoutes.use('/waiting', waitingPatientRouter);
        apiRoutes.use('/patients', patientRouter);
    }
}

module.exports = (app) => {
    return new RouterIndex(app);
};