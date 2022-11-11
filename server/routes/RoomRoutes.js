const express = require('express')
const router = express.Router();
const RoomController = require('../controller/RoomController');

router.post('/create', RoomController.createRoom)
router.delete('/delete', RoomController.deleteRoom)
router.post('/changes', RoomController.changesRoom)
router.get('/type', RoomController.getAllTypeRoom)
router.get('/', RoomController.getAllRoom)
router.get('/:id', RoomController.getOneRoom)
router.post('/createType', RoomController.createTypeRoom)
router.delete('/deleteType', RoomController.deleteTypeRoom)
router.post('/changesType', RoomController.changesTypeRoom)



module.exports = router