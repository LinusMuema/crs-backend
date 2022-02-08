const mongoose = require('mongoose');

const image_url = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'

const schema = new mongoose.Schema({
    phone: String,
    email: String,
    username: String,
    password: String,
    fcm_token: String,
    avatar: { type: String, default: image_url },
})

const model = mongoose.model('User', schema);
module.exports = model;
