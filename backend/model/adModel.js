const mongoose = require("mongoose");

const adSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    nickname: {
      type: String,
      required: true,
      ref: "User",
    },
    mobile: {
      type: String,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ad", adSchema);
