const express = require('express');
const router = express.Router();
const typeController = require('../controller/TypeController');


router.post('/', typeController.create)
router.get('/', typeController.getAll)
router.delete('/', typeController.deleteType)


module.exports = router