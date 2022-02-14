const mongoose = require('mongoose');

const makes = ['toyota', 'jeep', 'bmw', 'audi', 'mazda', 'ford', 'honda', 'nissan', 'hyundai', 'kia', 'volkswagen', 'land rover', 'mitsubishi', 'mercedes benz', 'chevrolet', 'lexus', 'subaru', 'suzuki', 'porsche']
const schema = new mongoose.Schema({
    to: Date,
    from: Date,
    model: String,
    color: String,
    description: String,
    images: [{ type: String }],
    plate: {type: String, unique: true},
    make: { type: String, enum: makes },
    available: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId,  ref: 'User'},
}, { timestamps: true });

const model = mongoose.model('Vehicle', schema);
module.exports = model;
