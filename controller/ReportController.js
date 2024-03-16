const { sendError } = require('../otp/error');
const ReportServices = require('../services/ReportServices');

exports.createReport = async (req, resp, next) => {
    try {
        const { userId, location, photo, severity, desc } = req.body;

        
        if (!userId || !location || !photo || !severity || !desc) {
            return sendError(resp, 'All fields are required');
        }

        let Report = await ReportServices.createReport(userId, location, photo, severity, desc);
        resp.json({ status: true, success: Report });
    } catch (error) {
        next(error);
    }
};
