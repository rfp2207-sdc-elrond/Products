const model = require('../models')

const productIDCache = {}
const stylesCache = {}
const relatedCache = {}

const saveToCache = (cache, id, results) => {
  cache[id] = results
}

module.exports = {
  getAllProducts: (req, res) => {
    const count = parseInt(req.query.count) || 5
    const page = parseInt(req.query.page) || 1
    const offset = ( page - 1 ) * count
    const params = [count, offset]
    model.findAll(params, (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send()
      } else {
        res.send(result.rows)
      }
    })
  },
  getOneProduct: (req, res) => {
    const params = [req.params.product_id]
    if (req.params.product_id in productIDCache) {
      res.send(productIDCache[req.params.product_id])
    } else {
      model.findOne(params, (err, result) => {
        if(err) {
          console.log(err)
          res.status(500).send()
        } else {
          res.send(result.rows[0])
          saveToCache(productIDCache, req.params.product_id, result.rows[0])
        }
      })
    }
  },
  getStyles: (req, res) => {
    const params = [req.params.product_id]
    if (req.params.product_id in stylesCache) {
      res.send(stylesCache[req.params.product_id])
    } else {
      model.findStyles(params, (err, result) => {
        if(err) {
          console.log(err)
          res.status(500).send()
        } else {
          res.send(result.rows[0])
          saveToCache(stylesCache, req.params.product_id, result.rows[0])
        }
      })
    }
  },
  getRelated: (req, res) => {
    const params = [req.params.product_id]
    if (req.params.product_id in relatedCache) {
      res.send(relatedCache[req.params.product_id])
    } else {
      model.findRelated(params, (err, result) => {
        if(err) {
          console.log(err)
          res.status(500).send()
        } else {
          res.send(result.rows[0].related)
          saveToCache(relatedCache, req.params.product_id, result.rows[0].related)
        }
      })
    }
  }
}