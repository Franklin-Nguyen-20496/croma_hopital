var socket = require('socket.io');
const waitingPatientsController = require('./waitingPatient.controller');
const patientsController = require('./patients.controller');
const pollsController = require('./polls.controller');
const roomsController = require('./rooms.controller');

class Io {
    constructor(httpServer, options) {
        this.httpServer = httpServer;
        this.options = options;
        this.io = socket(this.httpServer, this.options);
    }

    init() {
        this.io.on('connection', async (socket) => {
            console.log(`A user connect to server with id: ${socket.id}`)
            socket.join("waiting_patients");
            socket.join("patients");
            socket.join("polls");
            socket.join("rooms");

            // Waiting patient
            socket.on('waiting_patients:get_all', () => {
                console.log(`id: ${socket.id} just emit to channel 'waiting_patients:get_all`);
            })

            socket.on('waiting_patients:create', (values) => {
                console.log(`id: ${socket.id} just emit to channel 'waiting_patients:create`, values);
                return waitingPatientsController.create(values)
                    .then(res => {
                        console.log('res when create waiting patient', res)
                        socket.to('waiting_patients').emit('waiting_patients:get_all', res)
                    })
                    .catch(err => console.log(err))
            })

            socket.on('waiting_patients:selected', (id) => {
                console.log(`id: ${socket.id} just emit to channel 'waiting_patients:selected`, id);
                return waitingPatientsController.selected(id)
                    .then(res => {
                        const { item, list, message } = res;
                        socket.to('waiting_patients').emit('waiting_patients:selected', { message, data: item });
                        // await socket.to('waiting_patients').emit('waiting_patients:get_all', { message, data: list });
                    })
                    .catch(err => console.log(err))
            })

            socket.on('waiting_patients:finished', (values) => {
                console.log(`id: ${socket.id} just emit to channel 'waiting_patients:finished`);
                return waitingPatientsController.finished(values)
                    .then(result => {
                        if (result.data) {
                            socket.to('waiting_patients').emit('waiting_patients:finished', values._id);
                            socket.to('patients').emit('patients:add_new_un_room', result);
                        }
                    })
                    .catch(err => console.log(err))
            })

            // Polls
            socket.on('polls:create', (values) => {
                console.log(`id: ${socket.id} just emit to channel polls:create`, values);
                return pollsController.createOne(values)
                    .then(res => {
                        console.log('res', res)
                        socket.to('polls').emit('polls:create', res)
                    })
                    .catch(err => console.log(err));
            })

            socket.on('polls:update', (values) => {
                console.log(`id: ${socket.id} just emit to channel polls:update`, values);
                return pollsController.updateOne(values)
                    .then(res => {
                        console.log('res', res)
                        const { message, data, processed, newRoom } = res;
                        if (data) {
                            socket.to('polls').emit('polls:update', { message, data });
                        }
                        if (processed) {
                            socket.to('polls').emit('polls:processed', { message, data: processed });
                        }
                        if (newRoom) {
                            socket.to('rooms').emit('rooms:create', { message, data: newRoom });
                        }
                    })
                    .catch(err => console.log(err));
            })

            // Rooms
            socket.on('rooms:update', (values) => {
                console.log(`id: ${socket.id} just emit to channel rooms:update`, values);
                return roomsController.updateOne(values)
                    .then(res => {
                        console.log(`res in rooms:update: ${res}`);
                        socket.to('rooms').emit('rooms:update', res)
                    })
                    .catch(err => console.log(err));
            })

            //Patients
            socket.on('patients:add_room', (values) => {
                console.log(`id: ${socket.id} just emit to channel patients:add_room`, values);
                return patientsController.updateOne(values)
                    .then(res => {
                        console.log(`res in patients:add_room: ${res}`);
                        socket.to('patients').emit('patients:add_room', res)
                    })
                    .catch(err => console.log(err));
            })

            socket.on('patients:out_room', (values) => {
                console.log(`id: ${socket.id} just emit to channel patients:out_room`, values);
                return patientsController.updateOne(values)
                    .then(res => {
                        console.log(`res in patients:out_room: ${res}`);
                        socket.to('patients').emit('patients:out_room', res)
                    })
                    .catch(err => console.log(err));
            })

            socket.on('patients:finished', values => {
                console.log(`id: ${socket.id} just emit to channel patients:finished`, values);
                return patientsController.updateOne(values)
                    .then(res => {
                        console.log(`res in patients:finished: ${res}`);
                        socket.to('patients').emit('patients:finished', res)
                    })
                    .catch(err => console.log(err));
            })

            socket.on('patients:normal_update', values => {
                console.log(`id: ${socket.id} just emit to channel patients:normal_update`, values);
                return patientsController.updateOne(values)
                    .then(res => {
                        console.log(`res in patients:normal_update: ${res}`);
                        socket.to('patients').emit('patients:normal_update', res)
                    })
                    .catch(err => console.log(err));
            })

            socket.on('disconnect', () => {
                console.log(`User disconnected with id : ${socket.id}`);
            })
        })
    }

}

module.exports = (httpServer, options) => {
    return new Io(httpServer, options);
}; 