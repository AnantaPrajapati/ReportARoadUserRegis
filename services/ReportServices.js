// const { IncidentReport } = require('../controller/ReportController');
// // const IncidentModel = require('../model/IncidentModel');
const ReportModel = require('../model/ReportModel');
// const UserModel = require('../model/UserModel');

class ReportServices{

    static async createReport(userId, location, image, severity, desc, status){
        const createReport = new ReportModel({userId, location, image, severity, desc, status});
        return await createReport.save();
    }
    static async getReport(userId, status = 'pending'){
        const report = await ReportModel.find({userId, status })
        return report;
    }
    static async deleteReport(id){
        const deleted = await ReportModel.findByIdAndDelete({_id:id})
        return deleted;
   }


   //for admin
    static async getAllReports(userId) {
        const query = userId ? { userId } : {};
        const reports = await ReportModel.find(query);
        return reports;
    }
    static async getReportById(_id) {
        const report = await ReportModel.findById(_id);
        return report;
    }
    static async getApprovedReports(userId) {
        const query = { status: 'approved' };
        const approvedReports = await ReportModel.find(query);
        return approvedReports;
    }
    static async approveReport(userId, status= 'approved') {
        const query = userId ? { userId } : {};
        const reports = await ReportModel.find(userId, status);
        return reports;
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