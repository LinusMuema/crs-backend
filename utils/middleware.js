const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const { error } = require('./response');

exports.verify = async (req, res, next) => {
    try {
        const bearer = req.headers.authorization
        if (!bearer) return error(res,401, 'please provide an bearer token')

        const token = bearer.split(' ')[1]
        const decode = await jwt.verify(token, process.env.TOKEN_SECRET)

        const id = decode.split('-')[1]
        req._id = id
        req.user = await User.findById(id)
        next()
    } catch (e){ error(res, 500, e.message) }
}

exports.status = async (req, res, next) => {
    try {
        process.env.MAINTENANCE === "true"
            ? error(res, 500, 'server under maintenance')
            : next()
    } catch (e){ error(res, 500, e.message) }
}


