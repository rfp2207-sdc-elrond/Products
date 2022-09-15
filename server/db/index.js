const { Pool } = require('pg')

const credentials = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
}

const pool = new Pool (credentials)

;(async function() {
  const client = await pool.connect()
  await client.query(
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name VARCHAR(50),
      slogan VARCHAR(50),
      description VARCHAR(300),
      category VARCHAR(20),
      default_price VARCHAR
    );

    CREATE TABLE IF NOT EXISTS related (
      id INTEGER PRIMARY KEY,
      related_product_id VARCHAR,
      current_product_id INTEGER REFERENCES products(id)
      );

    CREATE TABLE IF NOT EXISTS features (
      id INTEGER PRIMARY KEY,
      feature VARCHAR(50),
      value VARCHAR(50),
      product_id INTEGER REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS styles (
      id INTEGER PRIMARY KEY,
      name VARCHAR(50),
      original_price VARCHAR,
      sale_price VARCHAR,
      default_style INTEGER,
      product_id INTEGER REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY,
      thumbnail_url VARCHAR,
      url VARCHAR,
      style_id INTEGER REFERENCES styles(id)
    );

    CREATE TABLE IF NOT EXISTS skus (
      id INTEGER PRIMARY KEY,
      quantity INTEGER,
      size VARCHAR,
      style_id INTEGER REFERENCES styles(id)
    );

    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY,
      user_session INTEGER,
      active integer,
      product_id INTEGER REFERENCES products(id)
    );`
  )
  client.release()
})()
