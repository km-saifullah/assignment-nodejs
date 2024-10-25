const mongoose = require("mongoose");

const userSchmea = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,

    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchmea);
module.exports = User;
