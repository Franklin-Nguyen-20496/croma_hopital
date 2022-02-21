'use strict';
const db = require('../model');
const redis = require('../helpers/redis.helper');
const config = require('config')

class MedicinesController {

    async getAll() {
        try {
            const result = await db.medicines.find({});
            return {
                message: 'success',
                data: result,
            }
        } catch (error) {
            console.error(error);
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại!' }
        }
    }

    async getById(id) {
        try {
            const result = await db.medicines.findOne({ id: id });
            return {
                message: 'success',
                data: result,
            }
        } catch (error) {
            console.error(error);
            return { message: 'Error in get medicine' }
        }
    }

    async createOne(values) {
        try {
            console.log('values', values)
            const nameOject = await db.medicines.findOne({ name: values.name });
            if (nameOject) {
                return { message: 'Tên thuốc này đã tồn tại' }
            }
            else {
                const result = await db.medicines.create(values);
                return {
                    message: 'success',
                    data: result,
                }
            }
        } catch (error) {
            console.error(error);
            return { message: 'Error in create medicine' }
        }
    }

    async update(values) {
        try {
            const result = await db.medicines.findOneAndUpdate({ id: values.id }, values, { new: true });
            return { message: 'success', data: result }
        } catch (error) {
            console.error(error);
            return { message: 'Error in update medicine' }
        }
    }

    async delete(id) {
        try {
            await db.medicines.findOneAndDelete({ id: id });
            return { message: 'success' }
        } catch (error) {
            console.error(error);
            return { message: 'Error in delete medicine' }
        }
    }
}

module.exports = new MedicinesController();