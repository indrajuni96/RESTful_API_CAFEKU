// Import
const express = require('express')
const Route = express.Router()

// Import Controllers
const userController = require('../controllers/userController')

// Routes
Route
    .post('/register', userController.registerUser)
    .post('/login', userController.loginUser)

module.exports = Route