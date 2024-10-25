const auth = (req, res, next) => {
  if (req.headers.username === "monmoy") {
    next();
  } else {
    return res.json({ message: "unauthorized user" });
  }
};
module.exports = auth;
