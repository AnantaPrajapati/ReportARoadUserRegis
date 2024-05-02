
const { sendError } = require('../utils/error');
const ReportServices = require('../services/ReportServices');
const User = require('../model/UserModel');
const IncidentServices = require('../services/IncidentService');
const https = require('https');
const ReportModel = require('../model/ReportModel');
const { mailTransport } = require('../utils/mail');



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
        const { _id, userId, location, image, severity, desc, status } = req.body;

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
        if (severity) {
            existingReport.severity = severity;
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
