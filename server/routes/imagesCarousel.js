const express = require('express');
const handleRoute = require('../controllers/imagesCarousel_Controller');
const router = express.Router();

router.get('/', handleRoute());

module.exports = router;
