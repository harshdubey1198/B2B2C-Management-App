const crypto = require("crypto");
const nodemailer = require("nodemailer");
const uploadToCloudinary = require("../utils/cloudinary");
const { sendCredentialsEmail, generateOtp } = require("../utils/mailer");
const PasswordService = require('./password.services');
const CRMUser = require("../schemas/crmuser.schema");
const Role = require("../schemas/role.schema");
const User = require("../schemas/user.schema");
const generateTemporaryPassword = require("../utils/tempPassword");
const Payment = require("../schemas/payment.schema");

const crmUserService = {};

// CREATE CRMUser
crmUserService.createCrmsUser = async (id, data) => {
  const parentUser = await User.findById(id);
  if (!parentUser) {
      throw new Error("Parent user does not exist!");
  }

  if (!parentUser.adminId) {
      throw new Error("Admin user not associated with the parent user!");
  }

  const roleExists = await Role.findById(data.roleId);
  if (!roleExists) {
      throw new Error("Invalid role ID!");
  }

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

  const temporaryPassword = crypto.randomBytes(6).toString('hex');
  const encryptedPassword = await PasswordService.passwordHash(temporaryPassword);
  data.password = encryptedPassword;
  data.isActive = true;
  data.parentId = id;
  data.firmId = parentUser.adminId;

  // Save the new CRM user
  const newCRMUser = new CRMUser(data);
  await newCRMUser.save();
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
        const firm = await User.findOne({_id: crmuser.firmId})
        if(!firm){
          throw new Error('Firm not found for the user');
        }
        const clientAdmin = await User.findOne({_id: firm.adminId})
        if(!clientAdmin){
          throw new Error('Client admin not found for the firm');
        }
        const latestPayment = await Payment.findOne({ userId: clientAdmin._id, status: 'completed' }).sort({ paymentDate: -1 });
        if (!latestPayment) {
            throw new Error("No active subscription found for the Client Admin. Please purchase a plan to continue.");
        }
        if (new Date() > new Date(latestPayment.expirationDate)) {
            clientAdmin.isActive = false;
            latestPayment.status = 'expired';
            await Promise.all([clientAdmin.save(), latestPayment.save()]);
            throw new Error("Unable to log in. Your subscription has expired, Please contact your administrator.");
        }
        console.log(latestPayment, "latest")
        if(crmuser.isActive === false){
            throw new Error("Account is not active");
        }
        const userData = await CRMUser.findOne({ _id: crmuser._id })
            .select("-password") 
            .populate({
                path: "roleId",
                select: "roleName" 
            });

        // Extract the roleName and attach it to the response
        const user = {
            ...userData.toObject(),
            roleId: userData.roleId?._id || null,
            role: userData.roleId?.roleName || null 
        };
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

crmUserService.getCrmsUsersAccount = async (id) => {
  const data = CRMUser.findOne({ _id: id }).select("-password").populate("roleId");
  if (!data) {
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

// CRM USER FORGOT HIS PASSWORD
crmUserService.CRMUserForgetPassword = async (body) => {
  const { email } = body;
  try {
      const user = await CRMUser.findOne({ email: email });
      if (!user) {
          return Promise.reject('Account Not Found');
      }

      const temporaryPassword = generateTemporaryPassword();
      const hashedPassword = await PasswordService.passwordHash(temporaryPassword);
      await CRMUser.updateOne({ email: email }, { $set: { password: hashedPassword } });

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
          text: `Your temporary password is: ${temporaryPassword}. Please use this password to login and reset your password immediately. https://aamobee.com/crm/reset-password/${temporaryPassword}`
      };
      await transporter.sendMail(mailOptions);
      return 'Temporary password sent to your email.';
  } catch (error) {
      console.error('Error during password reset:', error.message);
      return Promise.reject('An error occurred while processing the request.');
  }
};

// CRM RESET PASSWORD
crmUserService.resetCRMUserPassword = async (body) => {
  const { email, temporaryPassword, newPassword } = body;

  const user = await CRMUser.findOne({ email: email });
  if (!user) {
      throw new Error('Account Not Found');
  } 

  const match = await PasswordService.comparePassword(temporaryPassword, user.password);
  if (!match) {
      throw new Error('Invalid Temporary Password');
  }

  const updatedPassword = await PasswordService.passwordHash(newPassword);
  user.password = updatedPassword;
  await user.save();

  return 'Password Updated Successfully';
};

// UPDATE PASSWORD
crmUserService.UpdatepasswordCrmsUsers = async (id, data) => {
  console.log(id, data)
  const crmuser = await CRMUser.findById(id);
  if (!crmuser) {
    throw new Error("User not found");
  }
  const isPasswordValid = await PasswordService.comparePassword(
    data.password,
    crmuser.password
  );
  if (!isPasswordValid) {
    throw new Error("Current Password Doesn't Match");
  }
  const newPassword = await PasswordService.passwordHash(data.newPassword);
  crmuser.password = newPassword;
  await crmuser.save();
  return crmuser;
};

module.exports = crmUserService;
