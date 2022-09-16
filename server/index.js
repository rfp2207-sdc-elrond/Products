require('dotenv').config()
const express = require('express')
const productsRouter = require('./routes/products')
const app = express()

const db = require('./db')

app.use(express.json())
app.use('/products', productsRouter)

app.listen(process.env.PORT, console.log('Server Started, listening on port', process.env.PORT))