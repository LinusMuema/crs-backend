const jwt = require('jsonwebtoken');

exports.generateToken = async (id) => {
    const payload = `${Date}-${id}`
    return jwt.sign(payload, process.env.TOKEN_SECRET);
}
