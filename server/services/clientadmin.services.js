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
const Plan = require("../schemas/plans.schema");
const User = require("../schemas/user.schema");

let services = {}
services.clientRegistration = clientRegistration
// services.userLogin = userLogin
services.getRegiteredUser = getRegiteredUser
services.updateClient = updateClient
// services.UserForgetPassword = UserForgetPassword
// services.resetPassword = resetPassword
services.createFirm = createFirm
services.getFirms = getFirms
services.requestPlan = requestPlan
services.getClientAdmin = getClientAdmin
services.handleRequestPlan = handleRequestPlan
services.updateFirm = updateFirm 
services.createUser = createUser 

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


async function clientRegistration(body) {
    try {
        const existingUser = await ClientAdmin.findOne({ email: body.email });
        if (existingUser) {
            return Promise.reject('Account already exists!');
        } else {
            let uniqueCidm = false;
            let cidm;

            while (!uniqueCidm) {
                const randomAlphabet = () => String.fromCharCode(97 + Math.floor(Math.random() * 26));
                const randomDigit = () => Math.floor(Math.random() * 10);
                cidm = `${randomDigit()}${randomAlphabet()}${randomDigit()}${randomDigit()}${randomDigit()}`;
                const existingCidm = await ClientAdmin.findOne({ cidm: cidm });
                if (!existingCidm) {
                    uniqueCidm = true;
                }
            }
            const hashedPassword = await PasswordService.passwordHash(body.password);
            body.password = hashedPassword;
            body.cidm = cidm;

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
        const data = await ClientAdmin.find().select('-password').populate("plan.planId")
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

async function createFirm(body, clientId) {
    try {
        const clientAdmin = await ClientAdmin.findById(clientId);
        if (!clientAdmin) {
            throw new Error('ClientAdmin not found');
        }
        
        const cidm = clientAdmin.cidm;

        const latestFirm = await Firms.findOne({ cidm }).sort({ fuid: -1 });
        let lastFuid = 0;
        if (latestFirm) {
            const parts = latestFirm.fuid.split('-');
            lastFuid = parseInt(parts[1], 10);
        }
        const newFuid = (lastFuid + 1).toString().padStart(3, '0');
        const fullFuid = `${cidm}-${newFuid}`;

        const existingFirm = await Firms.findOne({ fuid: fullFuid });
        if (existingFirm) {
            throw new Error('Firm with this credentials already exists');
        }

        const duplicateFirmName = await Firms.findOne({ firmName: body.firmName, clientAdmin: clientId });
        if (duplicateFirmName) {
            throw new Error(`Firm with name ${body.firmName} already exists for this client`);
        }

        const firmAdminId = body.firmAdmin || clientId; 
        console.log
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

        clientAdmin.firms = clientAdmin.firms || [];
        clientAdmin.firms.push({
            firmId: newFirm._id,
            firmName: newFirm.firmName
        });
        await clientAdmin.save();

        return newFirm;
    } catch (error) {
        console.error('Error creating firm:', error.message);
        return Promise.reject(`Error creating firm: ${error.message}`);
    }
}

async function getFirms(clientId){
    try {
        const firms = await Firms.find({clientAdmin: clientId})
        if(!firms.length){
            return Promise.reject('No firms found for this Client')
        }
        return firms
    } catch (error) {
        console.log('Error getting firms:', error);
        return Promise.reject('Error getting Firms');
    }
}

async function requestPlan(clientId, planId){
    try {
        const clientAdmin = await ClientAdmin.findById(clientId);
        if (!clientAdmin) {
            return Promise.reject('Client Admin not found')
        }

        const plan = await Plan.findById(planId);
        if (!plan) {
            return Promise.reject('Plan not found')
        }

        if (!plan.isAvailable) {
            return Promise.reject('This Plan is not available at the moment')
        }
        if (clientAdmin.plan.planId && clientAdmin.plan.planId.toString() === planId.toString()){
            return Promise.reject('Client is already subscribed to this plan')
        }

        clientAdmin.plan = {
            planId: planId,
            status: "requested"
        };
        await clientAdmin.save();
        return clientAdmin.populate("plan.planId")
    } catch (error) {
        console.log("error requesting plans", error)
        return Promise.reject('Error requesting Plans');
    }
}

async function getClientAdmin(clientId){
    try {
        const data = await ClientAdmin.findById(clientId).populate("plan.planId")
        return data
    } catch (error) {
        console.log("Error getting Clients details for Plan", error)
        return Promise.reject("Error getting Clients details for Plan")
    }
}

async function handleRequestPlan(clientId, data) {
    try {
        const clientadmin = await ClientAdmin.findOneAndUpdate(
            { _id: clientId },
            data,
            { new: true }
        );
        return clientadmin;
    } catch (error) {
        console.log("Error handling plan request", error);
        return Promise.reject("Error Handling plan requests");
    }
}

async function updateFirm(firmId, body) {
    try {
        const firm = await Firms.findById(firmId);
        if (!firm) {
            return Promise.reject("Firm is not available");
        }

        firm.firmName = body.firmName || firm.firmName;
        firm.firmEmail = body.firmEmail || firm.firmEmail;
        firm.firmPhone = body.firmPhone || firm.firmPhone;
        firm.avatar = body.avatar || firm.avatar;
        firm.companyAddress = body.companyAddress || firm.companyAddress;
        firm.bankName = body.bankName || firm.bankName;
        firm.accountNumber = body.accountNumber || firm.accountNumber;
        firm.ifscCode = body.ifscCode || firm.ifscCode;
        firm.cifNumber = body.cifNumber || firm.cifNumber;
        firm.gstin = body.gstin || firm.gstin;
        firm.branchName = body.branchName || firm.branchName;
        firm.accountHolder = body.accountHolder || firm.accountHolder;

        await firm.save();

        return firm;
    } catch (error) {
        console.error("Error updating firm:", error.message);
        return Promise.reject("Error updating firm: " + error.message);
    }
}

async function createUser(body) {
    try{
    const { role, firmUniqueId, firmId, email, password, ...rest} = body;
    let uniqueIdField = "uid"
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Promise.reject("Email already exists");
    }

    // if(role === "firm_admin"){
    //     const existingFirmAdmin = await User.findOne({role: "firm_admin", firmId: firmId})
    //     if(existingFirmAdmin){
    //         return Promise.reject("Firm Admin already exists for this Firm");
    //     }
    // }
  
    let uniqueId = ''
    if(uniqueIdField){
      uniqueId = await generateUniqueId(User, uniqueIdField, firmUniqueId)
      rest[uniqueIdField] = uniqueId
    }
    
    const hashedPassword = await PasswordService.passwordHash(password);
    // Create the new user
    const newUser = new User({ ...rest, email, role, password: hashedPassword });
    await newUser.save();
  
    return newUser;
    }catch (error) {
      console.error('Error creating user:', error);
      return Promise.reject(`Error creating user`);
    }
}
  
async function generateUniqueId(User, uniqueIdField, firmUniqueId) {
    let newUniqueId;
    do {
      const randomNumber = (Math.floor(Math.random() * 1000)).toString().padStart(3, '0');
      newUniqueId = `${firmUniqueId}-${randomNumber}`
      
      const existingId = await User.findOne({ [uniqueIdField]: newUniqueId})
      if(!existingId){
        break;
      }
    }
    while(true)
  
    return newUniqueId;
}

module.exports = services