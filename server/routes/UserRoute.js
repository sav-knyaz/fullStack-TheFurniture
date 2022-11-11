const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/login', userController.login)
router.post('/registration', userController.registration)
router.get('/auth', userController.check)
router.post('/getOneUser', userController.getOneUser)


module.exports = router