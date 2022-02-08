const express = require('express');
const router = express.Router();
const middleware = require('../utils/middleware');
const controller = require('../controllers/auth.controller');

router.post("/signup", controller.signUp)

router.post("/login", controller.login)

module.exports = router;
