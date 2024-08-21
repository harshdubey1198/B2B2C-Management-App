const Accountant = require("../schemas/accountant.schema");
const ClientAdmin = require("../schemas/clientadmin.schema");
const FirmAdmin = require("../schemas/firmadmin.schema");
const GeneralEmployee = require("../schemas/generalEmployee.schema");
const SuperAdmin = require("../schemas/superadmin.schema");
const SupportExecutive = require("../schemas/supportExecutive.schema");
const Viewer = require("../schemas/viewersshema");

let service = {};
service.createUser = createUser;

async function createUser(body) {
  console.log(body)
  try{
  const { role, firmUniqueId, email, ...rest} = body;
  let userModel;
  let uniqueIdField = ""

  switch (role) {
    case "firm_admin":
      userModel = FirmAdmin;
      uniqueIdField = 'faid';
      break;
    case "accountant":
      userModel = Accountant;
      uniqueIdField = 'aid';
      break;
    case "g_emp":
      userModel = GeneralEmployee;
      uniqueIdField = 'empId';
      break;
    default:
      return Promise.reject("Invalid Role");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return Promise.reject("Email already exists");
  }

  let uniqueId = ''
  if(uniqueIdField){
    uniqueId = await generateUniqueId(userModel, uniqueIdField, firmUniqueId, role)
    rest[uniqueIdField] = uniqueId
  }

  // Create the new user
  const newUser = new userModel({ ...rest, email, role });
  await newUser.save();

  return newUser;
  }catch (error) {
    console.error('Error creating user:', error.message);
    return Promise.reject(`Error creating user`);
  }
}


// Function to generate unique ID based on role and firmId
async function generateUniqueId(userModel, uniqueIdField, firmUniqueId, role) {
  switch (role) {
    case "firm_admin":
      return generateFirmAdminId(userModel, uniqueIdField, firmUniqueId);
    case "accountant":
      return generateAccountantId(userModel, uniqueIdField, firmUniqueId);
    case "g_emp":
      return generateEmployeeId(userModel, uniqueIdField, firmUniqueId);
    default:
      throw new Error("Invalid Role");
  }
}

async function generateFirmAdminId(userModel, uniqueIdField, firmUniqueId) {
  let newUniqueId;

  do {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    const randomNumber = (Math.floor(Math.random() * 100)).toString().padStart(2, '0');
    newUniqueId = `${firmUniqueId}-${randomLetter}${randomNumber}`;

    const existingId = await userModel.findOne({ [uniqueIdField]: newUniqueId });
    if (!existingId) {
      break;
    }
  } while (true);

  return newUniqueId;
}

async function generateAccountantId(userModel, uniqueIdField, firmUniqueId) {
  let newUniqueId;
  do {
    const randomNumber = (Math.floor(Math.random() * 1000)).toString().padStart(3, '0');
    newUniqueId = `${firmUniqueId}-${randomNumber}`
    
    const existingId = await userModel.findOne({ [uniqueIdField]: newUniqueId})
    if(!existingId){
      break;
    }
  }
  while(true)

  return newUniqueId;
}

async function generateEmployeeId(userModel, uniqueIdField, firmUniqueId) {
  let newUniqueId;
  do {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let result = '';
    for (let i = 0; i < 3; i++) {
      result += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    newUniqueId = `${firmUniqueId}-${result}`;

    const existingId = await userModel.findOne({ [uniqueIdField]: newUniqueId });
    if (!existingId) {
      break;
    }
  } while (true);

  return newUniqueId;
}

module.exports = service;
