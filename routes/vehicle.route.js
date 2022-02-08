const express = require('express');
const router = express.Router();
const middleware = require('../utils/middleware');
const controller = require('../controllers/vehicles.controller');

router.put('/', middleware.verify, controller.updateVehicle);

router.post('/', middleware.verify, controller.createVehicle);

router.post('/available', middleware.verify, controller.getVehicles);

module.exports = router;
