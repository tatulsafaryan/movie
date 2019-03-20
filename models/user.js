const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({

    Login: { 
        type: String,
        required: true
     },
    Password: { 
        type: String,
        required: true
     },
    Fullname: {
        type: String,
        required: true
    },
    Token: {
        type: String
    },
})

module.exports = mongoose.model('users',userSchema);