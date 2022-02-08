const mongoose = require('mongoose');

const status = ['pending', 'accepted', 'rejected'];

const schema = new mongoose.Schema({
    message: String,
    status: { type: String, enum: status, default: 'pending' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
});

const model = mongoose.model('Request', schema);
module.exports = model;
