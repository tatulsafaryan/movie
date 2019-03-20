const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = Schema({
    Name: {
        type: String,
        required: true
    },
    Rating: {
        type: Number,
        required: true
    },
    Release_Date: {
        type: Date,
        required: true
    },
    Directors: {
        type: String,
        required: true
    },
    Author: {
        ref: 'users',
        type: Schema.ObjectId,
    },

})

module.exports = mongoose.model('movies',movieSchema);