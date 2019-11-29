// Import
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const schema = require('../configs/validation')

// Controllers
module.exports = {
    registerUser: async (req, res) => {
        // Get data form req BODY
        const { username, email, password } = req.body

        // Validation
        const validation = schema.user_register.validate({ username, email, password })

        // Cek Validation error
        if (validation.error) {
            return res.status(400).json({
                status: 400,
                message: validation.error.details[0].message
            });
        }

        // Hash Password
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        const data = {
            avatar: "https://ui-avatars.com/api/?size=256&name=" + username,
            username,
            email,
            password: hashPassword
        }

        await userModel.registerUser(data)
            .then(result => {
                res.json({
                    status: 200,
                    message: 'User os registered successfully!',
                    data
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    status: 500,
                    message: 'Register failed!'
                })
            })
    },
    loginUser: async (req, res) => {
        // Get data from req BODY
        const { email, password } = req.body

        // Validation
        const validation = schema.user_login.validate({ email, password })

        // Cek Validation error
        if (validation.error) {
            return res.status(400).json({
                status: 400,
                message: validation.error.details[0].message
            });
        }

        const resultQuery = await userModel.loginUser(email)

        // Cek Email and Password 
        if (resultQuery.length > 0) {
            const isPasswordMatch = await bcrypt.compare(password, resultQuery[0].password)
            if (!isPasswordMatch) {
                res.status(400).json({
                    status: 400,
                    message: 'Password incorrect'
                })
            }
        } else {
            res.status(404).json({
                status: 404,
                message: 'Email not found!'
            })
        }

        // Create & Assign JWT Token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({
            status: 200,
            message: 'Login successful!',
            username: resultQuery[0].username,
            access_token: token
        })
    }
}
