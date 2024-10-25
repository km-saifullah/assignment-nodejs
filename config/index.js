require("dotenv").config();

const serverPort = process.env.PORT;
const dbUrl = process.env.MONGODB_URI;

module.exports = { serverPort, dbUrl };
