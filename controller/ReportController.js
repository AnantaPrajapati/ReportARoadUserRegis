
const { sendError } = require('../utils/error');
const ReportServices = require('../services/ReportServices');
const User = require('../model/UserModel');
const IncidentServices = require('../services/ReportServices');


exports.createReport = async (req, resp, next) => {
    try {
        const { email, location, image, severity, desc } = req.body;

        const user= await User.findOne({ email: email });
        if (!user) {
            return sendError(resp, "User doesn't exitst");
        }

        if(!location){
            return sendError(resp, "Please enter the location");
        } 
        if(!image){
            return sendError(resp, "Image dosen't exist");
        } 
        if(!severity ){
            return sendError(resp, "Please mention the severity");
        } 
        if( !desc) {
            return sendError(resp, 'Fill up the description');
        }

        let Report = await ReportServices.createReport(email, location, image, severity, desc);
        resp.json({ status: true, });
    } catch (error) {
        next(error);
    }
};
exports.getReport = async (req, resp, next) => {
    try {
        const { email } = req.body;
        let report = await ReportServices.getReport(email);
        resp.json({ status: true, success:report });
    } catch (error) {
        next(error);
    }
};
exports.IncidentReport = async (req, resp, next) => {
    try {
        const { email, location, image, title, desc } = req.body;

        const user= await User.findOne({ email: email });
        if (!user) {
            return sendError(resp, "User doesn't exitst");
        }

        if(!location){
            return sendError(resp, "Please enter the location");
        } 
        if(!image){
            return sendError(resp, "Image dosen't exist");
        } 
        if(!title ){
            return sendError(resp, "Please mention the severity");
        } 
        if( !desc) {
            return sendError(resp, 'Fill up the description');
        }

        let Report = await IncidentServices.createReport(email, location, image, title, desc);
        resp.json({ status: true, });
    } catch (error) {
        next(error);
    }
};
// const { sendError } = require('../otp/error');
// const ReportServices = require('../services/ReportServices');
// const User = require('../model/UserModel');
// const UserModel = require('../model/UserModel');
// const service = require('../services/service');
// const multer = require('multer');

// //storage
// const Storage = multer.diskStorage({
//     destination:'upload',

//     filename:(req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({
//     storage: Storage
// }).single('testImage')

// exports.createReport = async (req, resp, next) => {
//     try {
//         const { email, location, severity, desc } = req.body;

//         const user= await User.findOne({ email: email });
//         if (!user) {
//             return sendError(resp, "User doesn't exitst");
//         }

//         if(!severity ){
//             return sendError(resp, "Please mention the severity");
//         } 
//         if( !desc) {
//             return sendError(resp, 'Fill up the description');
//         }

//         if(!location){
//             return sendError(resp, "Please enter the location");
//         } 
//         if(!req.file){
//             return sendError(resp, "Image dosen't exist");
//         } 
//         const image = req.file.filename;
//         const contentType = 'image/png';
        

//         let Report = await ReportServices.createReport(email, location, image, severity, desc, contentType);
//         resp.json({ status: true, });
//     } catch (error) {
//         next(error);
//     }
// };


// const { sendError } = require('../otp/error');
// const ReportServices = require('../services/ReportServices');
// const User = require('../model/UserModel');
// const multer = require('multer');

// // Multer configuration
// const Storage = multer.diskStorage({
//     destination: 'upload',
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });
// const upload = multer({ storage: Storage }).single('testImage'); 

// exports.createReport = async (req, resp, next) => {
//     try {
//         // Handle JSON data
//         const { email, location, severity, desc } = req.body;
//         const user = await User.findOne({ email: email });
//         if (!user) {
//             return sendError(resp, "User doesn't exist");
//         }

//         if (!severity) {
//             return sendError(resp, "Please mention the severity");
//         } 
//         if (!desc) {
//             return sendError(resp, 'Fill up the description');
//         }

//         if (!location) {
//             return sendError(resp, "Please enter the location");
//         } 

//         // Handle file upload
//         // upload(req, resp, async (err) => {
//         //     if (err) {
//         //         console.error('Error uploading file:', err);
//         //         return sendError(resp, "Error uploading image");
//         //     }

//         //     if (!req.file) {
//         //         return sendError(resp, "Image doesn't exist");
//         //     }
//         //     const imageBuffer = req.file.buffer;
//         //     const contentType = req.file.mimetype;

//             // Call the service to create the report
//             const report = await ReportServices.createReport({ email, location, imageBuffer, severity, desc, contentType });
//             resp.json({ status: true });
//         // });
//     } catch (error) {
//         next(error);
//     }
// };


// const { sendError } = require('../utils/error');
// const ReportServices = require('../services/ReportServices');
// const User = require('../model/UserModel');
// const cloudinary = require('cloudinary').v2;

// // Configure Cloudinary (make sure to replace placeholders with your actual Cloudinary credentials)
// cloudinary.config({
//   cloud_name: 'dawfvl61t',
//   api_key: '237111674384819',
//   api_secret: 'IPQwVxBAuXjEW5no-RRgsQzI5LU'
// });

// exports.createReport = async (req, resp, next) => {
//     try {
//         const {image } = req.body;
//         const contentType = req.headers['content-type'];

//         // const user= await User.findOne(email);
//         // if (!user) {
//         //     return sendError(resp, "User doesn't exist");
//         // }

//         // if(!location){
//         //     return sendError(resp, "Please enter the location");
//         // } 
//         if(!image){
//             return sendError(resp, "Image doesn't exist");
//         } 
//         // if(!severity ){
//         //     return sendError(resp, "Please mention the severity");
//         // } 
//         // if( !desc) {
//         //     return sendError(resp, 'Fill up the description');
//         // }

//         // Upload image to Cloudinary
//         const cloudinaryResponse = await uploadImageToCloudinary(image);

//         // Extract the secure URL of the uploaded image from Cloudinary response
//         const imageUrl = cloudinaryResponse.secure_url;

//         // Create report using ReportServices.createReport
//         let Report = await ReportServices.createReport( imageUrl, contentType );
//         resp.json({ status: true });
//     } catch (error) {
//         next(error);
//     }
// };
// async function uploadImageToCloudinary(image) {
//     try {
//         const result = await cloudinary.uploader.upload(image);
//         return result;
//     } catch (error) {
//         console.error('Error uploading image to Cloudinary:', error.message); // Log only the error message
//         throw error; // Rethrow the error to be caught in the calling function
//     }
// }

