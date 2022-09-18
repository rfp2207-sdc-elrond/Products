const express = require('express')
const db = require('./../db')
const router = express.Router()

// get all products
router.get('/', (req, res) => {
  const count = parseInt(req.query.count) || 5
  const page = parseInt(req.query.page) || 1
  const offset = ( page - 1 ) * count
  const query = 'EXPLAIN ANALYZE SELECT id, name, slogan, description, category, default_price FROM products ORDER BY id ASC LIMIT $1 OFFSET $2'
  const params = [count, offset]
  db.query(query, params, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      res.json(result)
    }
  })
})

// get specific product data
router.get('/:product_id', (req, res) => {
  const query =
    `EXPLAIN ANALYZE SELECT  id, name, slogan, description, category, default_price, features
    FROM products
    WHERE id = $1`
  const params = [req.params.product_id]
  db.query(query, params, (err, result) => {
    if(err) {
      console.log(err)
      res.status(500).send()
    } else {
      res.json(result)
    }
  })
})

// get styles for specific product id
router.get('/:product_id/styles', (req, res) => {
  const query =
  `EXPLAIN ANALYZE SELECT id, styles as results FROM products WHERE id = $1`
  const params = [req.params.product_id]
  db.query(query, params, (err, result) => {
    if(err) {
      console.log(err)
      res.status(500).send()
    } else {
      res.json(result)
    }
  })
})

// get related products for specific product id
router.get('/:product_id/related', (req, res) => {
  const query =
  `EXPLAIN ANALYZE SELECT related from products WHERE id = $1`
  const params = [req.params.product_id]
  db.query(query, params, (err, result) => {
    if(err) {
      console.log(err)
      res.status(500).send()
    } else {
      res.json(result)
    }
  })
})

module.exports = router