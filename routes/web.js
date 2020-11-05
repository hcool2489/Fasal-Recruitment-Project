const express = require('express');
const webController = require('../controllers/web');
const router = express.Router();
const isAuth = require('../middlewares/is-auth');

router.get('/dashboard', isAuth, webController.getDashboard);

module.exports = router;