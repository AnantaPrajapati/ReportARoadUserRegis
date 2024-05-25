// const { IncidentReport } = require('../controller/ReportController');
const IncidentModel = require('../model/IncidentModel');
// const ReportModel = require('../model/ReportModel');
// const UserModel = require('../model/UserModel');

class IncidentServices{

    static async createReport(userId, location, image, title, desc, time){
        const IncidentReport = new IncidentModel({userId, location, image, title, desc, time});
        return await IncidentReport.save();
    }
    static async getIncidentReport(userId){
        const query = userId ? { userId } : {};
        const report = await IncidentModel.find(query);
        return report;
    }
    // static calculateDistance(lat1, lon1, lat2, lon2) {
    //     const R = 6371; // Earth's radius in kilometers
    //     const dLat = IncidentServices.toRadians(lat2 - lat1);
    //     const dLon = IncidentServices.toRadians(lon2 - lon1);
    //     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //               Math.cos(IncidentServices.toRadians(lat1)) * Math.cos(IncidentServices.toRadians(lat2)) *
    //               Math.sin(dLon / 2) * Math.sin(dLon / 2);
    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //     const distance = R * c; // Distance in kilometers
    //     return distance;
    // }
    
    // // Static method to convert degrees to radians
    // static toRadians(degrees) {
    //     return degrees * Math.PI / 180;
    // }
}
module.exports = IncidentServices;
