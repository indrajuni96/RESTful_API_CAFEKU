// Import
const express = require('express')
const Route = express.Router()

// Define
const userRoute = require('./routes/userRoute')
const categoriesRoute = require('./routes/categories')
const productsRoute = require('./routes/products')

// Route
Route
    .use('/user', userRoute)
    .use('/categories', categoriesRoute)
    .use('/products', productsRoute)

module.exports = Route