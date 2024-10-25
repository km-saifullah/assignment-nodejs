const express = require("express");
const imageUpload = require("../utils/imageUpload");
let upload = imageUpload();
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(auth, getAllTodos);
router.route("/createtodo").post(auth, upload.single("image"), createTodo);
router.route("/updatetodo").post(auth, upload.single("image"), updateTodo);
router.route("/deletetodo/:id").delete(auth, deleteTodo);

module.exports = router;
