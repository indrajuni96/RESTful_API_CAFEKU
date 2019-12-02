// Import
const express = require('express')
const Route = express.Router()

// Define
const userRoute = require('./routes/userRoute')
const categoriesRoute = require('./routes/categories')
const productsRoute = require('./routes/products')
const historyRoute = require('./routes/history')

// Route
Route
    .use('/user', userRoute)
    .use('/categories', categoriesRoute)
    .use('/products', productsRoute)
    .use('/history', historyRoute)

module.exports = Route