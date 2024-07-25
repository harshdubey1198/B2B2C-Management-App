const mongoose = require('mongoose')
const { string } = require('prop-types')
const Schema = mongoose.Schema

const superAdmin = new Schema({
    sadm: string,
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    dob: Date
}, {timestamps: true})

const SuperAdmin = mongoose.model('SuperAdmin', SuperAdmin)
module.exports = SuperAdmin