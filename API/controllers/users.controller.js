'use strict';
const db = require('../model');

class UserController {
    async getAll() {
        try {
            const result = await db.users.find({});
            // console.log('get all users', result);
            return result;
        }
        catch (err) {
            console.log(err);
        }
    }

    async createUser(data) {
        try {
            let user = await db.users.findOne({ email: data.email });
            if (user) {
                return false;
            }

            let result = await db.users.create(data);
            console.log('user', data);
            return result;

        }
        catch (err) {
            console.log('err', err);
        }
    }

    async updateUser(data, id) {
        try {
            let result = null;
            let user = await db.users.findOne({ _id: id });

            if (user) {
                result = await db.users.updateOne({ _id: id }, { ...data });
                return {
                    message: 'updated user',
                    data: result,
                }
            }
            else {
                return {
                    message: 'update error',
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    async deleteUser(id) {
        try {
            await db.users.deleteOne({ _id: id });
            return 'deleted this user';
        } catch (error) {
            console.log(error);
            return 'Something wrong delete false';
        }
    }
}

module.exports = new UserController();