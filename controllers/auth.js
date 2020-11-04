const User = require('../models/user');

exports.login = (req, res) => {
    if (req.session.uid) {
        res.redirect('/dashboard');
    } else {
        res.render('auth/login', { pageTitle: 'LogIn' });
    }
};

exports.doLogin = (req, res) => {
    console.log(req.body);
    res.send("Login");
};

exports.signup = (req, res) => {
    if (req.session.uid) {
        res.redirect('/dashboard');
    } else {
        res.render('auth/signup', { pageTitle: 'SignUp' });
    }
};

exports.doSignup = (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    //const pImg = req.body.pImg;
    User.findOne({ email: email })
        .then(userDoc => {
            if(userDoc){
                return res.redirect('/signup');
            }
            const user = new User({
                email: email,
                password: pass,
                name: name,
                age: age,
                gender: gender
            });
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.logout = (req, res) => {
    console.log(req.body);
    res.send("Logout");
};