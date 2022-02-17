const express = require('express');
const router = express.Router();
const middleware = require('../utils/middleware');
const controller = require('../controllers/vehicles.controller');

router.get('/', middleware.verify, controller.getVehicles);

router.put('/', middleware.verify, controller.updateVehicle);

router.post('/', middleware.verify, controller.createVehicle);

router.post('/nearby', middleware.verify, controller.getNearby);

router.put('/request', middleware.verify, controller.updateRequest);

router.post('/search', middleware.verify, controller.searchVehicles);

router.post('/request', middleware.verify, controller.requestVehicle);

router.get('/requests/:id', middleware.verify, controller.getRequests);

module.exports = router;
