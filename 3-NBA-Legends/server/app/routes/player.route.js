"use strict";

const player = require("../controllers/player.controller.js");

const router = require("express").Router();

router.route("/").get(player.list).post(player.create);
router.route("/search").get(player.search);

module.exports = router;
