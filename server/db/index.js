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
    `CREATE TABLE IF NOT EXISTS test (
      id SERIAL PRIMARY KEY,
      name VARCHAR,
      slogan VARCHAR,
      description VARCHAR,
      category VARCHAR,
      default_price VARCHAR
    );

    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR PRIMARY KEY,
      name VARCHAR,
      slogan VARCHAR,
      description VARCHAR,
      category VARCHAR,
      default_price VARCHAR
    );

    CREATE TABLE IF NOT EXISTS related (
      id VARCHAR PRIMARY KEY,
      current_product_id VARCHAR REFERENCES products(id),
      related_product_id VARCHAR
      );

    CREATE TABLE IF NOT EXISTS features (
      id VARCHAR PRIMARY KEY,
      product_id VARCHAR REFERENCES products(id),
      feature VARCHAR,
      value VARCHAR
    );

    CREATE TABLE IF NOT EXISTS styles (
      id VARCHAR PRIMARY KEY,
      product_id VARCHAR REFERENCES products(id),
      name VARCHAR,
      sale_price VARCHAR,
      original_price VARCHAR,
      default_style VARCHAR
    );

    CREATE TABLE IF NOT EXISTS photos (
      id VARCHAR PRIMARY KEY,
      style_id VARCHAR REFERENCES styles(id),
      url VARCHAR,
      thumbnail_url VARCHAR
    );

    CREATE TABLE IF NOT EXISTS skus (
      id VARCHAR PRIMARY KEY,
      style_id VARCHAR REFERENCES styles(id),
      size VARCHAR,
      quantity VARCHAR
    );

    CREATE TABLE IF NOT EXISTS cart (
      id VARCHAR PRIMARY KEY,
      user_session VARCHAR,
      product_id VARCHAR REFERENCES products(id),
      active VARCHAR
    );`
  )
  client.release()
})()
