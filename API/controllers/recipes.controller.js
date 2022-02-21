'use strict';
const db = require('../model');

class RecipesController {

    async create(values) {
        try {
            const result = await db.recipes.create(values);
            return {
                message: 'success',
                data: result,
            }
        } catch (error) {
            console.log(error);
            return { message: 'Có lỗi khi tạo công thức thuốc!' }
        }
    }

    async getAll() {
        try {
            const result = await db.recipes.find({});
            return { message: 'success', data: result }
        } catch (error) {
            console.log(error)
            return { message: 'Có lỗi khi lấy công thức thuốc!' }
        }
    }

    async update(values) {
        try {
            await db.recipes.findOneAndUpdate({ id: values.id }, values);
            return { message: 'success' }
        }
        catch (error) {
            console.log(error);
            return { message: 'Có lỗi khi khi cập nhật công thức thuốc!' }
        }
    }

}

module.exports = new RecipesController();