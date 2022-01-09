'use strict';
const db = require('../model');
const redis = require('../helpers/redis.helper');
const config = require('config')

class PatientsController {

    async getAll() {
        try {
            const list = await redis.lRange('patients', 0, -1);
            if (list.length > 0) {
                const result = await db.patients.find({});
                // console.log('result in get all patients', result)
                if (result.length !== 0) {
                    const newList = await result.map(value => {
                        return JSON.parse(JSON.stringify(value._id));
                    });
                    await redis.rPush('patients', newList, config.redis_option);
                    const data = await redis.lRange('patients', 0, -1);
                    return {
                        message: 'success',
                        data: data,
                    }
                } else {
                    return {
                        message: 'error in get patients',
                    };
                }
            }
            else return {
                message: 'success',
                data: list,
            }

        } catch (error) {
            return { message: 'Có lỗi xảy ra, vui lòng kiểm tra lại!' }
        }
    }

    async redisGetAll(req, res, next) {
        try {
            const list = await redis.lRange('patients', 0, -1);
            console.log('list on redis', list);
            if (list.length === 0) {
                next();
            }
            else {
                return res.send({
                    'message': 'success',
                    'data': list,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new PatientsController();    