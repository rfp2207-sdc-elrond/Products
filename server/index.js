require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const productsRouter = require('./routes/products')
const app = express()

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => {
  console.log(error)
})
db.once('open', () => console.log('Connected to database'))

app.use(express.json())
app.use('/products', productsRouter)

app.listen(process.env.PORT, console.log('Server Started, listening on port', process.env.PORT))