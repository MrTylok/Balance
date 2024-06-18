const express = require('express');
const router = express.Router();
const controllerLogout = require('../controllers/logoutController');
const { timeStamp } = require('../middleware/timeStamp');

router.post('/', timeStamp, controllerLogout);

module.exports = router;
