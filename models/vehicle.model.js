const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    to: Date,
    from: Date,
    make: String,
    plate: String,
    model: String,
    color: String,
    available: Boolean,
    description: String,
    images: [{ type: String }],
    user: { type: mongoose.Schema.Types.ObjectId,  ref: 'User'},
}, { timestamps: true });

const model = mongoose.model('Vehicle', schema);
module.exports = model;
