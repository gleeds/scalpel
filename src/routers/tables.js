const express = require('express');
const router  = express.Router();
const tableController = require('../controllers/tables');

router.get('/', tableController.getAllTables);
router.get('/:table', tableController.getTable);
router.get('/:table/relationships', tableController.getTableRelationships);
router.post('/:table/services', tableController.setTableService);
router.delete('/:table/services', tableController.deleteTableService);

module.exports = router;