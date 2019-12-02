const historyModel = require('../models/history')
const schema = require('../configs/validation')

module.exports = {
    addHistory: async (req, res) => {
        const data = {
            invoice: req.body.invoice,
            user: req.body.user,
            orders: req.body.orders,
            price: req.body.price
        }

        const validation = schema.history_add.validate(data)

        if (validation.error) {
            return res.status(400).json({
                status: 400,
                message: validation.error.details[0].message
            });
        }

        await historyModel.addHistory(data)
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
    getHistory: async (req, res) => {
        await historyModel.getHistory()
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
    getDailyIncome: async (req, res) => {
        await historyModel.getDailyIncome()
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
    getWeeklyIncome: async (req, res) => {
        await historyModel.getWeeklyIncome()
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
    getMonthlyIncome: async (req, res) => {
        await historyModel.getMonthlyIncome()
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
    getYearlyIncome: async (req, res) => {
        await historyModel.getYearlyIncome()
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
}