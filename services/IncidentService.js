// const { IncidentReport } = require('../controller/ReportController');
const IncidentModel = require('../model/IncidentModel');
// const ReportModel = require('../model/ReportModel');
// const UserModel = require('../model/UserModel');

class IncidentServices{

    static async createReport(email, location, image, title, desc, contentType){
        const IncidentReport = new IncidentModel({email, location, image, title, desc, contentType});
        return await IncidentReport.save();
    }
    static async getReport(email){
        const incident = await IncidentModel.find({email})
        return incident;
    }
}
module.exports = IncidentServices;
