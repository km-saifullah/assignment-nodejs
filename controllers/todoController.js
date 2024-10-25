const multer = require("multer");
const Todo = require("../models/todoModel");
const User = require("../models/userModel");

// create a todo
const createTodo = async (req, res) => {
  const { title, description, image, postedBy } = req.body;
  if (title == undefined && title == "") {
    return res.json({ status: "fail", messgae: "title is required" });
  }
  let todo = new Todo({
    title: title,
    description: description,
    image: req.file.path,
    postedBy: postedBy,
  });
  await todo.save();
  return res.status(201).json({ status: "success", message: "todo created" });
};

// show all todos
const getAllTodos = async (req, res) => {
  const todos = await Todo.find({}).populate({
    path: "postedBy",
    select: "-password",
  });
  return res.json({ status: "success", message: "all todos", data: todos });
};

// update todo by id
const updateTodo = async (req, res) => {
  const { id, title, description, image, postedBy } = req.body;

  const existingTodo = await Todo.findOne({ _id: id });
  console.log(existingTodo);
  if (existingTodo == null) {
    return res.json({ status: "fail", message: "todo not found" });
  }

  let updatedData = {
    title: title || existingTodo.title,
    description: description || existingTodo.description,
    image: req.file.image || existingTodo.image,
    postedBy: postedBy,
  };

  let todo = await Todo.findByIdAndUpdate({ _id: id }, updatedData, {
    new: true,
  });
  return res.json({ status: "success", message: "todo updated", data: todo });
};

// delete todo by id
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete({ _id: id });
  return res.json({ message: "todo deleted" });
};

module.exports = { createTodo, getAllTodos, updateTodo, deleteTodo };
