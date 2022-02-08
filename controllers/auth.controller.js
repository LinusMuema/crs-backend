const User = require("../models/user.model");

const { error } = require("../utils/response");
const { generateToken } = require('../utils/jwt');

exports.signUp = (req, res) => {
  try {
    const user = await new User(req.body).save();
    const token = generateToken(user._id);
    res.status(200).json({token, user})
  } catch (err) {
    error(res, 500, err);
  }
};

exports.login = (req, res) => {};
