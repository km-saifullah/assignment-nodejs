const express = require("express");
const {
  registerUser,
  lognUser,
  getAllUsers,
} = require("../controllers/userController");
const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/registration").post(registerUser);
router.route("/login").post(lognUser);

module.exports = router;
