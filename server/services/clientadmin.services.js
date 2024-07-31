const Accountant = require("../schemas/accountant.schema");
const ClientAdmin = require("../schemas/clientadmin.schema");
const FirmAdmin = require("../schemas/firmadmin.schema");
const GeneralEmployee = require("../schemas/generalEmployee.schema");
const SupportExecutive = require("../schemas/supportExecutive.schema");
const Viewer = require("../schemas/viewersshema");
const PasswordService = require('./password.services')

let services = {}
services.clientRegistration = clientRegistration
services.userLogin = userLogin
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
    try {
        const {email, password, role} = body
        let userModel

        switch(role){
            case 'Client Admin':
                userModel = ClientAdmin
                break;
            case 'Firm Manager':
                userModel = FirmAdmin
                break;
            case 'Accountant':
                userModel = Accountant
                break;
            case 'Employee':
                userModel = GeneralEmployee
                break;
            case 'Support Executive':
                userModel = SupportExecutive
                break;
            case 'Viewer':
                userModel = Viewer
                break;
            default:
                return Promise.reject('Invalid Role')
        }

        const user = await userModel.findOne({email: email})
        if(!user){
            return Promise.reject('Account Not Found')
        }else{
            const decryptedPassword = await PasswordService.passwordDecryption(user.password);
            if (decryptedPassword === password) {
                const userData  = await userModel.findOne({ _id: user._id }).select("-password")
                return userData;
            } else {
                return Promise.reject("Incorrect Password");
            }
        }
    } catch (error) {
        console.error(error);
        return Promise.reject('Login failed');
    }
    
}

module.exports = services