const Profile = require('./UserControllers');
const User = require('../model/UserModel');
const { sendError } = require('../utils/error');
// Route for profile page
exports.profile = async (req, resp) => {
    try {
        const {id} = req.params;
        // Fetch user data from the database
        const user = await User.findById(id); // Assuming req.user contains user information after authentication
        const {firstname, lastname , username, email} = user
        if (!user) {
            return sendError(resp, 'User not found');
        }

        // Render the profile page with user data
        resp.send({firstName: firstname, lastName: lastname, Username: username, Email:email});
    } catch (error) {
        console.error('Error fetching user data:', error);
        sendError(resp, 'Internal server error: ' + error.message);
    }
};


// Route for updating user data
exports.updateProfile = async (req, resp) => {
    try {
        const { firstname, lastname, username, email } = req.body;

        // Update user data in the database
        const updatedUser = await User.findOneAndUpdate(
            { email: req.user.email }, // Assuming req.user contains user information after authentication
            { firstname, lastname, username },
            { new: true }
        );

        resp.json({ success: true, message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user data:', error);
        sendError(resp, 'Internal server error: ' + error.message);
    }
};
