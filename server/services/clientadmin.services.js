const nodemailer = require("nodemailer");

const Accountant = require("../schemas/accountant.schema");
const ClientAdmin = require("../schemas/clientadmin.schema");
const FirmAdmin = require("../schemas/firmadmin.schema");
const GeneralEmployee = require("../schemas/generalEmployee.schema");
const SuperAdmin = require("../schemas/superadmin.schema");
const SupportExecutive = require("../schemas/supportExecutive.schema");
const Viewer = require("../schemas/viewersshema");
const PasswordService = require('./password.services');
const generateTemporaryPassword = require("../utils/tempPassword");

let services = {}
services.clientRegistration = clientRegistration
services.userLogin = userLogin
services.getRegiteredUser = getRegiteredUser
services.UserForgetPassword = UserForgetPassword
services.resetPassword = resetPassword

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
            case 'super_admin':
                userModel = SuperAdmin
                break;
            case 'client_admin':
                userModel = ClientAdmin
                break;
            case 'firm_admin':
                userModel = FirmAdmin
                break;
            case 'accountant':
                userModel = Accountant
                break;
            case 'g_emp':
                userModel = GeneralEmployee
                break;
            case 'customer_sp':
                userModel = SupportExecutive
                break;
            case 'viewer':
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

async function UserForgetPassword(body) {
    try {
        const { email, role } = body;
        let userModel;

        // Map role to user model
        switch(role) {
            case 'super_admin':
                userModel = SuperAdmin;
                break;
            case 'client_admin':
                userModel = ClientAdmin;
                break;
            case 'firm_admin':
                userModel = FirmAdmin;
                break;
            case 'accountant':
                userModel = Accountant;
                break;
            case 'g_emp':
                userModel = GeneralEmployee;
                break;
            case 'customer_sp':
                userModel = SupportExecutive;
                break;
            case 'viewer':
                userModel = Viewer;
                break;
            default:
                throw new Error('Invalid Role');
        }

        // Find the user
        const user = await userModel.findOne({ email: email });
        if (!user) {
            throw new Error('Account Not Found');
        }

        // Generate and hash the temporary password
        const temporaryPassword = generateTemporaryPassword();
        console.log('Generated temporary password:', temporaryPassword);
        const hashedPassword = await PasswordService.passwordEncryption(temporaryPassword);
        console.log('Hashed password:', hashedPassword);

        // Update user's password
        await userModel.updateOne({ email }, { $set: { password: hashedPassword } });

        // Create nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_MAIL,
                pass: process.env.GOOGLE_PASS,
            },
        });

        const mailOptions = {
            from: process.env.GOOGLE_MAIL,
            to: email,
            subject: 'Password Reset',
            text: `Your temporary password is: ${temporaryPassword}. Please use this password to login and reset your password immediately. http://localhost:3000/reset-password/${temporaryPassword}`
        };

        // Send email using a promise-based approach
        await transporter.sendMail(mailOptions);
        return 'Temporary password sent to your email.';

    } catch (error) {
        console.error('Error:', error.message);
        throw new Error('An error occurred while processing the request.');
    }
}



module.exports = services