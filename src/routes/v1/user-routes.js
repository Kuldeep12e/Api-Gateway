const express = require('express');
const { UserController } = require('../../controllers');
const validateAuthRequest = require('../../middlewares/auth-request');

const router = express.Router();

router.post('/signup', validateAuthRequest, UserController.createUser);
router.post('/login', validateAuthRequest, UserController.signIn);

module.exports = router;