const mongoose = require('mongoose');

const status = ['pending', 'accepted', 'collected', 'returned', 'rejected'];

const schema = new mongoose.Schema({
    to: Date,
    from: Date,
    locations: [],
    message: String,
    status: {type: String, enum: status, default: 'pending'},
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    vehicle: {type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
});

const model = mongoose.model('Request', schema);
module.exports = model;
