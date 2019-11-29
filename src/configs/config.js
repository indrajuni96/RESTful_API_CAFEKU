// import all the required modules
const mysql = require('mysql')
const config = require('./database')

// connect api to database
const connection = mysql.createConnection(config.database.mysql)

connection.connect((err) => {
    (err) ? console.log(`Error : ${err}`) : console.log('DB Connected!')
})

module.exports = connection