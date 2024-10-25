const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  //   check required field have given or not
  if (username == "" && password == "") {
    return res.json({ message: "username & password are required" });
  }

  //   hash password
  let hashedPassword = await bcrypt.hash(password, 10);

  //   check user already exist or not in db
  const userExist = await User.findOne({ username: username });
  if (userExist != null) {
    return res.json({ message: "user already exist" });
  }

  //   create user
  const user = new User({
    username: username,
    password: hashedPassword,
  });
  await user.save();
  return res.json({ status: "success", message: "user created", data: user });
};

// login user
const lognUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (username == "" && password == "") {
    return res.json({ message: "username and password are required" });
  }

  const userExist = await User.findOne({ username: username });
  if (userExist === null) {
    return res.json({ message: "user not registerd yet" });
  }

  const passwordMatch = await bcrypt.compare(password, userExist.password);
  if (passwordMatch) {
    return res.json({ message: "login successful" });
  }
};

// show all users
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json({
    status: "success",
    results: users.length,
    message: "all users data",
    data: { users },
  });
};

module.exports = { registerUser, lognUser, getAllUsers };
