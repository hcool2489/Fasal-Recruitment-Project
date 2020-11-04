const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/is-auth');

router.get('/dashboard', isAuth, (req, res) => {
    res.render('dashboard', {
        pageTitle: 'Dashboard',
        name: 'Harshit',
        email: 'abc@abc.com',
        age: '21',
        gender: 'Male'
    });
});

module.exports = router;