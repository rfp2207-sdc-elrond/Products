const express = require('express')
const db = require('./../db')
const router = express.Router()

// get all products
router.get('/', (req, res) => {
  const query = 'EXPLAIN ANALYZE SELECT * FROM products limit 5'
  const params = []
  db.query(query, params, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      res.json(result)
    }
  })
})

// get specific product data
router.get('/:product_id', (req, res) => {
  const query =
    `EXPLAIN ANALYZE
    SELECT "p".*, f.features
    FROM "products" as "p"
    LEFT JOIN (
      SELECT "features"."product_id", json_agg(json_build_object('feature', features.feature, 'value', features.value)) as features
      FROM features
      GROUP BY "product_id"
    ) AS "f" on "f"."product_id" = "p"."id"
    where product_id = $1`
  const params = [req.params.product_id]
  db.query(query, params, (err, result) => {
    if(err) {
      console.log(err)
      res.status(500).send()
    } else {
      res.json(result)
    }
  })
})

// get styles for specific product id
router.get('/:product_id/styles', (req, res) => {
  const query =
  `EXPLAIN ANALYZE
  SELECT styles.product_id, "results".results
  FROM "styles"
  LEFT JOIN (
    SELECT styles.id, json_agg(json_build_object('style_id', styles.id, 'name', styles.name, 'original_price', styles.original_price, 'sale_price', styles.sale_price, 'default?', styles.default_style, 'photos', "photos".photos, 'skus', "skus".skus)) as results
    FROM "styles"
    LEFT JOIN (
      SELECT "photos"."style_id", json_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) as photos
      FROM photos
      GROUP BY "style_id"
    ) as "photos" on "photos"."style_id" = "styles"."id"
    LEFT JOIN (
      SELECT "skus"."style_id", json_build_object("skus".id, json_build_object('quantity', skus.quantity, 'size', skus.size)) as skus
      FROM skus
      GROUP BY "style_id", "id"
    ) as "skus" on "skus"."style_id" = "styles"."id"
    GROUP BY "id"
  ) as "results" on "results".id = "styles".id
  WHERE styles.product_id = $1`
  const params = [req.params.product_id]
  db.query(query, params, (err, result) => {
    if(err) {
      console.log(err)
      res.status(500).send()
    } else {
      res.json(result)
    }
  })
})

// get related products for specific product id
router.get('/:product_id/related', (req, res) => {
  const query = `EXPLAIN ANALYZE SELECT json_agg(related.related_product_id) FROM related WHERE current_product_id = $1`
  const params = [req.params.product_id]
  db.query(query, params, (err, result) => {
    if(err) {
      console.log(err)
      res.status(500).send()
    } else {
      res.json(result)
    }
  })
})

module.exports = router