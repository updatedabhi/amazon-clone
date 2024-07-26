const nodemailer = require('nodemailer');
const OtpModel = require('../model/otpSchema');
const UserModel = require('../model/userModel');

const sendOTPMail = async (email, otp) => {
    try {
        let mailer = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: 'sangamgupta17179@gmail.com',
                pass: 'ezyz qtzk blxt wbiq',
            },
        });

        const response = await mailer.sendMail({
            from: 'sangam@home.cloud.app',
            to: email,
            subject: 'OTP', // OTP verification for your account
            html: `
                <html>
                    <body>
                        <h1>Your OTP for Cloud Home APP is</h1>
                        <h1>${otp}</h1>
                    </body>
                </html>
            `,
        });

        console.log(response);

        return true;
    } catch (err) {
        console.log('--------------------------------');
        console.log(err);
        console.log('--------------------------------');

        return false;
    }
};

const generateOtp = async (req, res) => {
    try {
        const { email, _id } = req.user;
        const restrictedTimeForOTP = 10 * 60 * 100;

        const sentOTPMail = await OtpModel.findOne({
            email,
            ecreatedAt: {
                $gte: Date.now() - restrictedTimeForOTP,
            },
        });

        if (sentOTPMail) {
            return res.status(200).json({
                status: 'success',
                message: 'OTP already sent',
                data: {
                    expiresAt: sentOTPMail.expiresAt,
                },
            });
        }

        // generate Random OTP
        // const otp = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP

        const randomOTP = Math.floor(Math.random() * 9000 + 1000);

        const isMailSent = await sendOTPMail(email, randomOTP);

        if (!isMailSent) {
            return res.status(500).json({
                status: 'Fail',
                message: `OTP NOT sent to ${email}`,
                data: {
                    createdAt: sentOPTMail.createdAt,
                },
            });
        }

        await OtpModel.create({
            otp: randomOTP,
            email,
            userId: _id,
        });

        // create an entry in the database with that OTP (pseudo code)
        // await db.createOtpEntry({ email, otp });

        return res.status(201).json({
            status: 'success',
            message: `OTP sent to ${email}`,
            data: {},
        });
    } catch (err) {
        console.log('----------------------------');
        console.log(err);
        console.log('----------------------------');
        return res.status(500).json({
            status: 'fail',
            message: 'Internal Server Error',
            data: err,
        });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const { email } = req.user;

        console.log("opt=", otp);
        console.log("email=", email);

        const restrictedTimeForOTP = 10 * 60 * 100; // miliseconds

        const sentOTPMail = await OtpModel.findOne({
            email,
            createdAt: {
                $gte: Date.now() - restrictedTimeForOTP,
            },
        });
        console.log("sentOTPMail====",sentOTPMail);

        if (!sentOTPMail) {
            return res.status(404).json({
                status: 'fail',
                message: 'Veification failed. Please generate new ORP!',
                data: {},
            });
        }
        const hashedOtp = sentOTPMail.otp;
        const isCorrect = await sentOTPMail.verifyOtp(otp + "", hashedOtp);

        if (!isCorrect) {
            return res.status(400).json({
                status: 'fail',
                message: 'Incorrect OTP',
                data: {},
            });
        }

        await UserModel.findOneAndUpdate({ email }, { isEmaailverified: true });

        res.status(200).json({
            status: 'success',
            message: 'OTP verified successfully',
            data: {},
        });

    } catch (err) {
        console.log('----------------------------');
        console.log(err);
        console.log('----------------------------');
        return res.status(500).json({
            status: 'fail',
            message: 'Internal Server Error',
            data: err,
        });

    };
}

module.exports = { generateOtp, verifyOtp };
