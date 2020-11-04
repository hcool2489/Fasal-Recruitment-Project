const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.login = (req, res) => {
    if (req.session.isLoggedIn) {
        res.redirect('/dashboard');
    } else {
        let msg = req.params.msg;
        res.render('auth/login', { pageTitle: 'LogIn', msg: msg });
    }
};

exports.doLogin = (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.redirect('/login/Email Does not Exist');
            }
            bcrypt
                .compare(pass, user.password)
                .then(result => {
                    if(result){
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err=>{
                            if(err){
                                console.log(err);
                            }
                            res.redirect('/dashboard');
                        });
                    }
                    res.redirect('/login/Password Incorrect');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login/Some Error Occured');
                });
        });
};

exports.signup = (req, res) => {
    if (req.session.uid) {
        res.redirect('/dashboard');
    } else {
        let msg = req.params.msg;
        res.render('auth/signup', { pageTitle: 'SignUp', msg: msg });
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
            if (userDoc) {
                return res.redirect('/signup/Email Exists');
            }
            return bcrypt
                .hash(pass, 12)
                .then(hashedPass => {
                    const user = new User({
                        email: email,
                        password: hashedPass,
                        name: name,
                        age: age,
                        gender: gender
                    });
                    return user.save();
                });
        })
        .then(result => {
            res.redirect('/login/Account Created, Login to Continue');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.logout = (req, res) => {
    console.log(req.body);
    res.send("Logout");
};