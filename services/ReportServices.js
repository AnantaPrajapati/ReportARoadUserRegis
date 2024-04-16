const { IncidentReport } = require('../controller/ReportController');
const IncidentModel = require('../model/IncidentModel');
const ReportModel = require('../model/ReportModel');
const UserModel = require('../model/UserModel');

class ReportServices{

    static async createReport(email, location, image, severity, desc, contentType){
        const createReport = new ReportModel({email, location, image, severity, desc, contentType});
        return await createReport.save();
    }
    static async getReport(email){
        const report = await ReportModel.find({email})
        return report;
    }
}

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


// const ReportModel = require('../model/ReportModel');

// class ReportServices{

//     static async createReport( image, contentType){
//         const createReport = new ReportModel({image, contentType});
//         return await createReport.save();

//     }
// }

// module.exports = ReportServices;