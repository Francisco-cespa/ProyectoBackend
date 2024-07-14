const express = require("express");
const router = express.Router();
const { saveCarts, setCarts } = require("../utils/cartsUtils.js");

setCarts();

module.exports = router;
