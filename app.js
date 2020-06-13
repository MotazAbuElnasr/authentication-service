const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("express-async-errors");
require("./db");
const todoRouter = require("./routes/todos");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/todo", todoRouter);
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
