const nodemailer = require("nodemailer");

// GENERATE OTP
const generateOtp = async (body) => {
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


// Function to send credentials via email
const sendCredentialsEmail = async (email, temporaryPassword, loginLink) => {
    try {
        const emailTemplate = `
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
                            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
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
                        .content {
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
                        .credential-wrapper {
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                        }
                        .login-link {
                            font-size: 16px;
                            color: #FF4081;
                            text-decoration: none;
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
                        <h1 class="title">Welcome to aaMOBee!</h1>
                        <div class="content">
                            <p>Hello,</p>
                            <p>Your account has been successfully created. Below are your login credentials:</p>
                            <div class="credential-wrapper">
                                <p><strong>Email:</strong> ${email}</p>
                                <p><strong>Temporary Password:</strong> ${temporaryPassword}</p>
                                <p><strong>Login Link:</strong> <a href="${loginLink}" class="login-link">${loginLink}</a></p>
                            </div>
                            <p>Please log in and change your password for security purposes.</p>
                            <p>If you have any questions, feel free to contact our support team.</p>
                            <p>Best regards,</p>
                            <p>The aaMOBee Team</p>
                        </div>
                    </div>
                </body>
            </html>
        `;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GOOGLE_MAIL,
                pass: process.env.GOOGLE_PASS,
            },
        });

        const mailOptions = {
            from: process.env.GOOGLE_MAIL,
            to: email,
            subject: "Welcome to aaMOBee - Account Credentials",
            html: emailTemplate,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Credentials sent to ${email}`);
    } catch (error) {
        console.error("Failed to send email:", error.message);
        throw new Error("Error sending credentials email");
    }
};

// Export the function
module.exports = {
    sendCredentialsEmail,
    generateOtp
};
