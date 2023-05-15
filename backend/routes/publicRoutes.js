const express = require("express");
const router = express.Router();
const { getAllAds } = require("../controllers/publicController");
const { protect } = require("../middleware/authMiddleware");

router.get("/get/ads", getAllAds);

module.exports = router;
