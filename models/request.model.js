const mongoose = require('mongoose');

const status = ['pending', 'accepted', 'collected', 'completed', 'rejected'];

const schema = new mongoose.Schema({
    to: Date,
    from: Date,
    locations: [],
    message: String,
    end: {type: Date, default: Date.now},
    start: {type: Date, default: Date.now},
    status: {type: String, enum: status, default: 'pending'},
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    vehicle: {type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
});

const model = mongoose.model('Request', schema);
module.exports = model;
