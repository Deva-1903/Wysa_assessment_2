const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    nickname: {
      type: String,
      required: [true, "Please add a name"],
    },
    mobile: {
      type: String,
      required: [true, "Please add a mobile"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
