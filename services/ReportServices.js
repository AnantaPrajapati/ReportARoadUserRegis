// const { IncidentReport } = require('../controller/ReportController');
// // const IncidentModel = require('../model/IncidentModel');
const ReportModel = require('../model/ReportModel');
// const UserModel = require('../model/UserModel');

class ReportServices{

    static async createReport(userId, location, image, severity, desc){
        const createReport = new ReportModel({userId, location, image, severity, desc});
        return await createReport.save();
    }
    static async getReport(userId){
        const report = await ReportModel.find({userId})
        return report;
    }
    static async deleteReport(email){
        const deleted = await ReportModel.findOneAndDelete({email})
        return deleted;
   }
}


module.exports = ReportServices;


// const ReportModel = require('../model/ReportModel');

// class ReportServices{

//     static async createReport( image, contentType){
//         const createReport = new ReportModel({image, contentType});
//         return await createReport.save();

//     }
// }

// module.exports = ReportServices;