const db = require('./../db')

module.exports = {
  findAll: (params, callback) => {
    const query =
      'SELECT id, name, slogan, description, category, default_price FROM products ORDER BY id ASC LIMIT $1 OFFSET $2'
    db.query(query, params, (err, results) => {
      callback(err, results)
    })
  },
  findOne: (params, callback) => {
    const query =
      `SELECT  id, name, slogan, description, category, default_price, features
      FROM products
      WHERE id = $1`
    db.query(query, params, (err, results) => {
      callback(err, results)
    })
  },
  findStyles: (params, callback) => {
    const query =
      `SELECT id, styles as results FROM products WHERE id = $1`
    db.query(query, params, (err, results) => {
      callback(err, results)
    })
  },
  findRelated: (params, callback) => {
    const query =
    `SELECT related from products WHERE id = $1`
    db.query(query, params, (err, results) => {
      callback(err, results)
    })
  }
}