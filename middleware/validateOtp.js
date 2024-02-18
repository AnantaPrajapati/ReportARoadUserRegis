// // Import required modules
// const jwt = require('jsonwebtoken');
// const { sendError } = require('../otp/error');


// const JWT_SECRET = '';

// // Middleware function to validate otp
// const validateOtp = (req, resp, next) => {
//     // Get the token from the request headers
//     const token = req.headers['authorization'];

//     // Check if token exists
//     if (!token) {
//         return sendError(resp, 'Unauthorized: No token provided');
//     }

//     // Verify the token
//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return sendError(resp, 'Unauthorized: Invalid token');
//         }
//         // Token is valid, proceed to the next middleware or route handler
//         req.userId = decoded.userId; // Attach userId to the request object for later use
//         next();
//     });
// };

// module.exports = validateOtp;