const express = require("express");
const path = require("path");
const { serverPort } = require("./config");
const connectDb = require("./db/connectDb");
const userRouter = require("./routes/userRoutes");
const todoRouter = require("./routes/todoRoutes");

const app = express();

// database connection
connectDb();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// user route
app.use("/api/v1/users/", userRouter);

// todo route
app.use("/api/v1/todos/", todoRouter);

// listen server
app.listen(serverPort, () =>
  console.log(`Server is running on port:${serverPort}`)
);
