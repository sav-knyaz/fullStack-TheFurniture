const express = require('express');
const router = express.Router();
const basketController = require('../controller/BasketController');

router.get('/:basketId', basketController.getAll);
router.delete('/', basketController.removeFromCart);
router.delete('/device', basketController.removeFromCartDevice);



module.exports = router