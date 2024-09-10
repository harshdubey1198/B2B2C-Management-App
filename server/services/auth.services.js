const nodemailer = require("nodemailer");
const generateTemporaryPassword = require("../utils/tempPassword");
const PasswordService = require('./password.services');
const User = require("../schemas/user.schema");

// let service = {};
// service.userLogin = userLogin;
// service.UserForgetPassword = UserForgetPassword;
// service.resetPassword = resetPassword;
// service.createUser = createUser;
const authService = {};


// LOGIN USER BASED ON THIER ROLE
// async function userLogin(body) {
//   try {
//       const { email, password, role } = body;
//       let userModel;
//       switch (role) {
//           case 'super_admin':
//               userModel = SuperAdmin;
//               break;
//           case 'client_admin':
//               userModel = ClientAdmin;
//               break;
//           case 'firm_admin':
//           case 'accountant':
//           case 'g_emp':
//               userModel = User;
//               break;
//           case 'customer_sp':
//               userModel = SupportExecutive;
//               break;
//           case 'viewer':
//               userModel = Viewer;
//               break;
//           default:
//               return Promise.reject('Invalid Role');
//       }

//       const user = await userModel.findOne({ email: email, role: role });
//       if (!user) {
//           return Promise.reject('Account Not Found Or Role Mismatch');
//       } else {
//           const match = await PasswordService.comparePassword(password, user.password);
//           if (match) {
//               const userData = await userModel.findOne({ _id: user._id }).select('-password');
//               return userData;
//           } else {
//               return Promise.reject('Incorrect Password');
//           }
//       }
//   } catch (error) {
//       console.error(error);
//       return Promise.reject('Login failed');
//   }
// }
authService.userLogin = async (body) => {
    const { email, password } = body;

    try {
        // Find user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return Promise.reject('Account Not Found');
        }

        // Use passwordService to compare the provided password with the stored hashed password
        const passwordMatch = await PasswordService.comparePassword(password, user.password);

        if (!passwordMatch) {
            return Promise.reject("Incorrect Password");
        }

        // Fetch user data without the password field
        const userData = await User.findOne({ _id: user._id }).select("-password");

        return userData;
    } catch (error) {
        console.error('Login failed:', error);
        return Promise.reject('Login failed');
    }
};

// async function UserForgetPassword(body) {
//   try {
//       const { email, role } = body;
//       let userModel;

//       switch (role) {
//           case 'super_admin':
//               userModel = SuperAdmin;
//               break;
//           case 'client_admin':
//               userModel = ClientAdmin;
//               break;
//           case 'firm_admin':
//               userModel = FirmAdmin;
//               break;
//           case 'accountant':
//               userModel = Accountant;
//               break;
//           case 'g_emp':
//               userModel = GeneralEmployee;
//               break;
//           case 'customer_sp':
//               userModel = SupportExecutive;
//               break;
//           case 'viewer':
//               userModel = Viewer;
//               break;
//           default:
//                 return Promise.reject('Invalid Role');
//       }

//       const user = await userModel.findOne({ email: email });
//       if (!user) {
//           return Promise.reject('Account Not Found');
//       }

//       const temporaryPassword = generateTemporaryPassword();
//       const hashedPassword = await PasswordService.passwordHash(temporaryPassword);

//       await userModel.updateOne({ email }, { $set: { password: hashedPassword } });

//       const transporter = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//               user: process.env.GOOGLE_MAIL,
//               pass: process.env.GOOGLE_PASS,
//           },
//       });

//       const mailOptions = {
//           from: process.env.GOOGLE_MAIL,
//           to: email,
//           subject: 'Password Reset',
//           text: `Your temporary password is: ${temporaryPassword}. Please use this password to login and reset your password immediately. http://localhost:3000/reset-password/${temporaryPassword}`
//       };

//       await transporter.sendMail(mailOptions);
//       return 'Temporary password sent to your email.';

//   } catch (error) {
//       console.error('Error:', error.message);
//       return Promise.reject('An error occurred while processing the request.');
//   }
// }

// async function resetPassword(body) {
//   try {
//       const { email, role, temporaryPassword, newPassword } = body;
//       let userModel;

//       switch (role) {
//           case 'super_admin':
//               userModel = SuperAdmin;
//               break;
//           case 'client_admin':
//               userModel = ClientAdmin;
//               break;
//           case 'firm_admin':
//               userModel = FirmAdmin;
//               break;
//           case 'accountant':
//               userModel = Accountant;
//               break;
//           case 'g_emp':
//               userModel = GeneralEmployee;
//               break;
//           case 'customer_sp':
//               userModel = SupportExecutive;
//               break;
//           case 'viewer':
//               userModel = Viewer;
//               break;
//           default:
//             return Promise.reject('Invalid Role');
//       }

//       const user = await userModel.findOne({ email: email });
//       if (!user) {
//         return Promise.reject('Account Not Found');
//       } else {
//           // Compare the temporary password with the hashed password
//           const match = await PasswordService.comparePassword(temporaryPassword, user.password);
//           if (match) {
//               // Hash the new password
//               const updatedPassword = await PasswordService.passwordHash(newPassword);
//               user.password = updatedPassword;
//               await user.save();
//               return 'Password Updated Successfully';
//           } else {
//             return Promise.reject('Invalid Temporary Password');
//           }
//       }
//   } catch (error) {
//       console.error(error);
//       return Promise.reject('An error occurred while processing the request.');
//   }
// }


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
