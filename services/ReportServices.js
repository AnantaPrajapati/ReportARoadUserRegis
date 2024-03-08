const ReportModel = require('../model/ReportModel');

class ReportServices{

    static async createReport(userId, location, photo, severity, desc){
        const createReport = new ReportModel({userId, location, photo, severity, desc});
        return await createReport.save();

    }
}

module.exports = ReportServices;