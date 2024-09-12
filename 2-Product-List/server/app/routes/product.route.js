"use strict";

const product = require("../controllers/product.controller");

const router = require("express").Router();

router.route("/").get(product.list).post(product.create);

router
  .route("/:id")
  .get(product.read)
  .put(product.update)
  .patch(product.update)
  .delete(product.delete);

router.route("/category/:category").get(product.listByCategory);

module.exports = router;
