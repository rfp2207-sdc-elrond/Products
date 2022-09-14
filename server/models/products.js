const mongoose = require('mongoose')


const testSchema = new mongoose.Schema({
  id: {type: String, unique: true},
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
})

const productsSchema = new mongoose.Schema({
  id: {type: String, unique: true},
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: {
    feature: String,
    value: String
  },
  realted: {
    product_id: String
  }
})

const stylesSchema = new mongoose.Schema({
  id: {type: String, unique: true},
  product_id: {type: String, unique: true},
  name: String,
  original_price: String,
  sale_price: String,
  default: Boolean,
  photos: {
    thumbnail_url: String,
    url: String
  },
  skus: {
    quantity: Number,
    size: String
  }

})

module.exports = mongoose.model('Products', productsSchema)
module.exports = mongoose.model('Styles', stylesSchema)
module.exports = mongoose.model('Test', testSchema)