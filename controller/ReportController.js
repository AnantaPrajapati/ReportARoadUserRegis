
const { sendError } = require('../utils/error');
const ReportServices = require('../services/ReportServices');
const User = require('../model/UserModel');
const IncidentServices = require('../services/IncidentService');
const https = require('https');
const ReportModel = require('../model/ReportModel');
const { mailTransport } = require('../utils/mail');
const RatingFeedbackModel = require('../model/RatingFeedback');
// const {sendNotification}= require('../controller/ReportController');

exports.createReport = async (req, resp, next) => {
    try {
        const { userId, location, images, severity, desc } = req.body;

        // const user= await User.findOne({ email: email });
        // if (!user) {
        //     return sendError(resp, "User doesn't exitst");
        // }

        if (!location) {
            return sendError(resp, "Please enter the location");
        }
        if (!images || images.length === 0) {
            return sendError(resp, "Please upload at least one image");
        }
        if (!severity) {
            return sendError(resp, "Please mention the severity");
        }
        if (!desc) {
            return sendError(resp, 'Fill up the description');
        }
        const reportStatus = "pending";

        let Report = await ReportServices.createReport(userId, location, images, severity, desc, reportStatus);
        resp.json({ status: true, });
    } catch (error) {
        next(error);
    }
};
exports.IncidentReport = async (req, resp, next) => {
    try {
        const { userId, location, image, title, desc } = req.body;

        // const user= await User.findOne({ email: email });
        // if (!user) {
        //     return sendError(resp, "User doesn't exitst");
        // }

        if (!location) {
            return sendError(resp, "Please enter the location");
        }
        if (!image) {
            return sendError(resp, "Image dosen't exist");
        }
        if (!title) {
            return sendError(resp, "Please mention the severity");
        }
        if (!desc) {
            return sendError(resp, 'Fill up the description');
        }
        const reportStatus = "pending";

        let Report = await IncidentServices.createReport(userId, location, image, title, desc);
        resp.json({ status: true, });
    } catch (error) {
        next(error);
    }
};
exports.getIncidentReport = async (req, resp, next) => {
    try {
        let report = await IncidentServices.getIncidentReport(null);
        resp.json({ status: true, success: report });
    } catch (error) {
        next(error);
    }
};
exports.getAllIncidentReport = async (req, res, next) => {

    try {
        const { location, latitude, longitude } = req.query;
        const news = await ReportServices.getReportsNearLocation(location, latitude, longitude);
        console.log(location);
        res.json({ success: true, news });
    } catch (error) {
        next(error);
    }
};
exports.getReport = async (req, resp, next) => {
    try {
        const userId = req.query.userId;
        const statuses = ['pending', 'approved', 'disapproved'];
        let report = await ReportServices.getReport(userId, statuses);
        resp.json({ status: true, success: report });
    } catch (error) {
        next(error);
    }
};
exports.getReportHistory = async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const reports = await ReportServices.getReportHistory(userId); 
        if (reports && reports.length === 0) {
            return res.status(404).json({ success: false, error: "User has not reported any incidents." });
        }
        res.json({ success: true, reports });
    } catch (error) {
        sendError(error);
    }
};
exports.resolvedReport = async (req, resp, next) => {
    try {
        const userId = req.query.userId;
        const statuses = ['resolved'];
        let report = await ReportServices.resolvedReport(userId, statuses);
        resp.json({ status: true, success: report });
    } catch (error) {
        next(error);
    }
};


exports.deleteReport = async (req, res, next) => {
    try {
        console.log(req.query.id);
        const { id } = req.body;
        let deletedData = await ReportServices.deleteReport(id);
        res.json({ status: true, success: deletedData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getNews = async (req, res, next) => {
    try {
        const news = await ReportServices.getNews(null); 
        res.json({ success: true, news });
    } catch (error) {
        sendError(error);
    }
};

exports.ratingFeedback = async (req, res, next) => {
    try {
        const reportId = req.query.reportId;
        const userId = req.query.userId;
        const { rating, feedback } = req.body;

        if (rating < 0 || rating > 5) {
            return res.status(400).json({ success: false, message: 'Rating must be between 0 and 5' });
        }

        const existingEntry = await RatingFeedbackModel.findOne({ userId: userId, reportId: reportId });
        if (existingEntry) {
            return res.status(400).json({ success: false, message: 'You have already submitted a rating and feedback for this report' });
        }

        const report = await ReportModel.findById(reportId);
        if (!report) {
            return res.status(404).json({ success: false, message: 'Report not found' });
        }

        const ratingFeedback = new RatingFeedbackModel({
            reportId: reportId,
            userId: userId,
            Rating: rating,
            feedback: feedback
        });
        await ratingFeedback.save();

        res.json({ success: true, message: 'Rating and feedback submitted successfully' });
    } catch (error) {
        next(error);
    }
};
