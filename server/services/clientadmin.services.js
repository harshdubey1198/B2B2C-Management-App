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
const Firms = require("../schemas/firms.schema");

let services = {}
services.clientRegistration = clientRegistration
services.userLogin = userLogin
services.getRegiteredUser = getRegiteredUser
services.updateClient = updateClient
services.UserForgetPassword = UserForgetPassword
services.resetPassword = resetPassword
services.createFirm = createFirm
services.getFirms = getFirms

// CLIENT REGISTRATION
async function clientRegistration(body) {
    try {
        const existingUser = await ClientAdmin.findOne({ email: body.email });
        if (existingUser) {
            return Promise.reject('Account already exists!');
        } else {
            const hashedPassword = await PasswordService.passwordHash(body.password);
            body.password = hashedPassword;
            const user = await ClientAdmin.create(body);
            return user;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject('Unable to create User');
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


// UPDATE TEH CLIENT ADMIN
async function updateClient(body, id) {
    try {
        const data = await ClientAdmin.findOneAndUpdate({_id: id}, body, {new: true})
        return data
    } catch (error) {
        return Promise.reject("Unable to Update the Client")
    }
}

// LOGIN USER BASED ON THIER ROLE
async function userLogin(body) {
    try {
        const { email, password, role } = body;
        let userModel;

        switch (role) {
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
                return Promise.reject('Invalid Role');
        }

        const user = await userModel.findOne({ email: email });
        if (!user) {
            return Promise.reject('Account Not Found');
        } else {
            const match = await PasswordService.comparePassword(password, user.password);
            if (match) {
                const userData = await userModel.findOne({ _id: user._id }).select('-password');
                return userData;
            } else {
                return Promise.reject('Incorrect Password');
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

        switch (role) {
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

        const user = await userModel.findOne({ email: email });
        if (!user) {
            throw new Error('Account Not Found');
        }

        const temporaryPassword = generateTemporaryPassword();
        const hashedPassword = await PasswordService.passwordHash(temporaryPassword);

        await userModel.updateOne({ email }, { $set: { password: hashedPassword } });

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

        await transporter.sendMail(mailOptions);
        return 'Temporary password sent to your email.';

    } catch (error) {
        console.error('Error:', error.message);
        throw new Error('An error occurred while processing the request.');
    }
}

async function resetPassword(body) {
    try {
        const { email, role, temporaryPassword, newPassword } = body;
        let userModel;

        switch (role) {
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

        const user = await userModel.findOne({ email: email });
        if (!user) {
            throw new Error('Account Not Found');
        } else {
            // Compare the temporary password with the hashed password
            const match = await PasswordService.comparePassword(temporaryPassword, user.password);
            if (match) {
                // Hash the new password
                const updatedPassword = await PasswordService.passwordHash(newPassword);
                user.password = updatedPassword;
                await user.save();
                return 'Password Updated Successfully';
            } else {
                throw new Error('Invalid Temporary Password');
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while processing the request.');
    }
}

async function createFirm(body, clientId) {
    try {
        const clientAdmin = await ClientAdmin.findById(clientId);
        if (!clientAdmin) {
            return Promise.reject('ClientAdmin not found');
        }
        const cidm = clientAdmin.cidm;

        // Generate a unique fuid
        const latestFirm = await Firms.findOne({ cidm }).sort({ fuid: -1 });
        let lastFuid = 0;
        if (latestFirm) {
            const parts = latestFirm.fuid.split('-');
            lastFuid = parseInt(parts[1], 10);
        }
        const newFuid = (lastFuid + 1).toString().padStart(3, '0'); 
        const fullFuid = `${cidm}-${newFuid}`;

        // Check if a firm with the same fuid already exists
        const existingFirm = await Firms.findOne({ fuid: fullFuid });
        if (existingFirm) {
            return Promise.reject(`Firm with this credentials is already exists`);
        }
        const duplicateFirmName = await Firms.findOne({ firmName: body.firmName, clientAdmin: clientId });
        if (duplicateFirmName) {
            return Promise.reject(`Firm with name ${body.firmName} already exists for this client`);
        }

        const firmAdminId = body.firmAdmin || clientId; 

        const data = {
            clientAdmin: clientId,
            cidm: cidm,
            fuid: fullFuid,
            firmEmail: body.firmEmail,
            firmPhone: body.firmPhone,
            firmName: body.firmName,
            firmAdmin: firmAdminId,
            avatar: body.avatar,
        };

        const newFirm = new Firms(data);
        await newFirm.save();

        clientAdmin.firms = clientAdmin.firms || []
        clientAdmin.firms.push({
            firmId: newFirm._id,
            firmName: newFirm.firmName
        })
        await clientAdmin.save()
        return newFirm;
    } catch (error) {
        console.log('Error creating firm:', error);
        return Promise.reject('Error creating Firm');
    }
}

async function getFirms(clientId){
    try {
        const firms = await Firms.find({clientAdmin: clientId}).populate("clientAdmin")
        if(!firms.length){
            return Promise.reject('No firms found for this Client')
        }
        return firms
    } catch (error) {
        console.log('Error getting firms:', error);
        return Promise.reject('Error getting Firms');
    }
}


module.exports = services