const express = require('express');
const router = express.Router();
const timeStamp = require('../middleware/timeStamp');
const updateStat = require('../middleware/updateStat');

const controllerAuth = require('../controllers/authController');

router.post('/', [timeStamp, controllerAuth, updateStat]);

module.exports = router;
