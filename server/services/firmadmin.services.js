const Accountant = require("../schemas/accountant.schema");
const FirmAdmin = require("../schemas/firmadmin.schema");
const GeneralEmployee = require("../schemas/generalEmployee.schema");
const PasswordService = require("./password.services");

let services = {};
services.getFirmData = getFirmData;
services.createUser = createUser;

async function getFirmData(id) {
  try {
    const data = await FirmAdmin.findOne({ _id: id }).populate({
      path: "firmId",
      select: "_id firmName fuid",
    });
    const result = {
      _id: data.firmId._id,
      firmName: data.firmId.firmName,
      fuid: data.firmId.fuid,
    };
    return result;
  } catch (error) {
    console.log("error getting firm data", error);
    return Promise.reject("Error getting firm data");
  }
}

async function createUser(body) {
  try {
    const { role, firmUniqueId, email, password, ...rest } = body;
    let userModel;
    let uniqueIdField = "";

    switch (role) {
      case "accountant":
        userModel = Accountant;
        uniqueIdField = "aid";
        break;
      case "g_emp":
        userModel = GeneralEmployee;
        uniqueIdField = "empId";
        break;
      default:
        return Promise.reject("Invalid Role");
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return Promise.reject("Email already exists");
    }

    let uniqueId = "";
    if (uniqueIdField) {
      uniqueId = await generateUniqueId(
        userModel,
        uniqueIdField,
        firmUniqueId,
        role
      );
      rest[uniqueIdField] = uniqueId;
    }

    const hashedPassword = await PasswordService.passwordHash(password);
    // Create the new user
    const newUser = new userModel({
      ...rest,
      email,
      role,
      password: hashedPassword,
    });
    await newUser.save();

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return Promise.reject(`Error creating user`);
  }
}

// Function to generate unique ID based on role and firmId
async function generateUniqueId(userModel, uniqueIdField, firmUniqueId, role) {
  switch (role) {
    case "accountant":
      return generateAccountantId(userModel, uniqueIdField, firmUniqueId);
    case "g_emp":
      return generateEmployeeId(userModel, uniqueIdField, firmUniqueId);
    default:
      return Promise.reject("Invalid Role");
  }
}

async function generateAccountantId(userModel, uniqueIdField, firmUniqueId) {
  let newUniqueId;
  do {
    const randomNumber = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    newUniqueId = `${firmUniqueId}-${randomNumber}`;

    const existingId = await userModel.findOne({
      [uniqueIdField]: newUniqueId,
    });
    if (!existingId) {
      break;
    }
  } while (true);

  return newUniqueId;
}

async function generateEmployeeId(userModel, uniqueIdField, firmUniqueId) {
  let newUniqueId;
  do {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 3; i++) {
      result += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    newUniqueId = `${firmUniqueId}-${result}`;

    const existingId = await userModel.findOne({
      [uniqueIdField]: newUniqueId,
    });
    if (!existingId) {
      break;
    }
  } while (true);

  return newUniqueId;
}

module.exports = services;
