const express = require('express')
const route = express.Router()

const productController = require('../controllers/products')

route
    .get('/', productController.getProducts)
    .post('/create', productController.addProduct)
    .put('/update/:id', productController.editProduct)
    .delete('/delete/:id', productController.deleteProduct)
    .patch('/order/:id', productController.addQuantityProduct)
    .patch('/reduce/:id', productController.reduceQuantityProduct)

module.exports = route