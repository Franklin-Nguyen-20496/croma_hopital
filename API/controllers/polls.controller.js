'use strict';
const db = require('../model');
// const redis = require('../helpers/redis.helper');
// const config = require('config');

class PollsController {

    async getNewPolls() {
        try {
            const result = await db.polls.find({ processed: false });
            return {
                message: 'success',
                data: result
            }
        } catch (error) {
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại - get new polls!' }
        }
    }

    async getAll() {
        try {
            const result = await db.polls.find({ processed: true });
            return {
                message: 'success',
                data: result
            }

        } catch (error) {
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại - get all polls!' }
        }
    }

    async createOne(values) {
        try {
            const result = await db.polls.create(values);
            console.log('result when create room', result);
            return {
                message: 'success',
                data: result,
            }
        } catch (error) {
            console.log(error);
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại - create one room!' }
        }
    }

    async updateOne(values) {
        try {
            const { agreed, noAgreed, positionRoom, levelRoom, id } = values;

            if (agreed.length >= 3) {
                const result1 = await db.polls.findOneAndUpdate({ id: id }, { ...values, processed: true }, { new: true });
                const list = await db.rooms.find({ position: positionRoom });
                console.warn('list',)
                const name = this.findMaxRoom(list, positionRoom);
                const newRoom = await db.rooms.create({
                    name: name,
                    position: positionRoom,
                    level: levelRoom,
                })
                return {
                    message: 'success',
                    processed: result1,
                    newRoom: newRoom,
                }
            }

            if (noAgreed.length >= 2) {
                const result2 = await db.polls.findOneAndUpdate({ id: id }, { ...values, processed: true }, { new: true });
                return {
                    message: 'success',
                    processed: result2,
                }
            }

            const result3 = await db.polls.findOneAndUpdate({ id: id }, values, { new: true });
            return { message: 'success', data: result3 }

        } catch (error) {
            console.log(error);
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại - update one poll!' }
        }
    }

    findMaxRoom(rooms, positionRoom) {
        if (rooms.length === 0) {
            console.warn('room', Number(`${positionRoom}01`))
            return Number(`${positionRoom}01`)
        }
        else {
            let maxRoom = 0;
            rooms.forEach(room => {
                if (room.name > maxRoom) {
                    maxRoom = room.name
                };
            })
            console.warn('room', maxRoom + 1)
            return (maxRoom + 1)
        }
    }

}

module.exports = new PollsController();