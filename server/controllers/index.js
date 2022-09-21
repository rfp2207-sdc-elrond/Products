const model = require('../models')

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
    model.findOne(params, (err, result) => {
      if(err) {
        console.log(err)
        res.status(500).send()
      } else {
        res.send(result.rows[0])
      }
    })
  },
  getStyles: (req, res) => {
    const params = [req.params.product_id]
    model.findStyles(params, (err, result) => {
      if(err) {
        console.log(err)
        res.status(500).send()
      } else {
        res.send(result.rows[0])
      }
    })
  },
  getRelated: (req, res) => {
    const params = [req.params.product_id]
    model.findRelated(params, (err, result) => {
      if(err) {
        console.log(err)
        res.status(500).send()
      } else {
        res.send(result.rows[0].related)
      }
    })
  }
}