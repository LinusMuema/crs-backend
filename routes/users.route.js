const express = require('express');
const router = express.Router();
const middleware = require('../utils/middleware');
const controller = require('../controllers/users.controller');

router.get('/', middleware.verify, controller.getProfile);

router.put('/', middleware.verify, controller.updateProfile);

router.get('/requests', middleware.verify, controller.getRequests);

module.exports = router;
