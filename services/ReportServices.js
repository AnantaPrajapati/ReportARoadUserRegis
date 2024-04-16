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

module.exports = ReportServices;


// const ReportModel = require('../model/ReportModel');

// class ReportServices{

//     static async createReport( image, contentType){
//         const createReport = new ReportModel({image, contentType});
//         return await createReport.save();

//     }
// }

// module.exports = ReportServices;