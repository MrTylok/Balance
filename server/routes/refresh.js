const express = require('express');
const timeStamp = require('../middleware/timeStamp');
const refreshController = require('../controllers/refreshToken').controller;

const router = express.Router();

router.post('/refresh', refreshController);

module.exports = router;
