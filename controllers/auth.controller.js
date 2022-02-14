const User = require("../models/user.model");
const bcrypt = require("../utils/bcrypt");
const { error } = require("../utils/response");
const { generateToken } = require("../utils/jwt");

exports.signUp = async (req, res) => {
    try {
        const user = await new User(req.body).save();
        const token = await generateToken(user._id);
        res.status(200).json({token, user});
    } catch (err) {
        error(res, 500, err);
    }
};

exports.login = async (req, res) => {
    try {
        const body = req.body;
        const user = await User.findOne({ email: body.email });
        if (!user) return error(res, 404, "user not found");

        const matches = await bcrypt.verifyPassword(body.password, user.password);
        if (!matches) return error(res, 403, "wrong password");

        const token = await generateToken(user._id);
        res.status(200).json({token, user});
    } catch (err) {
        error(res, 500, err);
    }
};
