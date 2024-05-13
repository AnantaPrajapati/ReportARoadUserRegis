
const { sendError } = require('../utils/error');
const ReportServices = require('../services/ReportServices');
const User = require('../model/UserModel');
const IncidentServices = require('../services/IncidentService');
const https = require('https');
const ReportModel = require('../model/ReportModel');
const { mailTransport } = require('../utils/mail');
const UserModel = require('../model/UserModel');
const IncidentModel = require('../model/IncidentModel');



exports.getAllReports = async (req, res, next) => {
    try {
        const reports = await ReportServices.getAllReports(null); 
        res.json({ success: true, reports });
    } catch (error) {
        sendError(error);
    }
};


exports.getApprovedReports = async (req, res, next) => {
    try {
        const approvedReports = await ReportServices.getApprovedReports();
        res.json({ success: true, reports: approvedReports });
    } catch (error) {
        sendError(error);
    }
};


exports.createNews = async (req, resp, next) => {
    try {
        const { title, location, image, desc } = req.body;

        // const user= await User.findOne({ email: email });
        // if (!user) {
        //     return sendError(resp, "User doesn't exitst");
        // }

        if(!title){
            return sendError(resp, "Please enter the location");
        } 
        if(!location){
            return sendError(resp, "Please enter the location");
        } 
        if(!image){
            return sendError(resp, "Image dosen't exist");
        } 
        if( !desc) {
            return sendError(resp, 'Fill up the description');
        }

        let News = await ReportServices.createNews(title, location, image, desc);
        resp.json({ status: true, });
    } catch (error) {
        next(error);
    }
};

// exports.govReport = async (req, resp, next) => {
//     try {
//         const userId = req.query.userId;

//         const user = await UserModel.findById(userId);

//         if (user.role === 'government') {
//             const city = user.city;
//             const reports = await ReportServices.govReport(city);

//             resp.json({ status: true, success: reports });
//         } else {
//             resp.status(403).json({ status: false, error: "Unauthorized access" });
//         }
//     } catch (error) {
//         next(error);
//     }
// };

exports.approveReport = async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const { comment } = req.body;

        const report = await ReportModel.findById(userId);
        if (!report) {
            return res.status(404).json({ success: false, message: 'Report not found' });
        }

        await ReportModel.findByIdAndUpdate(userId, { status: 'approved' });

    
        const user = await User.findById(report.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }


        const emailBody = `Your report has been approved. Comment: ${comment}`;
        // await sendMail(user.email, 'Report Approval', emailBody);
        await mailTransport().sendMail({
            from: 'infoReportARoad@gmail.com',
            to: user.email,
            subject: "Your Report has been approved!!!",
            html: `<h1>Your report has been approved. Reason: ${comment}</h1>`
        });

        // const notificationBody = `A report has been approved. Comment: ${comment}`;
        // await sendNotificationToAll('Report Approval', notificationBody);

        res.json({ success: true, message: 'Report approved successfully' });
    } catch (error) {
        next(error);
    }
};

exports.disapproveReport = async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const { comment } = req.body;


        const report = await ReportModel.findById(userId);
        if (!report) {
            return res.status(404).json({ success: false, message: 'Report not found' });
        }

        await ReportModel.findByIdAndUpdate(userId, { status: 'disapproved' });
        const user = await User.findById(report.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const emailBody = `Your report has been disapproved. Reason: ${comment}`;
        // await sendMail(user.email, 'Report Disapproval', emailBody);
        await mailTransport().sendMail({
            from: 'infoReportARoad@gmail.com',
            to: user.email,
            subject: "Your Report has been disapproved!!!",
            html: `<h1>Your report has been disapproved. Reason: ${comment}</h1>`
        });

     
        // const notificationBody = `A report has been disapproved. Reason: ${comment}`;
        // await sendNotificationToAll('all', 'Report Disapproval', notificationBody);

        res.json({ success: true, message: 'Report disapproved successfully' });
    } catch (error) {
        next(error);
    }
};

async function sendNotificationToAll(title, body) {
    try {
        const users = await User.find({}, 'userId');

        users.forEach(async (user) => {
            const userId = user.userId;
            await sendNotification(userId, title, body);
        });

        console.log('Notifications sent to all users successfully');
    } catch (error) {
        console.error('Error sending notifications:', error);
    }
}


exports.updateReport = async (req, resp, next) => {
    try {
        const { _id, userId, location, images,  desc, status } = req.body;

        if (!_id || !userId) {
            return sendError(resp, "reportID and userId are required");
        }

        const existingReport = await ReportServices.getReportById(_id);
        if (!existingReport) {
            return sendError(resp, "Report not found");
        }

        if (existingReport.userId !== userId) {
            return sendError(resp, "User is not authorized to update this report");
        }

        if (location) {
            existingReport.location = location;
        }
        if (req.file) {
            const imageUrl = await uploadImage(req.file.path);
            existingReport.image = imageUrl;
          }
     
        if (desc) {
            existingReport.desc = desc;
        }

        existingReport.status = status || "resolved";
        await existingReport.save();

        resp.json({ success: true, message: "Report updated successfully" });
    } catch (error) {
        next(error);
    }
};

exports.notifyUser = async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const { comment, imageUrl } = req.body;

        const report = await IncidentModel.findById(userId);
        if (!report) {
            return res.status(404).json({ success: false, message: 'Report not found' });
        }

        const user = await User.findById(report.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        let incidentMessage;
        let subject;
        switch(report.title) {
            case 'Accident':
                incidentMessage = 'There has been an accident reported in your area.';
                subject = '';
                break;
            case 'Burglary':
                incidentMessage = 'Your stolen item has been found please come to nearby lost and found!!!';
                subject = '';
                break;
            case 'Traffic Violation':
                incidentMessage = 'A traffic violation has been reported in your area.';
                subject = '';
                break;
            default:
                incidentMessage = 'An incident has been reported in your area.';
                subject = '';
        }

        const emailBody = `${incidentMessage} Comment: ${comment}`;
        const attachments = [{
            filename: 'image.jpg',
            path: imageUrl
        }];
        const htmlResponse = `<h1>${incidentMessage}</h1><p>Reason: ${comment}</p>`;
        
        await mailTransport().sendMail({
            from: 'infoReportARoad@gmail.com',
            to: user.email,
            subject: subject,
            html: htmlResponse
        });

        res.json({ success: true, message: 'Report approved successfully' });
    } catch (error) {
        next(error);
    }
};


exports.DeleteUser = async (req, resp) => {
    try {
        const _id = req.query.userId;
        const { comment } = req.body;

        if (!_id) {
            return resp.status(400).json({ success: false, message: 'User ID not provided' });
        }
        const user = await User.findById(_id);
        if (!user) {
            return resp.status(404).json({ success: false, message: 'User not found' });
        }
      
        const deleteUser = await User.findByIdAndDelete({ _id });
        const emailBody = `Your account has been deleted. Reason: ${comment}`;
        // await sendMail(user.email, 'Report Disapproval', emailBody);
        await mailTransport().sendMail({
            from: 'infoReportARoad@gmail.com',
            to: user.email,
            subject: "Account deletion",
            html: `<h1>Your account has been deleted. Reason: ${comment}</h1>`
        });
        resp.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error in deleting account:', error);
        resp.status(500).json({ success: false, message: 'Internal server error: ' + error.message });
    }
};

