const Profile = require('./UserControllers');
const User = require('../model/UserModel');
const { sendError } = require('../utils/error');
const bcrypt = require('bcrypt');
const UserModel = require('../model/UserModel');

exports.profile = async (req, resp) => {
    try {
        const userId = req.query.userId;
        const user = await User.findById(userId); 
        const {firstname, lastname , username, email} = user
        if (!user) {
            return sendError(resp, 'User not found');
        }
        resp.send({firstName: firstname, lastName: lastname, Username: username, Email:email});
    } catch (error) {
        console.error('Error fetching user data:', error);
        sendError(resp, 'Internal server error: ' + error.message);
    }
};
exports.deleteProfile = async (req, resp) => {
    try {
        const userId = req.query.userId;
        const { email } = req.body;

        const user = await UserModel.findById(userId);  
        if (!user) {
            return sendError(resp, 'User not found');
        }
        const User = await UserModel.checkUser(email);
        if (!User) {
            return sendError(resp, "E-mail is invalid !!");
        }
        resp.send({firstName: firstname, lastName: lastname, Username: username, Email:email});
    } catch (error) {
        console.error('Error fetching user data:', error);
        sendError(resp, 'Internal server error: ' + error.message);
    }
};

exports.updateProfile = async (req, resp) => {
    try {
        const { firstname, lastname, username } = req.body;
        const userId = req.query.userId;
       
        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser._id.toString() !== userId) {
            return sendError(resp, 'Username already exists');
        }
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId }, 
            { firstname, lastname, username },
            { new: true }
        );

        resp.json({ success: true, message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user data:', error);
        sendError(resp, 'Internal server error: ' + error.message);
    }
};

exports.ChangePassword = async (req, resp) => {
   
    try {
        const email = req.query.email;
        const {  password, Cpassword } = req.body;
       
        const user = await User.findOne({ email });
        if (!user) return sendError(resp, 'User not found');

        if(!password || !Cpassword){
            return sendError(resp, "Enter new password");
        }
        if(password !== Cpassword){
            return sendError(resp, "Password do not match");
        }
        const salt = await bcrypt.genSalt(11);
        const hashPass = await bcrypt.hash(password, salt);
        const newPassword = hashPass;

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { password: newPassword , Cpassword: newPassword },
            { new: true }
        );

        resp.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error in resetting password:', error);
        sendError(resp, 'Internal server error: ' + error.message);
    }
};
exports.DeleteAccount = async (req, resp) => {
    try {
        const userId = req.query.userId;
        const { email } = req.body;

        if (!userId) {
            return resp.status(400).json({ success: false, message: 'User ID not provided' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return resp.status(404).json({ success: false, message: 'User not found' });
        }
        if (user.email !== email) {
            return resp.status(400).json({ success: false, message: 'Email does not match the logged-in user' });
        }
        const deleteUser = await User.findOneAndDelete({ email });

        resp.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error in deleting account:', error);
        resp.status(500).json({ success: false, message: 'Internal server error: ' + error.message });
    }
};





// exports.changeEmail = async (req, resp) => {
//     try {
//         const { email } = req.body;
//         const { id } = req.params; 
//         if (!email) return sendError(resp, 'Please provide a valid email');

//         const existingEmail = await User.findOne({ email });
//         if (existingEmail && existingEmail._id.toString() !== id) {
//             return sendError(resp, 'Please provide a valid email');
//         }

//         // Generate a random OTP
//         const randomBytes = generateOTP();
        
//         // Create a new ResetOtp instance with owner and otp
//         const resetOtp = new ResetOtp({ email:email, otp: randomBytes });
//         await resetOtp.save();

//         // Send email with the OTP
//         await mailTransport().sendMail({
//             from: 'security@gmail.com',
//             to: user.email,
//             subject: 'Email change',
//             html: `<h1>Your OTP for email change: ${randomBytes}</h1>`
//         });

//         resp.json({ success: true, message: 'Change email OTP sent successfully.' });
//     } catch (error) {
//         console.error('Error in changing email:', error);
//         sendError(resp, 'Internal server error: ' + error.message);
//     }
// };

