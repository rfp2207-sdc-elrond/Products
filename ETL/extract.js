const promise = require('bluebird')
require("dotenv").config();

const initOptions = {
  promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);

const credentials = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
}

const db = pgp(credentials);

const loadData = async() => {
  await db.any(
    `DROP TABLE IF EXISTS cart, skus, photos, features, related, styles, products;`
  )
  await db.any(
    `COPY products
    FROM '/Users/danielzweig/Desktop/HackReactor/SDC/Products/data/product.csv' DELIMITER ',' CSV HEADER;`
  )
  await db.any(
    `COPY related
    FROM '/Users/danielzweig/Desktop/HackReactor/SDC/Products/data/related.csv' DELIMITER ',' CSV HEADER;`
  )
  await db.any(
    `COPY features
    FROM '/Users/danielzweig/Desktop/HackReactor/SDC/Products/data/features.csv' DELIMITER ',' CSV HEADER;`
  )
  await db.any(
    `COPY styles
    FROM '/Users/danielzweig/Desktop/HackReactor/SDC/Products/data/styles.csv' DELIMITER ',' NULL as 'null' CSV HEADER;`
  )
  await db.any(
    `COPY photos
    FROM '/Users/danielzweig/Desktop/HackReactor/SDC/Products/data/photos.csv' DELIMITER ',' CSV HEADER;`
  )
  await db.any(
    `COPY skus
    FROM '/Users/danielzweig/Desktop/HackReactor/SDC/Products/data/skus.csv' DELIMITER ',' CSV HEADER;`
  )
  await db.any(
    `COPY cart
    FROM '/Users/danielzweig/Desktop/HackReactor/SDC/Products/data/cart.csv' DELIMITER ',' CSV HEADER;`
  )
};

loadData();




//-----------------------------------------

// require('dotenv').config()

// const fs = require('fs')
// const fastcsv = require('fast-csv')
// const db = require('./server/db')

// const csvParse = (file, query) => {
//   let stream = fs.createReadStream(`./data/${file}`)
//   let csvData = []
//   let csvStream = fastcsv
//     .parse()
//     .on('data', (data) => {
//       csvData.push(data)
//     })
//     .on('end', () => {
//       csvData.shift()
//       csvData.forEach(row => {
//         db.query(query, row, (err, res) => {
//           if (err) {
//             console.log(err)
//           } else {
//             console.log(`uploaded ${row[0]} rows into ${file}`)
//           }
//         })
//       })
//     })
//   stream.pipe(csvStream)
// }

// const product = new Promise((resolve, reject) => {
//   csvParse('product.csv',
//     `INSERT INTO test (id, name, slogan, description, category, default_price) VALUES ($1, $2, $3, $4, $5, $6)`)
//   resolve('product upload complete')
// })
// const related = new Promise((resolve, reject) => {
//   csvParse('related.csv',
//     `INSERT INTO test (id, current_product_id, related_product_id) VALUES ($1, $2, $3)`)
//   resolve('related upload complete')
// })
// const features = new Promise((resolve, reject) => {
//   csvParse('related.csv',
//     `INSERT INTO test (id, current_product_id, related_product_id) VALUES ($1, $2, $3)`)
//   resolve('features upload complete')
// })

// Promise.all([product, related, features]).then((messages) => {console.log(messages)})