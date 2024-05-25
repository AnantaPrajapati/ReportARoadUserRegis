
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
        // let users = await UserModel.find({});
        let users = await ReportServices.sendAllNews(null); 
    
        for (let user of users) {
            try {
                await mailTransport().sendMail({
                    from: 'infoReportARoad@gmail.com',
                    to: user.email,
                    subject: "New News Report Published",
                    html: `<h1>A new news report has been published</h1><p>Title: ${title}</p><p>Description: ${desc}</p><p>Location: ${location}</p>`
                });
            } catch (error) {
                console.error(`Failed to send email to ${user.email}: ${error.message}`);
            }
        }

        resp.json({ status: true, news: News});
        
        
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

        await IncidentModel.findByIdAndDelete(userId);
        
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


exports.updateReport = async (req, res) => {
    try {
        const { images, desc } = req.body;
        const id = req.query.id;
        const userId =req.query.userId;

        // Find the report by ID to get the user ID
        const report = await ReportModel.findById(id);
        if (!report) {
            return sendError(res, 'Report not found');
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return sendError(res, 'User not found');
        }

        const status = "resolved";
        const updatedReport = await ReportModel.findOneAndUpdate(
            { _id: id },
            { images, desc, status },
            { new: true }
        );

        // const emailBody = `Your report has been updated.`;
        await mailTransport().sendMail({
            from: 'infoReportARoad@gmail.com',
            to: user.email,
            subject: "Your report has been updated",
            html: `<h1>Please check your application for more detail.</h1><p>Description: ${desc}</p>`
        });

        res.json({ success: true, message: 'Report updated successfully', report: updatedReport });
    } catch (error) {
        console.error('Error updating report:', error);
        sendError(res, 'Internal server error: ' + error.message);
    }
};

exports.notifyUser = async (req, res, next) => {
    try {
        const _id = req.query._id;
        const userId = req.query.userId;
        const { comment, image } = req.body;

        const report = await IncidentModel.findById(_id);
        if (!report) {
            return res.status(404).json({ success: false, message: 'Report not found' });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return sendError(res, 'User not found');
        }

        let incidentMessage;
        let subject;
        switch(report.title) {
            case 'Accident':
                incidentMessage = 'There has been an accident reported in your area.';
                subject = `There is a accident ${comment} : image ${image}`;
                break;
            case 'Burglary':
                incidentMessage = 'Your stolen item has been found please come to nearby lost and found!!!';
                subject = `There is a accident ${comment} : image ${image}`;;
                break;
            case 'Traffic Violation':
                incidentMessage = 'A traffic violation has been reported in your area.';
                subject = `There is a accident ${comment} : image ${image}`;;
                break;
            default:
                incidentMessage = 'An incident has been reported in your area.';
                subject = `There is a accident ${comment} : image ${image}`;;
        }

        const emailBody = `${incidentMessage} Comment: ${comment}`;
        const attachments = [{
            filename: 'image.jpg',
            path: image
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





