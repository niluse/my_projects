"use strict";

const player = require("../controllers/player.controller.js");

const router = require("express").Router();

router.route("/").get(player.list).post(player.create);

module.exports = router;
