const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/login', authController.login);
router.post('/login', authController.doLogin);

router.get('/signup', authController.signup);
router.post('/signup', authController.doSignup);

router.get('/logout', authController.logout);

module.exports = router;