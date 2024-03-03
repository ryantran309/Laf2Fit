/* eslint-disable consistent-return */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  address: String,
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: String,
  weight: Number,
  height: Number,
  plan: String,
});

function hashPassword(next) {
  const user = this;

  if (!user.password) return next();

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (error, hash) {
      if (err) return next(error);
      user.password = hash;
      next();
    });
  });
}

function excludePasswordField() {
  const userFields = this._doc;
  // eslint-disable-next-line no-unused-vars
  const { password, ..._userFields } = userFields;

  return _userFields;
}

userSchema.pre("save", hashPassword);

userSchema.method("comparePassword", async function (password) {
  return bcrypt.compare(password, this.password);
});

userSchema.method("generateToken", function (fields = {}) {
  const userWithoutPassword = excludePasswordField.bind(this)();
  const token = jwt.sign(
    { ...userWithoutPassword, ...fields },
    config.get("jwt.secret")
  );
  return token;
});

userSchema.method("excludePasswordField", function () {
  const fields = excludePasswordField.bind(this)();
  return fields;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
