const ClientAdmin = require("../schemas/clientadminschemajs");
const PasswordService = require('./password.services')

let services = {}
services.clientRegistration = clientRegistration
services.clientLogin = clientLogin
services.getRegiteredUser = getRegiteredUser

// CLIENT REGISTRATION
async function clientRegistration(body){
    try {
        const existingUser = await ClientAdmin.findOne({email: body.email});
        if (existingUser){
            return Promise.reject("Account already exists!");
        }else{
            const encryptedPassword = PasswordService.passwordEncryption(body.password);
            body.password = encryptedPassword;
            const user = await ClientAdmin.create(body);
            return user;
        }
    } catch (error) {
        console.log(error)
        return Promise.reject("Unable to create User")
    }
}

// GETTING ALL REGITER CLIENTS
async function getRegiteredUser(){
    try {
        const data = await ClientAdmin.find().select('-password')
        return data
    } catch (error) {
        return Promise.reject("Unable to get registered client")
    }
}

// LOGIN USER BASED ON THIER ROLE
async function userLogin(body){
    
}

module.exports = services