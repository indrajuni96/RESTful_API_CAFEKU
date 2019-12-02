const conn = require('../configs/config')

module.exports = {
    addHistory: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO history SET ?', data,
                (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    },
    getHistory: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM history ORDER BY date_created',
                (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    },
    getDailyIncome: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT DAYNAME(date_created) as DAY, WEEK(date_created) as WEEK, MONTHNAME(date_created) as MONTH, YEAR(date_created) as YEAR, SUM(price) as QUANTITY  FROM `history` GROUP BY DAY(date_created) ORDER BY date_created',
                (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    },
    getWeeklyIncome: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT DAYNAME(date_created) as DAY, WEEK(date_created) as WEEK, MONTHNAME(date_created) as MONTH, YEAR(date_created) as YEAR, SUM(price) as QUANTITY  FROM `history` GROUP BY WEEK(date_created), DAY(date_created) ORDER BY date_created',
                (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    },
    getMonthlyIncome: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT DAYNAME(date_created) as DAY, WEEK(date_created) as WEEK, MONTHNAME(date_created) as MONTH, YEAR(date_created) as YEAR, SUM(price) as QUANTITY  FROM `history` GROUP BY MONTH(date_created), WEEK(date_created) ORDER BY date_created',
                (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    },
    getYearlyIncome: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT DAYNAME(date_created) as DAY, WEEK(date_created) as WEEK, MONTHNAME(date_created) as MONTH, YEAR(date_created) as YEAR, SUM(price) as QUANTITY  FROM `history` GROUP BY YEAR(date_created) ORDER BY date_created',
                (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    }
}