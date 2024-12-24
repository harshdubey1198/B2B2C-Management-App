const crypto = require("crypto");
const uploadToCloudinary = require("../utils/cloudinary");
const { sendCredentialsEmail, generateOtp } = require("../utils/mailer");
const PasswordService = require('./password.services');
const CRMUser = require("../schemas/crmuser.schema");
const Role = require("../schemas/role.schema");
const User = require("../schemas/user.schema");

const crmUserService = {};

// CREATE CRMUser
crmUserService.createCrmsUser = async (id, data) => {
  // Validate the parent user
  const parentUser = await User.findById(id);
  if (!parentUser) {
      throw new Error("Parent user does not exist!");
  }

  // Validate the admin user
  if (!parentUser.adminId) {
      throw new Error("Admin user not associated with the parent user!");
  }

  // Validate the role ID
  const roleExists = await Role.findById(data.roleId);
  if (!roleExists) {
      throw new Error("Invalid role ID!");
  }

  // Check if the CRMUser already exists
  const existingCRMUser = await CRMUser.findOne({ email: data.email });
  if (existingCRMUser) {
      throw new Error("Account already exists!");
  }

  // Handle avatar processing
  if (data.avatar && typeof data.avatar === 'string' && data.avatar.startsWith('http')) {
      data.avatar = data.avatar;
  } else if (data.avatar && Buffer.isBuffer(data.avatar)) {
      const uploadResponse = await uploadToCloudinary(data.avatar);
      data.avatar = uploadResponse.secure_url;
  } else if (data.avatar && data.avatar instanceof File) {
      const fileBuffer = Buffer.from(await data.avatar.arrayBuffer());
      const uploadResponse = await uploadToCloudinary(fileBuffer);
      data.avatar = uploadResponse.secure_url;
  } else if (data.avatar) {
      throw new Error("Invalid avatar format");
  }

  // Generate temporary password
  const temporaryPassword = crypto.randomBytes(6).toString('hex');

  // Encrypt the password
  const encryptedPassword = await PasswordService.passwordHash(temporaryPassword);
  data.password = encryptedPassword;

  // Set additional fields
  data.isActive = true;
  data.parentId = id;
  data.firmId = parentUser.adminId;

  // Save the new CRM user
  const newCRMUser = new CRMUser(data);
  await newCRMUser.save();

  // Send credentials email
  await sendCredentialsEmail(newCRMUser.email, temporaryPassword, 'https://aamobee.com/crm/login');

  return newCRMUser;
};

// LOGIN USER
crmUserService.loginCrmsUsers = async (body) => {
    try {
        const { email, password } = body;
        const crmuser = await CRMUser.findOne({ email: email });
        if (!crmuser) {
            throw new Error('Account Not Found');
        }
        const passwordMatch = await PasswordService.comparePassword(password, crmuser.password);
        if (!passwordMatch) {
            throw new Error("Incorrect Password");
        }
        if(crmuser.isActive === false){
            throw new Error("Account is not active");
        }
        const userData = await CRMUser.findOne({ _id: crmuser._id })
            .select("-password") // Exclude the password field
            .populate({
                path: "roleId",
                select: "roleName" // Select only the roleName field
            });

        // Extract the roleName and attach it to the response
        const user = {
            ...userData.toObject(),
            roleId: userData.roleId?._id || null, // Include roleId
            role: userData.roleId?.roleName || null // Include roleName
        };
        // Return user data without password
        return user;

    } catch (error) {
        console.error('Login failed:', error);
        throw new Error(error.message || 'Login failed');
    }
};

// GET CRMUser
crmUserService.getAllCrmsUsers = async (id) => {
  const data = CRMUser.find({ firmId: id }).select("-password").populate("roleId");
  if (data.length === 0) {
    throw new Error("Error occured during fetching the CRMUser data.");
  }
  return data;
};

// update account
crmUserService.updateCrmsAccount = async (id, data) => {
  try {
    if (data.avatar) {
      let imageUrl;
      if (typeof data.avatar === "string" && data.avatar.startsWith("http")) {
        imageUrl = data.avatar;
      } else if (
        typeof data.avatar === "string" &&
        data.avatar.startsWith("data:image")
      ) {
        const base64Data = data.avatar.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const uploadResponse = await uploadToCloudinary(buffer);
        imageUrl = uploadResponse.secure_url;
      } else if (Buffer.isBuffer(data.avatar)) {
        const uploadResponse = await uploadToCloudinary(data.avatar);
        imageUrl = uploadResponse.secure_url;
      } else {
        throw new Error("Invalid avatar format");
      }

      data.avatar = imageUrl;
    } else {
      console.log("No file uploaded.");
    }

    const updatedAccount = await CRMUser.findOneAndUpdate({ _id: id }, data, {new: true});
    return updatedAccount;
  } catch (error) {
    console.log("Error in updating account", error);
    return Promise.reject("Unable to update account. Try again later!");
  }
};

// UPDATE PASSWORD
crmUserService.updatePassword = async (id, data) => {
  const CRMUser = await CRMUser.findById(id);
  if (!CRMUser) {
    throw new Error("User not found");
  }
  const isPasswordValid = await PasswordService.comparePassword(
    data.password,
    CRMUser.password
  );
  if (!isPasswordValid) {
    throw new Error("Current Password Doesn't Match");
  }
  const newPassword = await PasswordService.passwordHash(data.newPassword);
  CRMUser.password = newPassword;
  await CRMUser.save();
  return CRMUser;
};

module.exports = crmUserService;
