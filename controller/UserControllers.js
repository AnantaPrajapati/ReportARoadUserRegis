// const UserService = require('../services/UserServices');
// const validateOtp = require('../middleware/validateOtp');
const service = require('../services/service');

const bcrypt = require('bcrypt');
const User = require('../model/UserModel');
const VerificationOtp = require('../model/VerificationOtp');
const ResetOtp = require('../model/resetOtp');
const { sendError , createRandomBytes} = require('../otp/error');
const { mailTransport, generateOTP } = require('../otp/mail');
const { isValidObjectId } = require('mongoose');

const crypto = require('crypto');



exports.signup = async (req, resp, next) => {
    try {
        const { firstname, lastname, username, email, password, Cpassword } = req.body;

        // const successResp = await UserService.signupuser(firstname, lastname, username, email, password, Cpassword);
        const successResp = await service.signupuser(firstname, lastname, username, email, password, Cpassword);

        resp.json({ status: true, Success: "User Signed in" });
    } catch (err) {
        next(err);

    }
};

exports.login = async ( req, resp, next) => {
    try {
        // if (!UserService.checkUser.email.trim() || !User.comparePasswordpassword.trim())
        //     return sendError(res, "email or password is missing")
        const { email, password } = req.body;

        // const User = await UserService.checkUser(email);
        const User = await service.checkUser(email);
        if (!User) {
            return sendError(resp, "User doesn't exitst");
        }

        // Check if the user's email is verified
        if (!User.verified) {
            return sendError(resp, "Email is not verified");
        }

        const isPasswordMatch = await User.comparePassword(password);
        if (isPasswordMatch === false) {
            return sendError(resp, "Password doesn't match");
        }

        let tokenData = { _id: User._id, email: User.email };
        // const token = await UserService.generateToken(tokenData, "secretkey", '1hr');
        const token = await service.generateToken(tokenData, "secretkey", '1hr');

        resp.status(200).json({ status: true, token: token })


    } catch (err) {
        next(err);

    }
};
exports.verifyEmail = async (req, resp) => {
    try {
        const { email, Otp } = req.body;
        if (!email || !Otp.trim()) return sendError(resp, 'Invalid request, missing parameters');

        const user = await User.findOne({ email }); // Find user by email
        if (!user) return sendError(resp, 'User not found');

        if (user.verified) return sendError(resp, "This account is already verified");

        const otpRecord = await VerificationOtp.findOne({ email }); // Find OTP record by email
        if (!otpRecord) return sendError(resp, "OTP record not found");

         // Compare hashed OTPs
        const isMatch = await bcrypt.compare(Otp, otpRecord.otp);
        if (!isMatch) return sendError(resp, "Invalid OTP");

        user.verified = true;
        // await user.save();
        await User.findOneAndUpdate({ email }, { $set: { verified: true } });
        await otpRecord.deleteOne();

        await mailTransport().sendMail({
            from: 'verifyotp@gmail.com',
            to: user.email,
            subject: "Email Verification Success",
            html: `<h1>Welcome! Your email has been verified successfully.</h1>`
        });

        resp.json({ status: true, email: user.email });
    } catch (error) {
        console.error("Error in verifyEmail:", error);
        sendError(resp, "Internal server error: " + error.message); // Return detailed error message
    }
};


exports.forgetPassword = async (req, resp) => {
    try {
        const { email } = req.body;
        if (!email) return sendError(resp, 'Please provide a valid email');

        const user = await User.findOne({ email });
        if (!user) return sendError(resp, 'User not found');

        // Generate a random OTP
        const randomBytes = generateOTP();
        
        // Create a new ResetOtp instance with owner and otp
        const resetOtp = new ResetOtp({ email:email, otp: randomBytes });
        await resetOtp.save();

        // Send email with the OTP
        await mailTransport().sendMail({
            from: 'security@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            html: `<h1>Your OTP for password reset: ${randomBytes}</h1>`
        });

        resp.json({ success: true, message: 'Reset OTP sent successfully.' });
    } catch (error) {
        console.error('Error in forgetPassword:', error);
        sendError(resp, 'Internal server error: ' + error.message);
    }
};

exports.verifyResetOtp = async (req, resp) => {
    try {
        const { email, Otp } = req.body;
        if (!email || !Otp.trim()) {
            return sendError(resp, 'Invalid request, missing parameters');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return sendError(resp, 'User not found');
        }
        const otpRecord = await ResetOtp.findOne({ email });
        if (!otpRecord) {
            return sendError(resp, "OTP record not found");
        }

        // Check if OTP is expired
        if (otpRecord.expiresAt < new Date()) {
            return sendError(resp, "OTP has expired. Please request a new one.");
        }

        const isMatch = await bcrypt.compare(Otp, otpRecord.otp);
        if (!isMatch) {
            return sendError(resp, "Invalid OTP");
        }
        // await user.save();

        // Delete OTP record
        await otpRecord.deleteOne();

        resp.json({ status: true, email: user.email });
    } catch (error) {
        console.error("Error in Resetting password:", error);
        sendError(resp, "Internal server error: " + error.message);
    }
};

exports.resetPassword = async (req, resp) => {
   
    try {
        const { email, password, Cpassword } = req.body;
       
        const user = await User.findOne({ email });
        if (!user) return sendError(resp, 'User not found');

        // if(!password || !Cpassword){
        //     return sendError(resp, "Enter new password");
        // }
        // if(password = !Cpassword){
        //     return sendError(resp, "Password do not match");
        // }
        const salt = await bcrypt.genSalt(11);
        const hashPass = await bcrypt.hash(password, salt);
        const newPassword = hashPass;

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { password: newPassword },
            { new: true }
        );

        await ResetOtp.findOneAndDelete({ email });

        await mailTransport().sendMail({
            from: 'security@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            html: '<h1>Password reset successfully. Now you can reset your password</h1>'
        });

        resp.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error in resetting password:', error);
        sendError(resp, 'Internal server error: ' + error.message);
    }
};



exports.logout = async (req, resp, next)=>{

    try{
        req.session.destroy();
        resp.redirect('/login');
    }
    catch(error){
     console.warn(error.message);
    }

}