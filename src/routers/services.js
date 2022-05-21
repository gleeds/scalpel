const express = require('express');
const router  = express.Router();
const servicesController = require('../controllers/services');

router.get('/', servicesController.getAllServices);
router.get('/:id', servicesController.getServiceById);
router.post('/', servicesController.createService);
router.delete('/:id', servicesController.deleteService);
router.get('/:id/boundaries', servicesController.getServiceBoundaries);

module.exports = router;