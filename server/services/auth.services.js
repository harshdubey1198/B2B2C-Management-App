const nodemailer = require("nodemailer");
const generateTemporaryPassword = require("../utils/tempPassword");
const PasswordService = require('./password.services');
const User = require("../schemas/user.schema");
const multer = require("multer");
const uploadToCloudinary = require("../utils/cloudinary");
const Plan = require("../schemas/plans.schema");

const authService = {};

// REGISTER 
authService.Registration = async (body) => {
    try {
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return Promise.reject("Account already exists!");
        }

        const hashedPassword = await PasswordService.passwordHash(body.password);
        body.password = hashedPassword;
        body.role = body.role || "client_admin";
        body.adminId = body.adminId || "66e12a6702eac32b99a2dda7";
        const user = await User.create(body);

        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();

        // Send OTP via email
        await authService.generateOtp({ email: user.email, otp });

        return user;
    } catch (error) {
        console.error("Error during Registration:", error);
        return Promise.reject("Unable to create user");
    }
};


// GENERATE OTP
authService.generateOtp= async (body) => {
    try {
        const {email, otp} = body

        const emailtemplate = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f0f0f0;
                            margin: 0;
                            padding: 0;
                        }
                        .title {
                            color: #FF4081;
                            font-weight: bold;
                            font-size: 24px;
                            margin-bottom: 10px;
                            font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                        }
                        .container {
                            max-width: 600px;
                            margin: auto;
                            background: #fff0f5;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            text-align: center;
                            color: #fff;
                        }
                        .otp-content {
                            background-color: #fff;
                            color: #071e43;
                            padding: 20px;
                            border-radius: 5px;
                            margin-top: 20px;
                            border: 2px solid #FF4081;
                            text-align: left;
                        }
                        .logo {
                            max-height: 130px;
                            background: #fff0f5;
                        }
                        .otp-wrapper {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .otp {
                            font-size: xx-large;
                            text-align: center;
                            background-color: aquamarine;
                            padding: 5px 10px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <img 
                            src="https://res.cloudinary.com/harshdubey1198/image/upload/v1726118056/aamobi_z8csyd.png"
                            alt="aaMOBee"
                            class="logo"
                        />
                        <h1 class="title">aaMOBee Account Verification</h1>
                        <div class="otp-content">
                            <p>Hello Guest!</p>
                            <p>Thank you for registering with aaMOBee! We're excited to have you on board.</p>
                            <p>To complete your registration and activate your account, please verify your email address using the One-Time Password (OTP) provided below:</p>
                            <p> Your OTP:</p>
                            <div class="otp-wrapper">
                                <p class="otp"> ${otp} </p>
                            </div>
                            <p>Please enter this OTP on the aaMOBee website to complete your verification.</p>
                            <p>If you did not create an account with aaMOBee, please ignore this email.</p>
                            <p>Thank you for choosing aaMOBee. If you have any questions or need assistance, feel free to contact our support team.</p>
                            <p>Best regards,</p>
                            <p>The aaMOBee Team</p>
                        </div>
                    </div>
                </body>
            </html>
        `;

        // Create nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_MAIL,
                pass: process.env.GOOGLE_PASS,
            },
        });
        // Define email content
        const mailOptions = {
            from: process.env.GOOGLE_MAIL,
            to: email,
            subject: "aaMOBee Account Verification",
            html: emailtemplate,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        return { message: "OTP sent successfully", otp: otp };

    } catch (error) {
        return Promise.reject("Error sending otp");
    }
}

// VERFIY LOGIN
authService.verifyOtp = async (body) => {
    const { email, otp } = body;
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new Error("User Not Exist");
    }

    if (user.otp !== Number(otp)) {
        throw new Error("Invalid OTP");
    }

    const currentTime = new Date();
    if (currentTime > user.otpExpiry) {
        throw new Error("OTP has expired");
    }

    // OTP is valid, mark the user as verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return "OTP verified successfully";
};

// RESEND OTP
authService.resendOtp = async (body) => {
    const user = await User.findOne({ email: body.email });
    
    if (!user) {
        throw new Error("User Not Exist");
    }

    const currentTime = new Date();
    if (currentTime < user.otpExpiry) {
        throw new Error("Existing OTP is still valid. Please wait.");
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000);
    user.otp = newOtp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); 
    await user.save();

    // Send new OTP
    await authService.generateOtp({ email: user.email, otp: newOtp });

    return { message: "New OTP sent successfully" };
};

// LOGIN USER
authService.userLogin = async (body) => {
    try {
        const { email, password } = body;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('Account Not Found');
        }
        
        const passwordMatch = await PasswordService.comparePassword(password, user.password);
        if (!passwordMatch) {
            throw new Error("Incorrect Password");
        }

        // Return user data without password
        return await User.findOne({ _id: user._id }).select("-password");

    } catch (error) {
        console.error('Login failed:', error);
        throw new Error(error.message || 'Login failed');
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

// GET ACCOUNT 
authService.getAccount  = async (id) => {
    try {
        const data = User.findOne({_id: id}).select("-password")
        return data
    } catch (error) {
        console.error(error);
        return Promise.reject('Error occured during fetching the company data.');
    }
}

// CREATE FIRM OR CREATE USER
// authService.registration = async (id, data) => {
//     try {
//         const firm = await User.findOne({_id:id}).populate({
//             path: 'adminId',
//             populate: {
//                 path: 'planId'
//             }
//         })
//         console.log(firm,"firmsss")
//         const clientAdmin = firm.adminId;
//         if (!clientAdmin) {
//             console.log("Client Admin not found for this firm.");
//             return Promise.reject("Client Admin not found for this firm.");
//         }

//         const clientPlan = clientAdmin.planId;
//         if (!clientPlan) {
//             console.log("Client admin does not have a valid plan.");
//             return Promise.reject("Client admin does not have a valid plan.");
//         }
//         const countUser = await User.countDocuments({ adminId: id})
//         if(countUser > clientPlan.maxUsers){
//             return Promise.reject("User creation limit reached for this plan. Please upgrade.");
//         }
//         console.log(countUser, "countuser")
//         const existingUser = await User.findOne({ email: data.email });
//         if (existingUser) {
//             return Promise.reject("Account already exists!");
//         }

//         if (data.role === 'firm_admin') {
//             const existingFirmAdmin = await User.findOne({ role: 'firm_admin', adminId: id });
//             if (existingFirmAdmin) {
//                 return Promise.reject("There is already a firm admin for this firm!");
//             }
//         }
        
//         console.log(data, "dataa")
//         if (data.avatar) {
//             let imageUrl;
//             if (typeof data.avatar === 'string' && data.avatar.startsWith('http')) {
//                 imageUrl = data.avatar;
//             } else if (typeof data.avatar === 'string' && data.avatar.startsWith('data:image')) {
//                 const base64Data = data.avatar.replace(/^data:image\/\w+;base64,/, "");
//                 const buffer = Buffer.from(base64Data, 'base64');
//                 const uploadResponse = await uploadToCloudinary(buffer);
//                 imageUrl = uploadResponse.secure_url;
//             } else if (Buffer.isBuffer(data.avatar)) {
//                 const uploadResponse = await uploadToCloudinary(data.avatar);
//                 imageUrl = uploadResponse.secure_url;
//             } else {
//                 throw new Error("Invalid avatar format");
//             }

//             data.avatar = imageUrl;
//         } else {
//             console.log("No file uploaded.");
//         }
//         const encryptedPassword = await PasswordService.passwordHash(data.password);
//         data.password = encryptedPassword;
//         data.isActive = true;
//         data.adminId = id;
  
//        const newUser = new User(data);
//        const user = await newUser.save();
//        return user;
//     } catch (error) {
//       console.error("Error in user registration:", error);
//       return Promise.reject("Unable to create User");
//     }
// }

// authService.registration = async (id, data) => {
//     const existingUser = await User.findOne({ email: data.email });
//     if (existingUser) {
//         throw new Error("Account already exists!");
//     }

//     if (data.role === 'firm_admin') {
//         const existingFirmAdmin = await User.findOne({ role: 'firm_admin', adminId: id });
//         if (existingFirmAdmin) {
//             throw new Error("There is already a firm admin for this firm!");
//         }
//     }

//     const encryptedPassword = await PasswordService.passwordHash(data.password);
//     data.password = encryptedPassword;
//     console.log('Registration Data:', data.password); // Log the data
//     data.isActive = true;
//     data.adminId = id;

//     const newUser = new User(data);
//     const user = await newUser.save();
//     return user;
// };
authService.registration = async (id, data) => {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("Account already exists!");
    }
  
    // Check if a firm admin already exists for this firm
    if (data.role === 'firm_admin') {
      const existingFirmAdmin = await User.findOne({ role: 'firm_admin', adminId: id });
      if (existingFirmAdmin) {
        throw new Error("There is already a firm admin for this firm!");
      }
    }
  
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
    
    // Encrypt the password
    const encryptedPassword = await PasswordService.passwordHash(data.password);
    data.password = encryptedPassword;
    
    data.isActive = true;
    data.adminId = id;
  
    // Save the new user in the database
    const newUser = new User(data);
    const user = await newUser.save();
    return user;
  };
  

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
authService.getfirm  = async (id) => {
    try {
        const data = User.find({_id: id});
        return data
    } catch (error) {
        console.error(error);
        return Promise.reject('Error occured during fetching the company data.');
    }
}

// update account 
// authService.updateAccount = async (id, req) => {
//     try {
//         const data = req.body;

//         await new Promise((resolve, reject) => {
//             upload.single('avatar')(req, null, (err) => {
//                 if (err instanceof multer.MulterError) {
//                     return reject(new Error('File upload error: ' + err.message));
//                 } else if (err) {
//                     return reject(new Error('File validation error: ' + err.message));
//                 }
//                 resolve();
//             });
//         });

//         if (req.file) {
//             // Upload the profile picture to Cloudinary
//             const imageUrl = await uploadToCloudinary(req.file.buffer);
//             data.avatar = imageUrl;
//         } else {
//             console.log("No file uploaded.");
//         }

//         const updatedAccount = await User.findOneAndUpdate({ _id: id }, data, { new: true });
//         return updatedAccount;
//     } catch (error) {
//         console.log("Error in updating account", error);
//         return Promise.reject("Unable to update account. Try again later!");
//     } 
// }


authService.updateAccount = async (id, data) => {
    try {
        if (data.avatar) {
            let imageUrl;
            if (typeof data.avatar === 'string' && data.avatar.startsWith('http')) {
                imageUrl = data.avatar;
            } else if (typeof data.avatar === 'string' && data.avatar.startsWith('data:image')) {
                const base64Data = data.avatar.replace(/^data:image\/\w+;base64,/, "");
                const buffer = Buffer.from(base64Data, 'base64');
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

        const updatedAccount = await User.findOneAndUpdate({ _id: id }, data, { new: true });
        return updatedAccount;
    } catch (error) {
        console.log("Error in updating account", error);
        return Promise.reject("Unable to update account. Try again later!");
    }
};




// COUNT CLIENT ADMIN 
authService.countUsers = async (body) => {
    try {
        const { role, userId } = body;

        if (!role || !userId) {
            return Promise.reject("Role and User ID are required");
        }

        if (role === 'super_admin') {
            const clientAdmins = await User.countDocuments({adminId: userId });
            return { message: "Client Admins under Super Admin", data: clientAdmins };
         }

        if (role === 'client_admin') {
            const firms = await User.countDocuments({ adminId: userId });
            return { message: "Firms under Client Admin", data: firms };
        }

        if (role === 'firm') {
            const users = await User.countDocuments({ adminId: userId });
            return { message: "Users under Firm Admin", data: users };
        }

        if (role === 'firm_admin' || role === "accountant" || role === "g_emp") {
            const user = await User.findOne({_id: userId})
            if(user){
                const users = await User.countDocuments({ adminId: user.adminId });
                return { message: "Users under Firm Admin", data: users };
            }
        }

        return Promise.reject("Invalid role provided. Use 'super_admin', 'client_admin', 'firm' or 'firm_admin'");
    } catch (error) {
        console.log("Error in fetching child entities", error);
        return Promise.reject("Unable to fetch child entities. Try again later!");
    }
}

// Firms Under Client Admin
authService.getFirmUnderClient = async () => {
    try {
        const clientAdmins = await User.find({role: "client_admin"}).select("-password -otp")
        if (!clientAdmins) {
            return res.status(404).json({ message: 'Client Admin not found' });
        }
        const response = []
        await Promise.all(clientAdmins.map(async (admin) => {
            const firms = await User.find({adminId : admin._id}).select("-password -otp")
            response.push({
                ...admin.toObject(),
                firms: firms 
            });        
        }))
        return response
    } catch (error) {
        console.log("Error Getting Firms under clientaccount", error);
        return Promise.reject("Error Getting Firms under clientaccount. Try again later!");
    }
}

module.exports = authService;
