require('dotenv').config()
const { Pool } = require('pg')
const express = require('express')
const productsRouter = require('./routes/products')
const app = express()

const credentials = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
}

async function poolDemo() {
  const pool = new Pool(credentials);
  const now = await pool.query("SELECT NOW()");
  await pool.end();

  return now;
}

(async () => {
  const poolResult = await poolDemo();
  console.log("Time with pool: " + poolResult.rows[0]["now"]);
})();

app.use(express.json())
app.use('/products', productsRouter)

app.listen(process.env.PORT, console.log('Server Started, listening on port', process.env.PORT))