const Request = require('../models/request.model');
const Vehicle = require('../models/vehicle.model');

const { error } = require('../utils/response');

exports.createVehicle = async (req, res) => {
    try {
        const vehicle = await new Vehicle(req.body).save();
        res.status(201).json(vehicle);
    } catch (e) { error(res, 500, e.message); }
}

exports.updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.body.id, req.body, { new: true });
        res.status(200).json(vehicle);
    } catch (e) { error(res, 500, e.message); }
}

exports.getVehicles = async (req, res) => {
    try {
        const body = req.body;
         const vehicles = await Vehicle.find({
            make: body.make,
            available: true,
            to: { $lte: body.to },
            from: { $gte: body.from },
            model: { $regex: body.model, $options: 'i' }
        });
        res.status(200).json(vehicles);
    } catch (e) { error(res, 500, e.message); }
}

exports.requestVehicle = async (req, res) => {
    try {
        // TODO: send notification to vehicle owner
        const request = await new Request(req.body).save();
        res.status(201).json(request);
    } catch (e) { error(res, 500, e.message); }
}
