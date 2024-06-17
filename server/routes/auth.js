const express = require('express');
const router = express.Router();
const timeStamp = require('../middleware/timeStamp').timeStamp;

const controllerAuth = require('../controllers/authController').controller;

router.post('/', [timeStamp, controllerAuth]);

module.exports = router;
