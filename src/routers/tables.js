const express = require('express');
const router  = express.Router();
const tableController = require('../controllers/tables');

router.get('/', tableController.getAllTables);
router.get('/:table', tableController.getTable);
router.get('/:table/relationships', tableController.getTableRelationships);

module.exports = router;