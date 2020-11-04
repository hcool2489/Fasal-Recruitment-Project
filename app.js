const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session')({
    secret: 'FA$alPrjid39 (112cookieKey)',
    resave: false,
    saveUninitialized: true,
    unset: 'destroy',
    cookie: {
        maxAge: 60 * 60 * 24 * 5 * 1000
    }
});

const MONGODB_URI = require('./mongoURI');

const app = express();

//Using ejs as View Engine
app.set('view engine', 'ejs');

//Routes
const authRoutes = require('./routes/auth');

//req body-parser, cookie-parser, csrf and assigning static folder as public
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session);

//Using Routes
app.use(authRoutes);

//Landing Page
// app.get('/', (req, res) => {
//     res.render('home');
// });

//404 Handler
app.use((req, res) => {
    res.render('error', { pageTitle: 'Error : 404', errorCode: '404', errorDescription: 'Page Not Found' });
});

//Server listening on port
app.listen(3000);