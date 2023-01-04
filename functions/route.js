const router = require('express').Router();
const controller = require('./controller');
const propertyDataController = require('./propertyDataController');

router.get('/test/', controller.getTest);
router.get('/rentaldata/', controller.getRentalData);
router.get("/propertydata/", propertyDataController.propertyDataEstated);

module.exports = router;