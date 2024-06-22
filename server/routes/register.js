const express = require('express');
const router = express.Router();
const timeStamp = require('../middleware/timeStamp');
const updateStats = require('../middleware/updateStat');
const registerController = require('../controllers/registerController');

router.post('/', [timeStamp, registerController, updateStats]);

module.exports = router;
