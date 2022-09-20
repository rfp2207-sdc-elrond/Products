// type the following script into the command line to copy the products table from sdc-products-staging to sdc-products (make sure products in sdc-products is empty):

// pg_dump -a -t products sdc-products-staging | psql sdc-products

// afterwards, run node ETL/load.js to create index.



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

const createIndex = async() => {
  await db.any(
    `CREATE UNIQUE INDEX id_idx ON products(id);`
  )
};

createIndex();