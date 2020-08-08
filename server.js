const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const PORT = process.env.PORT || 3333

const app = express()


app.use('/public', express.static(__dirname + '/public'))

const { mongoUri } = require('./config/database')

mongoose.connect(mongoUri, { useNewUrlParser: true })

app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(cors())
app.disable('x-powered-by')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: 1.5 * 1024 * 1024 }))

require('./models')

app.use('/', require('./routes'))

app.use((req, res, next) => {
    const err = newError('Página Não encontrada')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    if (err.status !== 404) console.warn('Error', err.message, new Date())
    res.json({ errors: { message: err.message, status: err.status } })
})

app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server running on port: ${PORT}`)
})