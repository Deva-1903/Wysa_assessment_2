const asyncHandler = require("express-async-handler");

const Ad = require("../model/adModel");

const getAllAds = asyncHandler(async (req, res) => {
  const ads = await Ad.find();

  res.status(200).json(ads);
});

module.exports = {
  getAllAds,
};
