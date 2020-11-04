const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/is-auth');

router.get('/dashboard', isAuth, (req, res) => {
    res.send('Auth');
});

module.exports = router;