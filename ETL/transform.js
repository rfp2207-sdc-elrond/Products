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

const transformData = async() => {
  await db.any(
    `DROP TABLE IF EXISTS featuresTemp, relatedTemp, photosTemp, skusTemp, stylesTemp;`
  )
  await db.any(
    `ALTER TABLE products ADD COLUMN features JSON,
    ADD COLUMN related JSON,
    ADD COLUMN styles JSON;`
  )
  await db.any(
    `ALTER TABLE styles ADD COLUMN photos JSON,
    ADD COLUMN skus JSON;`
  )
  await db.any(
    `SELECT "features"."product_id", json_agg(json_build_object('feature', features.feature, 'value', features.value)) as features
    INTO TEMP TABLE featuresTemp
    FROM features
    GROUP BY "product_id";`
  )
  await db.any(
    `SELECT related.current_product_id, json_agg(related.related_product_id) as related
    INTO TEMP TABLE relatedTemp
    FROM related
    GROUP BY "current_product_id";`
  )
  await db.any(
    `SELECT "photos"."style_id", json_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) as photos
    INTO TEMP TABLE photosTemp
    FROM photos
    GROUP BY "style_id";`
  )
  await db.any(
    `SELECT "skus"."style_id", json_build_object("skus".id, json_build_object('quantity', skus.quantity, 'size', skus.size)) as skus
    INTO TEMP TABLE skusTemp
    FROM skus
    GROUP BY "style_id", "id";`
  )
  await db.any(
    `UPDATE products
    SET features=featuresTemp.features
    FROM featuresTemp
    WHERE  id=featuresTemp.product_id;`
  )
  await db.any(
    `UPDATE products
    SET related=relatedTemp.related
    FROM relatedTemp
    WHERE  id=relatedTemp.current_product_id;`
  )
  await db.any(
    `UPDATE styles
    SET photos=photosTemp.photos
    FROM photosTemp
    WHERE  id=photosTemp.style_id;`
  )
  await db.any(
    `UPDATE styles
    SET skus=skusTemp.skus
    FROM skusTemp
    WHERE  id=skusTemp.style_id;`
  )
  await db.any(
    `SELECT "styles"."product_id", json_agg(json_build_object('style_id', styles.id, 'name', styles.name, 'original_price', styles.original_price, 'sale_price', styles.sale_price, 'default?', styles.default_style, 'photos', styles.photos, 'skus', styles.skus)) as results
    INTO TEMP TABLE stylesTemp
    FROM styles
    GROUP BY "product_id"`
  )
  await db.any(
    `UPDATE products
    SET styles=stylesTemp.results
    FROM stylesTemp
    WHERE id=stylesTemp.product_id`
  )
};

transformData();