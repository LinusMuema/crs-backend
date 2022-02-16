const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('../utils/bcrypt');
const image_url = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'

const schema = new mongoose.Schema({
    phone: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    location: {
        coordinates: { type: [Number], default: [0, 0] },
        type: { type: String, enum: ['Point'], default: 'Point' }
    },
    username: String,
    password: String,
    fcm_token: String,
    avatar: { type: String, default: image_url },
})


schema.index({ location: '2dsphere' });
schema.pre('save', async function (next){
    if (this.isNew){
        this.password = await bcrypt.hashPassword(this.password);
        this.username = crypto.randomBytes(8).toString('hex');
    }
    next();
})

const model = mongoose.model('User', schema);
module.exports = model;
