const mongoose = require("mongoose");
const { dbUrl } = require("../config");

const connectDb = async () => {
  await mongoose.connect(dbUrl);
  console.log("Database connected...!");
};

module.exports = connectDb;
