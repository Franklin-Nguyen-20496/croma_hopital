'use strict';
const db = require('../model');
const redis = require('../helpers/redis.helper');
const config = require('config')

class PatientsController {

    checkQueryPosition(position) {
        switch (position) {
            case 1: return { $gte: 101, $lte: 199 };
            case 2: return { $gte: 201, $lte: 299 };
            case 3: return { $gte: 301, $lte: 399 };
            default:
                return null;
        }
    }

    async findPatients(type, position) {
        try {
            switch (type) {
                case 'unRoom':
                    console.log('in type unRoom');
                    const patientsUnRoom = await db.patients.find({ position: position, room: { $lte: 1 } });
                    console.log('result', patientsUnRoom);
                    return patientsUnRoom;
                case 'unDoctor':
                    console.log('in type unDoctor');
                    const query1 = this.checkQueryPosition(position);
                    const patientsUnDoctor = await db.patients.find({ doctorID: '', room: query1 })
                    return patientsUnDoctor;
                case 'normal':
                    console.log('in type normal');
                    const list = await db.patients.find({ position: position, room: { $gte: 100 } })
                    // console.log(`patients list:`, list);
                    const patientsNormal = await list.filter(item => item.doctorID !== '');
                    // console.log(`patients normal:`, patientsNormal);
                    return patientsNormal;
                default: return null;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(query) {
        try {
            const { type, position } = query;
            const result = await this.findPatients(type, Number(position));
            return {
                message: 'success',
                data: result,
            }
        } catch (error) {
            console.error(error);
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại!' }
        }
    }

    async getOne(id) {
        try {
            const result = await db.patients.findOne({ id: id })
            if (result) {
                return {
                    message: 'success',
                    data: result,
                }
            }
        } catch (error) {
            console.error(error);
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại (get One patient)!' }
        }
    }

    async updateOne(values) {
        try {
            const result = await db.patients.findOneAndUpdate({ id: values.id }, values, { new: true });
            return { message: 'success', data: result };
        } catch (error) {
            console.error(error);
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại (update one patients)!' }
        }
    }

}

module.exports = new PatientsController();