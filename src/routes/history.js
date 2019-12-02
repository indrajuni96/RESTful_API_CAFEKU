const express = require('express')
const route = express.Router()

const historyController = require('../controllers/history')

route
    .post('/create', historyController.addHistory)
    .get('/', historyController.getHistory)
    .get('/daily', historyController.getDailyIncome)
    .get('/weekly', historyController.getWeeklyIncome)
    .get('/monthly', historyController.getMonthlyIncome)
    .get('/yearly', historyController.getYearlyIncome)

module.exports = route