const express = require('express')
const { Products, Styles, Test } = require('./../models/products')
const router = express.Router()

router.get('/', async (req, res) => {
  // get all products
  res.send('these are the products')
  // try {
  //   const products = await Products.find()
  //   res.json(products)
  // } catch (err) {
  //   res.status(500).json({ message: err.message })
  // }
})

router.get('/:product_id', (req, res) => {
  // get specific product data
  res.send(req.params.product_id)
})

router.get('/:product_id/styles', (req, res) => {
  // get styles for specific product id
})

router.get('/product_id/related', (req, res) => {
  // get related products for specific product id
})

module.exports = router