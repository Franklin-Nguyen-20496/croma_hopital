'use strict';
const apiRoutes = require('express').Router();
const userRouter = require('./users.route');
const authRouter = require('./auth.route');
const uploadRouter = require('./upload.route');
const waitingPatientRouter = require('./waitingPatient.route');
const patientRouter = require('./patients.route');
const roomsRouter = require('./rooms.route');
const pollsRouter = require('./polls.route');
const medicinesRouter = require('./medicines.route')
const recipesRouter = require('./recipes.route');

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
        apiRoutes.use('/rooms', roomsRouter);
        apiRoutes.use('/polls', pollsRouter);
        apiRoutes.use('/medicines', medicinesRouter)
        apiRoutes.use('/recipes', recipesRouter)
    }

}

module.exports = (app) => {
    return new RouterIndex(app);
};