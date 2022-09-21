const express = require('express')
const router = express.Router()
const controller = require('../controllers')


router.get('/', controller.getAllProducts)

router.get('/:product_id', controller.getOneProduct)

router.get('/:product_id/styles', controller.getStyles)

router.get('/:product_id/related', controller.getRelated)

module.exports = router