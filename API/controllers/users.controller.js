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

    async getAllDoctors() {
        try {
            const result = await db.users.find({ role: 3 });
            return {
                message: 'success',
                data: result,
            }
        } catch (error) {
            console.log(error);
            return { message: error }
        }
    }

    async getAllNurses() {
        try {
            const result = await db.users.find({ role: 4 });
            return {
                message: 'success',
                data: result,
            }
        } catch (error) {
            console.log(error);
            return { message: error }
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
            let user = await db.users.findOne({ id: id });

            if (user) {
                result = await db.users.updateOne({ id: id }, data);
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
            await db.users.deleteOne({ id: id });
            return 'deleted this user';
        } catch (error) {
            console.log(error);
            return 'Something wrong delete false';
        }
    }

    async getById(id) {
        try {
            const result = await db.users.findOne({ id: id });
            if (result) {
                return {
                    message: 'success',
                    data: result,
                }
            }
            else return { message: 'error in get user by id' }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserController();