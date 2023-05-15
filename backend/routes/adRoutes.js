const express = require("express");
const router = express.Router();

const {
  getAds,
  setAd,
  updateAd,
  deleteAd,
} = require("../controllers/adController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAds).post(protect, setAd);

router.route("/:id").put(protect, updateAd).delete(protect, deleteAd);

module.exports = router;
