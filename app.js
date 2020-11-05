const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const session = require('express-session')({
    secret: 'FA$alPrjid39 (112cookieNSessKey)',
    resave: false,
    saveUninitialized: false,
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
const webRoutes = require('./routes/web');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/gif'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(session);

//Using Routes
app.use(authRoutes);
app.use(webRoutes);

//Landing Page
app.get('/', (req, res) => {
    res.render('home');
});

//404 Handler
app.use((req, res) => {
    res.render('error', { pageTitle: 'Error : 404', errorCode: '404', errorDescription: 'Page Not Found' });
});

//Server listening on port and mongoose connect
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
