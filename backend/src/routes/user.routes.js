"use strict";
const { Router } = require("express");
const {
    getUser 
} = require("../controllers/user.controller.js");

const router = Router();

router
    .get("/", getUser);

module.exports = router;