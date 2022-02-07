const User = require('../models/user.model');

const { error } = require('../utils/response');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req._id);
        res.status(200).json(user);
    } catch (e) { error(res, 500, e.message); }
}

exports.updateProfile = async (req, res) => {
    try {
        const update = await User.findByIdAndUpdate(req._id, req.body, { new: true });
        res.status(200).json(update);
    } catch (e) { error(res, 500, e.message); }
}
