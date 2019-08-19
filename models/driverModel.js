const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverScheema = new Schema({
    email: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const Driver = mongoose.model('driver', driverScheema);

module.exports = Driver;