const express = require('express');
const router  = express.Router();
const configController = require('../controllers/config');

router.get('/sync', configController.sync);
router.get('/ready', configController.ready);

module.exports = router;