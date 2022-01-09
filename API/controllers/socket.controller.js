var socket = require('socket.io');
const waitingPatientsController = require('./waitingPatient.controller');
const patientsController = require('./patients.controller');

const redis = require('../helpers/redis.helper');
const { SocketClosedUnexpectedlyError } = require('redis');

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
            socket.emit('hello', 'hello world');

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
                    .then(async res => {
                        const { item, list, message } = res;
                        await socket.to('waiting_patients').emit('waiting_patients:selected', { message, data: item });
                        await socket.to('waiting_patients').emit('waiting_patients:get_all', { message, data: list });
                    })
                    .catch(err => console.log(err))
            })

            socket.on('waiting_patients:finished', (values) => {
                console.log(`id: ${socket.id} just emit to channel 'waiting_patients:finished`);
                return waitingPatientsController.finished(values)
                    .then(result => {
                        if (result.data) {
                            socket.to('waiting_patients').emit('waiting_patients:finished', values._id);
                        }
                    })
                    .catch(err => console.log(err))
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