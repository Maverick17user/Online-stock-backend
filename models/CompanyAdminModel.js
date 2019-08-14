const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyAdminSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

});

const CompanyAdminModel = mongoose.model('companyAdmin', CompanyAdminSchema);

module.exports = CompanyAdminModel;