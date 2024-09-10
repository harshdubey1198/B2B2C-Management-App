const nodemailer = require("nodemailer");
const generateTemporaryPassword = require("../utils/tempPassword");
const PasswordService = require('./password.services');
const User = require("../schemas/user.schema");

const authService = {};

// REGISTER 
authService.Registration = async (body) => {
    try {
        // const existingUser = await User.findOne({ email: body.email });
        const existingUser = await User.findOne({ email: body.email, isActive: true });
        if (existingUser) {
            return Promise.reject("Account already exists!");
        }
        const updatedPassword = await PasswordService.passwordHash(body.password);
        body.password = updatedPassword;
        body.role = body.role || "client_admin";
        const user = await User.create(body);
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        return Promise.reject("Unable to create User");
    }
};

// LOGIN USER
authService.userLogin = async (body) => {
    const { email, password } = body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return Promise.reject('Account Not Found');
        }
        const passwordMatch = await PasswordService.comparePassword(password, user.password);
        if (!passwordMatch) {
            return Promise.reject("Incorrect Password");
        }
        const userData = await User.findOne({ _id: user._id }).select("-password");
        return userData;
    } catch (error) {
        console.error('Login failed:', error);
        return Promise.reject('Login failed');
    }
};

authService.UserForgetPassword = async (body) => {
    const { email } = body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return Promise.reject('Account Not Found');
        }

        const temporaryPassword = generateTemporaryPassword();
        const hashedPassword = await PasswordService.passwordHash(temporaryPassword);
        await User.updateOne({ email: email }, { $set: { password: hashedPassword } });

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
        console.error('Error during password reset:', error.message);
        return Promise.reject('An error occurred while processing the request.');
    }
};

authService.resetPassword = async (body) => {
  try {
      const { email, temporaryPassword, newPassword } = body;

      const user = await User.findOne({ email: email });
      if (!user) {
        return Promise.reject('Account Not Found');
      } else {
          const match = await PasswordService.comparePassword(temporaryPassword, user.password);
          if (match) {
              const updatedPassword = await PasswordService.passwordHash(newPassword);
              user.password = updatedPassword;
              await user.save();
              return 'Password Updated Successfully';
          } else {
            return Promise.reject('Invalid Temporary Password');
          }
      }
  } catch (error) {
      console.error(error);
      return Promise.reject('An error occurred while processing the request.');
  }
}

// CREATE FIRM OR CREATE USER
authService.registration = async (id, body) => {
    try {
        const existingUser = await User.findOne({ email: body.email, adminId: id });
        if (existingUser) {
            return Promise.reject("Account already exists!");
        }

        if (body.role === 'firm_admin') {
            const existingFirmAdmin = await User.findOne({ role: 'firm_admin', adminId: id });
            if (existingFirmAdmin) {
                return Promise.reject("There is already a firm admin for this firm!");
            }
        }
    
        const encryptedPassword = await PasswordService.passwordHash(body.password);
        body.password = encryptedPassword;
        body.isActive = true;
        body.adminId = id;
  
       const newUser = new User(body);
       const user = await newUser.save();
       return user;
    } catch (error) {
      console.error("Error in user registration:", error);
      return Promise.reject("Unable to create User");
    }
}

// GET FIRMS  
authService.getCompany  = async (id) => {
    try {
        const data = User.find({adminId: id}).select("-password").populate('adminId')
        return data
    } catch (error) {
        console.error(error);
        return Promise.reject('Error occured during fetching the company data.');
    }
}


// update account 
authService.updateAccount = async (id, body) => {
    try {
        const data = await User.findOneAndUpdate({ _id: id }, body, { new: true });
        return data;
    } catch (error) {
        console.log("Error in updating account", error);
        return Promise.reject("Unable to update account. Try again later!");
    } 
}
module.exports = authService;
