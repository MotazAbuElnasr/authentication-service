const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { jwtSecret, saltWorkFactor } = require("../config");
const { pick } = require("../helpers/generalHelpers");
const signJWT = promisify(jwt.sign);
const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

const userPicker = pick(["firstName", "lastName", "username", "email"]);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, index: { unique: true } },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (doc) => {
        return userPicker(doc);
      },
    },
  }
);

const hashPassword = async function (next) {
  const salt = await genSalt(saltWorkFactor);
  this.password = await hash(this.password, salt);
  next();
};

userSchema.pre("save", hashPassword);

userSchema.methods.comparePassword = function (inputPassword) {
  return compare(inputPassword, this.password);
};

userSchema.methods.signJWT = function () {
  return signJWT(userPicker(this), jwtSecret);
};

module.exports = mongoose.model("User", userSchema);
