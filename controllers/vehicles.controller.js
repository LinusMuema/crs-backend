const Request = require('../models/request.model');
const Vehicle = require('../models/vehicle.model');

const {error} = require('../utils/response');

exports.createVehicle = async (req, res) => {
    try {
        req.body.user = req._id;
        const vehicle = await new Vehicle(req.body).save();
        res.status(201).json(vehicle);
    } catch (e) {
        error(res, 500, e.message);
    }
}

exports.updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.body.id, req.body, {new: true});
        res.status(200).json(vehicle);
    } catch (e) {
        error(res, 500, e.message);
    }
}

exports.getVehicles = async (req, res) => {
    try {
        let vehicles;
        const body = req.body;

        // if there is no make specified, get 20 random vehicles
        // otherwise, get all vehicles that match the make
        if (body.make === '') {
            const items = await Vehicle.aggregate([
                {$unwind: '$user'},
                {$sample: {size: 20}},
                {$match: {available: true}},
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
            ]);
            vehicles = items.map(v => {
                v.user = v.user[0];
                return v;
            })
        } else {
            vehicles = await Vehicle.find({
                make: body.make,
                available: true,
                to: {$lte: body.to},
                from: {$gte: body.from},
                model: {$regex: body.model, $options: 'i'}
            });
        }
        res.status(200).json(vehicles);
    } catch (e) {
        error(res, 500, e.message);
    }
}

exports.requestVehicle = async (req, res) => {
    try {
        // TODO: send notification to vehicle owner
        const request = await new Request(req.body).save();
        res.status(201).json(request);
    } catch (e) {
        error(res, 500, e.message);
    }
}

exports.getRequests = async (req, res) => {
    try {
        const requests = await Request.find({vehicle: req.params.id}).populate('user');
        res.status(200).json(requests);
    } catch (e) {
        error(res, 500, e.message);
    }
}

exports.updateRequest = async (req, res) => {
    try {
        // TODO: send notification to requesting user
        const request = await Request.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(request);
    } catch (e) {
        error(res, 500, e.message);
    }
}
