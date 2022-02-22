const User = require('../models/user.model');
const Request = require('../models/request.model');
const Vehicle = require('../models/vehicle.model');

const {error} = require('../utils/response');

exports.createVehicle = async (req, res) => {
    try {
        req.body.user = req._id;
        const vehicle = await new Vehicle(req.body).save();
        await vehicle.populate('user');

        res.status(201).json(vehicle);
    } catch (e) {
        error(res, 500, e.message);
    }
}

exports.updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.body.id, req.body, {new: true})
            .populate('user');

        res.status(200).json(vehicle);
    } catch (e) {
        error(res, 500, e.message);
    }
}

exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({user: req._id})
            .populate('user');

        res.status(200).json(vehicles);
    } catch (e) {
        error(res, 500, e.message);
    }
}

exports.searchVehicles = async (req, res) => {
    try {
        const body = req.body;
        const vehicles = await Vehicle.find({
            make: body.make,
            available: true,
            to: {$lte: body.to},
            from: {$gte: body.from},
            model: {$regex: body.model, $options: 'i'}
        }).populate('user');
        res.status(200).json(vehicles);
    } catch (e) {
        error(res, 500, e.message);
    }
}

exports.getNearby = async (req, res) => {
    try {
        const lat = req.body.lat;
        const lng = req.body.lng;

        const users = await User.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    },
                    $minDistance: 0,
                    $maxDistance: 500000
                }
            }
        });

        const ids = users.map(u => u._id).filter(id => id.toString() !== req._id.toString());
        const vehicles = await Vehicle.find({user: {$in: ids}, available: true})
            .populate('user');

        res.status(200).json(vehicles);
    } catch (e) {
        error(res, 500, e.message);
    }
}

exports.requestVehicle = async (req, res) => {
    try {
        // TODO: send notification to vehicle owner
        req.body.client = req._id;
        const request = await new Request(req.body).save();

        await request.populate('client');
        await request.populate({'path': 'vehicle', populate: {path: 'user'}});
        await Vehicle.findByIdAndUpdate(request.vehicle._id, {$set: {available: false}});

        res.status(201).json(request);
    } catch (e) {
        error(res, 500, e.message);
    }
}

exports.getRequests = async (req, res) => {
    try {
        const requests = await Request.find({vehicle: req.body.id})
            .populate('client')
            .populate({'path': 'vehicle', populate: {path: 'user'}});

        res.status(200).json(requests);
    } catch (e) {
        error(res, 500, e.message);
    }
}

exports.updateRequest = async (req, res) => {
    try {
        // TODO: send notification to requesting user
        const request = await Request.findByIdAndUpdate(req.body.request, req.body, {new: true})
            .populate('client')
            .populate({'path': 'vehicle', populate: {path: 'user'}});

        if (req.body.status === 'rejected')
            await Vehicle.findByIdAndUpdate(request.vehicle._id, {$set: {available: true}});

        res.status(200).json(request);
    } catch (e) {
        error(res, 500, e.message);
    }
}

exports.updateLocation = async (req, res) => {
    try {
        const items = req.body.locations;
        const filtered = [...new Set(items.map(JSON.stringify))].map(JSON.parse);
        const locations = filtered.map(l => ({type: 'Point', coordinates: [l[0], l[1]]}));

        const vehicle = await Request.findByIdAndUpdate(req.body.request, {$push: {locations}}, {new: true})
            .populate('client')
            .populate({'path': 'vehicle', populate: {path: 'user'}});

        res.status(200).json(vehicle);
    } catch (e) {
        error(res, 500, e.message);
    }
}
