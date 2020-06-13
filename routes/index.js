const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { AuthenticationError } = require("../errors/ErrorsFactory");

const LoginError = AuthenticationError(
  "Either username or password or both are not correct"
);
router.post("/register", async (req, res, next) => {
  const user = await new User(req.body).save();
  res.json(user);
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) throw LoginError;
  const passwordCorrect = await user.comparePassword(password);
  if (!passwordCorrect) throw LoginError;
  user.signJWT().then((jwt) => res.json(jwt));
});

module.exports = router;
