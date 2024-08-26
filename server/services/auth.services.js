const nodemailer = require("nodemailer");

const Accountant = require("../schemas/accountant.schema");
const ClientAdmin = require("../schemas/clientadmin.schema");
const FirmAdmin = require("../schemas/firmadmin.schema");
const GeneralEmployee = require("../schemas/generalEmployee.schema");
const SuperAdmin = require("../schemas/superadmin.schema");
const SupportExecutive = require("../schemas/supportExecutive.schema");
const Viewer = require("../schemas/viewersshema");
const generateTemporaryPassword = require("../utils/tempPassword");
const PasswordService = require('./password.services');
const User = require("../schemas/user.schema");

let service = {};
service.userLogin = userLogin;
service.UserForgetPassword = UserForgetPassword;
service.resetPassword = resetPassword;

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
          case 'accountant':
          case 'g_emp':
              userModel = User;
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
// async function userLogin(body) {
//     try {
//         const { email, password, role } = body;
//         let userModel;

//         switch (role) {
//             case 'super_admin':
//                 userModel = SuperAdmin;
//                 break;
//             case 'client_admin':
//                 userModel = ClientAdmin;
//                 break;
//             // case 'firm_admin':
//             //     userModel = FirmAdmin;
//             //     break;
//             case 'firm_admin':
//             case 'accountant':
//             case 'g_emp':
//                 userModel = User;
//                 break;
//             // case 'g_emp':
//             //     userModel = GeneralEmployee;
//             //     break;
//             case 'customer_sp':
//                 userModel = SupportExecutive;
//                 break;
//             case 'viewer':
//                 userModel = Viewer;
//                 break;
//             default:
//                 return Promise.reject('Invalid Role');
//         }

//         const user = await userModel.findOne({ email: email });
//         if (!user) {
//             return Promise.reject('Account Not Found');
//         } else {
//             const match = await PasswordService.comparePassword(password, user.password);
//             if (match) {
//                 const userData = await userModel.findOne({ _id: user._id }).select('-password');
//                 return userData;
//             } else {
//                 return Promise.reject('Incorrect Password');
//             }
//         }
//     } catch (error) {
//         console.error(error);
//         return Promise.reject('Login failed');
//     }
// }


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

module.exports = service;
