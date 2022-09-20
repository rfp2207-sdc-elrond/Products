const promise = require('bluebird')
require("dotenv").config();

const initOptions = {
  promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);

const credentials = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASESTAGE,
  port: process.env.PGPORT,
}

const db = pgp(credentials);

const extractData = async() => {
  await db.any(
    `DROP TABLE IF EXISTS skus, photos, features, related, styles, products;`
  )
  await db.any(
    `CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    slogan VARCHAR,
    description VARCHAR,
    category VARCHAR,
    default_price VARCHAR
    );`
  )
  await db.any(
    `CREATE TABLE IF NOT EXISTS related (
    id SERIAL PRIMARY KEY,
    current_product_id INT REFERENCES products(id),
    related_product_id INT
    );`
  )
  await db.any(
    `CREATE TABLE IF NOT EXISTS features (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    feature VARCHAR,
    value VARCHAR
    );`
  )
  await db.any(
    `CREATE TABLE IF NOT EXISTS styles (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    name VARCHAR,
    sale_price VARCHAR,
    original_price VARCHAR,
    default_style BOOLEAN
    );`
  )
  await db.any(
    `CREATE TABLE IF NOT EXISTS photos (
    id SERIAL PRIMARY KEY,
    style_id INT REFERENCES styles(id),
    url VARCHAR,
    thumbnail_url VARCHAR
    );`
  )
  await db.any(
    `CREATE TABLE IF NOT EXISTS skus (
    id SERIAL PRIMARY KEY,
    style_id INT REFERENCES styles(id),
    size VARCHAR,
    quantity INT
    );`
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
};

extractData();




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