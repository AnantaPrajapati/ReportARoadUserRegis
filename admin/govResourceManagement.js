
const { sendError } = require('../utils/error');
const ReportServices = require('../services/ReportServices');
const User = require('../model/UserModel');
const IncidentServices = require('../services/IncidentService');
const https = require('https');
const ReportModel = require('../model/ReportModel');
const { mailTransport } = require('../utils/mail');
const UserModel = require('../model/UserModel');
const ResourceModel = require('../model/ResourceModel');

exports.ManageResource = async (req, res, next) => {
    try {
        const reportId = req.query.reportId;
        const userId = req.query.userId;
        const { manpower, budget, time, images } = req.body;
              const status = 'Work in progress';
        if (!manpower) {
            return res.status(400).json({ success: false, message: 'Manpower is require' });
        }
        if (!budget) {
            return res.status(400).json({ success: false, message: 'Please allocate the budget' });
        }
        if (!status) {
            return res.status(400).json({ success: false, message: 'Please update the status' });
        }
        if (!time) {
            return res.status(400).json({ success: false, message: 'Please provide the time' });
        }
        if (req.file) {
            const image = await uploadImage(req.file.path);
          }
        const existingEntry = await ResourceModel.findOne({ userId: userId, reportId: reportId });
        if (existingEntry) {
            return res.status(400).json({ success: false, message: 'Managed' });
        }

        const report = await ReportModel.findById(reportId);
        if (!report) {
            return res.status(404).json({ success: false, message: 'Report not found' });
        }

        const ResourceManagement = new ResourceModel({
            reportId: reportId,
            userId: userId,
            manpower: manpower,
            budget: budget,
            time: time,
            images: images
        });
        await ResourceManagement.save();

        res.json({ success: true, message: 'Rating and feedback submitted successfully' });
    } catch (error) {
        next(error);
    }
};