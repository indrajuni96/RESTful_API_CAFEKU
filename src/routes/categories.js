const express = require('express')
const route = express.Router()

const categoriesController = require('../controllers/categories')
const authMiddleware = require('../middleware/verifyToken')

route
    .get('/', authMiddleware.isAuth, categoriesController.getCategories)
    .post('/create', categoriesController.addCategories)
    .put('/update/:id', categoriesController.editCategories)
    .delete('/delete/:id', categoriesController.deleteCategories)

module.exports = route