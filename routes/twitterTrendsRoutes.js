const express = require("express");
const router = express.Router();

const twitterTrends = require("../controllers/twitterTrends")
router.get("/twitter/Trends",twitterTrends.getTrends)

module.exports = router