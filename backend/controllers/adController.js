const asyncHandler = require("express-async-handler");

const Ad = require("../model/adModel");
const User = require("../model/userModel");

const getAds = asyncHandler(async (req, res) => {
  const ads = await Ad.find({ user: req.user.id });

  res.status(200).json(ads);
});

const setAd = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const ad = await Ad.create({
    text: req.body.text,
    user: req.user.id,
    nickname: req.user.nickname,
    mobile: req.user.mobile,
  });

  res.status(200).json(ad);
});

const updateAd = asyncHandler(async (req, res) => {
  const ad = await Ad.findById(req.params.id);

  if (!ad) {
    res.status(400);
    throw new Error("Ad not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (ad.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedAd = await Ad.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedAd);
});

const deleteAd = asyncHandler(async (req, res) => {
  const ad = await Ad.findById(req.params.id);

  if (!ad) {
    res.status(400);
    throw new Error("Ad not found");
  }

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the loggen
  if (ad.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await ad.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAds,
  setAd,
  updateAd,
  deleteAd,
};
