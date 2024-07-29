const ClientAdmin = require("../schemas/clientadminschemajs");
const PasswordService = require('./password.services')

let services = {}
services.clietRegistration = clietRegistration

async function clietRegistration(body){
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
        return Promise.reject("Unable to create User")
    }
}

module.exports = services