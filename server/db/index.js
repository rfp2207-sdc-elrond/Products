const { Pool } = require('pg')

const credentials = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
}

const pool = new Pool (credentials)

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}

;(async function() {
  const client = await pool.connect()
  await client.query(
    `CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR,
      slogan VARCHAR,
      description VARCHAR,
      category VARCHAR,
      default_price INTEGER
    );

    CREATE TABLE IF NOT EXISTS related (
      id SERIAL PRIMARY KEY,
      current_product_id INT REFERENCES products(id),
      related_product_id INT
      );

    CREATE TABLE IF NOT EXISTS features (
      id SERIAL PRIMARY KEY,
      product_id INT REFERENCES products(id),
      feature VARCHAR,
      value VARCHAR
    );

    CREATE TABLE IF NOT EXISTS styles (
      id SERIAL PRIMARY KEY,
      product_id INT REFERENCES products(id),
      name VARCHAR,
      sale_price INT,
      original_price INT,
      default_style INT
    );

    CREATE TABLE IF NOT EXISTS photos (
      id SERIAL PRIMARY KEY,
      style_id INT REFERENCES styles(id),
      url VARCHAR,
      thumbnail_url VARCHAR
    );

    CREATE TABLE IF NOT EXISTS skus (
      id SERIAL PRIMARY KEY,
      style_id INT REFERENCES styles(id),
      size VARCHAR,
      quantity INT
    );

    CREATE TABLE IF NOT EXISTS cart (
      id SERIAL PRIMARY KEY,
      user_session VARCHAR,
      product_id INT REFERENCES products(id),
      active VARCHAR
    );`
  )
  client.release()
})()
