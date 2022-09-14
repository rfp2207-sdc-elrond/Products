const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // get all products
})

router.get('/:product_id', (req, res) => {
  // get specific product data
})

router.get('/:product_id/styles', (req, res) => {
  // get styles for specific product id
})

router.get('/product_id/related', (req, res) => {
  // get related products for specific product id
})

module.exports = router