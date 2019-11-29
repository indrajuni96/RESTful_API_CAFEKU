const jwt = require('jsonwebtoken')

module.exports = {
    isAuth: async (req, res, next) => {
        const token = req.headers.authorization

        if (!token) {
            return res.json({
                status: 403,
                message: 'No token has been set'
            })
        }

        const bearerToken = token.split(' ')[1]
        // console.log(bearerToken)

        try {
            const verify = await jwt.verify(bearerToken, process.env.JWT_SECRET)
            console.log(verify)
            next()
        } catch (e) {
            return res.json({
                status: 403,
                message: 'Token key not valid'
            })
        }
    }
} 