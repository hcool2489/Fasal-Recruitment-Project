const User = require('../models/user');

exports.getDashboard = (req, res) => {
    console.log(req.session);
    res.render('dashboard', {
        pageTitle: 'Dashboard',
        name: req.session.user.name,
        email: req.session.user.email,
        age: req.session.user.age,
        gender: req.session.user.gender,
        image: req.session.user.image || undefined,
    });
};