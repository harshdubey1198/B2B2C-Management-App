const nodemailer = require("nodemailer");
const generateTemporaryPassword = require("../utils/tempPassword");
const PasswordService = require('./password.services');
const User = require("../schemas/user.schema");

const authService = {};

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


// async function createUser(body) {
//     try {
//       const { role, firmUniqueId, email, password, ...rest } = body;
//       let uniqueIdField = "uid";
  
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return Promise.reject("Email already exists");
//       }
  
//       let uniqueId = "";
//       if (uniqueIdField) {
//         uniqueId = await generateUniqueId(User, uniqueIdField, firmUniqueId,);
//         rest[uniqueIdField] = uniqueId;
//       }
  
//       const hashedPassword = await PasswordService.passwordHash(password);
//       // Create the new user
//       const newUser = new User({...rest, email, role, password: hashedPassword,});
//       await newUser.save();
  
//       return newUser;
//     } catch (error) {
//       console.error("Error creating user:", error);
//       return Promise.reject(`Error creating user`);
//     }
// }
  
// async function generateUniqueId(User, uniqueIdField, firmUniqueId) {
//     let newUniqueId;
//     do {
//       const randomNumber = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
//       newUniqueId = `${firmUniqueId}-${randomNumber}`;
  
//       const existingId = await User.findOne({[uniqueIdField]: newUniqueId,});
//       if (!existingId) {
//         break;
//       }
//     } while (true);
  
//     return newUniqueId;
// }

module.exports = authService;
