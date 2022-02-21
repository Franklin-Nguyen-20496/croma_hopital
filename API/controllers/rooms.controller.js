'use strict';
const db = require('../model');
// const redis = require('../helpers/redis.helper');
// const config = require('config');

class RoomsController {

    async getAll() {
        try {
            const result = await db.rooms.find({});
            return {
                message: 'success',
                data: result
            }

        } catch (error) {
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại - get all rooms!' }
        }
    }

    async getOneByName(name) {
        try {
            const result = await db.rooms.findOne({ name: name });
            return {
                message: 'success',
                data: result
            }
        } catch (error) {
            return { message: 'Có lỗi xảy ra khi lấy thông tin phòng!' }
        }
    }

    async createOne(values) {
        try {
            const isValid = await db.rooms.findOne({ name: values.name });
            if (isValid) {
                return { message: 'Phòng này đã tồn tại' }
            }
            else {
                const result = await db.rooms.create(values);
                console.log('result when create room', result);
                return {
                    message: 'success',
                    data: result,
                }
            }
        } catch (error) {
            console.log(error);
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại - create one room!' }
        }
    }

    async deleteOne(id) {
        try {
            await db.rooms.deleteOne({ id: id });
            return {
                message: 'success',
            }
        } catch (error) {
            console.log(error);
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại - delete one room!' }
        }
    }

    async updateOne(values) {
        try {
            const result = await db.rooms.findOneAndUpdate({ id: values.id }, values, { new: true });
            return { message: 'success', data: result };
        } catch (error) {
            console.error(error);
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại (update one room)!' }
        }
    }

}

module.exports = new RoomsController();