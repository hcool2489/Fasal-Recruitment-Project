const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    age: {
        type: String
    },
    gender: {
        type: String
    },
    profileImgUrl: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);