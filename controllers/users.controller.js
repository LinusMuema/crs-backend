const User = require('../models/user.model');
const Request = require('../models/request.model');

const {error} = require('../utils/response');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req._id);
        res.status(200).json(user);
    } catch (e) {
        error(res, 500, e.message);
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const update = await User.findByIdAndUpdate(req._id, req.body, {new: true});
        res.status(200).json(update);
    } catch (e) {
        error(res, 500, e.message);
    }
}

exports.getRequests = async (req, res) => {
    try {
        const requests = await Request.find({client: req._id})
            .populate('client')
            .populate({'path': 'vehicle', populate: {path: 'user'}});

        res.status(200).json(requests);
    } catch (e) {
        error(res, 500, e.message);
    }
}
