const express = require('express');
const timeStamp = require('../middleware/timeStamp');
const refreshController = require('../controllers/refreshToken');

const router = express.Router();

router.post('/', timeStamp, refreshController);

module.exports = router;
