"use strict";
const { Router } = require("express");
const userRoutes = require("./user.routes.js");

const router = Router();

router 
    .use("/users", userRoutes);

// Health-check simple: GET /api/health
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = router;