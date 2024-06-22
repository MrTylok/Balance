const express = require('express');
const router = express.Router();

//middlewares
const timeStamp = require('../../middleware/timeStamp');
const verifyToken = require('../../middleware/verifyAuthorization');

//controllers images
const imageInfoController = require('../../controllers/imagesInfoController');
const imagesRetrieveController = require('../../controllers/retriveImages');

//controllers metrics
const metricsRetrieveController = require('../../controllers/serverMetricsRetrieve');

router.use(verifyToken);
router.post('/images/upload', [timeStamp, verifyToken, imageInfoController]);

router.post('/images/retrieve', [verifyToken, imagesRetrieveController]);

router.get('/metrics/retrieve', [verifyToken, metricsRetrieveController]);

module.exports = router;
