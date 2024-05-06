// const { IncidentReport } = require('../controller/ReportController');
const IncidentModel = require('../model/IncidentModel');
// const ReportModel = require('../model/ReportModel');
// const UserModel = require('../model/UserModel');

class IncidentServices{

    static async createReport(userId, location, image, title, desc, contentType){
        const IncidentReport = new IncidentModel({userId, location, image, title, desc, contentType});
        return await IncidentReport.save();
    }
    static async getIncidentReport(userId){
        const report = await IncidentModel.find({userId})
        return report;
    }
}
module.exports = IncidentServices;
