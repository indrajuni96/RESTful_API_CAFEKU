const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const apiRoutes = require('./src/index')
const cors = require('cors')
const logger = require('morgan')
const fileUpload = require('express-fileupload')

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(logger('dev'))
app.use(fileUpload({ useTempFiles: true }))
app.use('/api/v1', apiRoutes)

app.listen(port, () => { console.log(`Service Runnning Using Port : ${port}`) })