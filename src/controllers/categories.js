const categoriesModel = require('../models/categories')
const schema = require('../configs/validation')

module.exports = {
    getCategories: async (req, res) => {
        await categoriesModel.getCategories()
            .then(result => {
                res.json({
                    status: 200,
                    message: 'Get data successfully!',
                    totalData: result.length,
                    data: result
                })
            })
            .catch(error => {
                console.log(error)
                res.json({
                    status: 500,
                    message: 'Failed to get data!'
                })
            })
    },
    addCategories: async (req, res) => {
        const data = {
            name: req.body.name
        }
        const validation = schema.categories_add.validate(data)

        if (validation.error) {
            return res.status(400).json({
                status: 400,
                message: validation.error.details[0].message
            });
        }

        await categoriesModel.addCategories(data)
            .then(result => {
                res.json({
                    status: 200,
                    message: 'Data added successfully!',
                    data
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    status: 500,
                    message: 'Failed to add data!'
                })
            })
    },
    editCategories: async (req, res) => {
        const id = req.params
        const data = {
            name: req.body.name
        }
        const validation = schema.categories_edit.validate(data)

        if (validation.error) {
            return res.status(400).json({
                status: 400,
                message: validation.error.details[0].message
            });
        }

        await categoriesModel.editCategories(data, id)
            .then(result => {
                res.json({
                    status: 200,
                    message: 'Data edited successfully!',
                    data
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    status: 500,
                    message: 'Failed to edit data!'
                })
            })
    },
    deleteCategories: async (req, res) => {
        const id = req.params

        await categoriesModel.deleteCategories(id)
            .then(result => {
                res.json({
                    status: 200,
                    message: 'Data deleted successfully!'
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    status: 500,
                    message: 'Failed to delete data!'
                })
            })
    }
}