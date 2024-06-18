const express = require('express');
const router = express.Router();
const timeStamp = require('../middleware/timeStamp').timeStamp;
const registerController =
  require('../controllers/registerController').controller;

router.post('/', [timeStamp, registerController]);

module.exports = router;
