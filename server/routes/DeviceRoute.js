const express = require('express');
const router = express.Router();
const deviceController = require('../controller/DeviceController');

router.post('/',  deviceController.creat);
router.post('/addDevice', deviceController.addToCart);
router.post('/rate', deviceController.rate);
router.post('/newCommit', deviceController.newCommit);
router.get('/', deviceController.getAll);
router.get('/search/:dev', deviceController.searchDevice)
router.get('/:id', deviceController.getOne);
router.delete('/', deviceController.delete);
router.post('/changes', deviceController.changesDevice);
router.post('/changesImage', deviceController.changesImageDevice);



module.exports = router