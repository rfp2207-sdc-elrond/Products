require('dotenv').config()

const fs = require('fs')
const { parse } = require('csv-parse')
const mongoose = require('mongoose')
const Test = require('./server/models/products')

mongoose.connect(process.env.DATABASE_URL)

fs.createReadStream('./data/test.csv')
  .pipe(parse({ delimiter: ',', columns: true, ltrim: true }))
  .on('data', (row) => {
    const product = new Test(row)
    product.save()
    console.log(`${product.id} records uploaded`)
  })
  .on('error', (err) => {
    console.log(err)
  })
  .on('end', () => {
    console.log('====================== finished csv upload! ======================')
  })