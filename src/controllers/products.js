const productsModel = require('../models/products')
const cloudImage = require('../helpers/cloudImage')
const schema = require('../configs/validation')

module.exports = {
    getProducts: async (req, res) => {
        await productsModel.getProducts()
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
    addProduct: async (req, res) => {
        const data = {
            name: req.body.name,
            description: req.body.description,
            category_id: req.body.category_id,
            price: req.body.price,
            qty: req.body.qty
        }

        const validation = schema.product_add.validate(data)

        if (validation.error) {
            return res.status(400).json({
                status: 400,
                message: validation.error.details[0].message
            });
        }

        if (!req.files) {
            return res.status(400).json({
                status: 400,
                message: "Field image can't be null"
            })
        }

        const file = req.files.image
        let imageExtension = file.name.split('.')[1]
        let isImage = ["png", "jpg", "jpeg", "svg", "gif"].includes(imageExtension)
        // console.log(isImage)

        if (!isImage) {
            return res.status(400).json({
                status: 400,
                message: `Please upload an image file not ${imageExtension} file`
            })
        }

        const imageUpload = await cloudImage.upload(file)
        // console.log(imageUpload.url)

        data.image = imageUpload.url
        // console.log(data)
        await productsModel.addProduct(data)
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
    editProduct: async (req, res) => {
        const id = req.params
        const data = {
            name: req.body.name,
            description: req.body.description,
            category_id: req.body.category_id,
            price: req.body.price,
            qty: req.body.qty
        }

        const validation = schema.product_edit.validate(data)

        if (validation.error) {
            return res.status(400).json({
                status: 400,
                message: validation.error.details[0].message
            });
        }

        if (!req.files) {
            return res.status(400).json({
                status: 400,
                message: "Field image can't be null"
            })
        }

        const file = req.files.image
        let imageExtension = file.name.split('.')[1]
        let isImage = ["png", "jpg", "jpeg", "svg", "gif"].includes(imageExtension)
        // console.log(isImage)

        if (!isImage) {
            return res.status(400).json({
                status: 400,
                message: `Please upload an image file not ${imageExtension} file`
            })
        }

        const imageUpload = await cloudImage.upload(file)
        // console.log(imageUpload.url)

        data.image = imageUpload.url
        // console.log(data)

        await productsModel.editProduct(data, id)
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
    deleteProduct: async (req, res) => {
        const id = req.params

        await productsModel.deleteProduct(id)
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