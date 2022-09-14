const express = require('express')
const productsRouter = require('./routes/products')
const app = express()

app.use('/products', productsRouter)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(5000)