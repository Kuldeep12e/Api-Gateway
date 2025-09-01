const express = require('express');
const { UserController } = require('../../controllers');

const router = express.Router();

router.post('/signup', UserController.createUser);
router.post('/login', UserController.signIn);

module.exports = router;