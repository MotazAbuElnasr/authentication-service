const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("express-async-errors");
require("./db");
const indexRouter = require("./routes/index");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", indexRouter);
// error handler
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
