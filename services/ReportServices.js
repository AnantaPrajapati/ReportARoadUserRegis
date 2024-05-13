// const { IncidentReport } = require('../controller/ReportController');
// // const IncidentModel = require('../model/IncidentModel');
const RatingFeedbackModel = require('../model/RatingFeedback');
const ReportModel = require('../model/ReportModel');
const NewsModel = require('../model/NewsModel');
const IncidentModel = require('../model/IncidentModel');
const IncidentService = require('../services/IncidentService'); // Adjust the path as needed

// const UserModel = require('../model/UserModel');

class ReportServices{

    static async createReport(userId, location, images, severity, desc, status){
        const createReport = new ReportModel({userId, location, images, severity, desc, status});
        return await createReport.save();
    }
    static async getReport(userId, status = 'pending'){
        const report = await ReportModel.find({userId, status })
        return report;
    }
    static async resolvedReport(userId, status = 'resolved'){
        const report = await ReportModel.find({userId, status })
        return report;
    }
    static async deleteReport(id){
        const deleted = await ReportModel.findByIdAndDelete({_id:id})
        return deleted;
   }
   static async getReportHistory(userId) {
    const reportQuery = userId ? { userId } : {};
    const incidentQuery = userId ? { userId } : {};

    const reports = await ReportModel.find(reportQuery).select('-_id').lean();
    const incidents = await IncidentModel.find(incidentQuery).select('-_id').lean();
    reports.forEach(report => {
        report.modelSection = 'Report';
    });

    incidents.forEach(incident => {
        incident.modelSection = 'Incident';
    });

    return { reports, incidents };
}


   
static async getReportsNearLocation(latitude, longitude) {
    try {
      const radius = 5; // Radius in kilometers

      // Fetch all incident reports
      const allReports = await IncidentModel.find({}, 'location');

      console.log(latitude);
      console.log(longitude);

      // Filter reports within the specified radius of the user's location
      const reportsWithinRadius = allReports.filter(report => {
        // Extract latitude and longitude from the location string using regular expressions
        const locationRegex = /\(([^,]+),\s*([^)]+)\)/;
        const match = report.location.match(locationRegex);
        if (match && match.length >= 3) {
          const reportLatitude = parseFloat(match[1]);
          const reportLongitude = parseFloat(match[2]);

          // Calculate distance between user's location and report's location using Haversine formula
          const distance = IncidentService.calculateDistance(latitude, longitude, reportLatitude, reportLongitude);
          
          // Check if the distance is within the radius
          return distance <= radius;
        } else {
          // Handle case where location format is invalid
          return false;
        }
      });

      return reportsWithinRadius;
    } catch (error) {
      console.error('Error fetching incident reports:', error);
      throw new Error('Failed to fetch incident reports');
    }
}

//  static async createRatingFeedback(reportId, userId, rating, feedback) {
//     const ratingFeedback = new RatingFeedbackModel({
//         userId: userId,
//         Rating: rating,
//         feedback: feedback
//     });
//     return await ratingFeedback.save();
// }


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


    //for government official
    static async createNews(title, location, image, desc){
        const createNews = new NewsModel({title, location, image, desc});
        return await createNews.save();
    }   
    static async getNews(_id) {
        const query = _id ? { _id } : {};
        const news = await NewsModel.find(query);
        return news;
    }
//     static async govReport( city ){
//         try {
//             const reports = await Report.find({ city });
//             return reports;
//         } catch (error) {
//             throw error;
//         }
// }
}

module.exports = ReportServices;
