// const { IncidentReport } = require('../controller/ReportController');
// // const IncidentModel = require('../model/IncidentModel');
const RatingFeedbackModel = require('../model/RatingFeedback');
const ReportModel = require('../model/ReportModel');
const NewsModel = require('../model/NewsModel');
const IncidentModel = require('../model/IncidentModel');
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
    static async resolvedReport(userId, status = 'resolved'){
        const report = await ReportModel.find({userId, status })
        return report;
    }
    static async deleteReport(id){
        const deleted = await ReportModel.findByIdAndDelete({_id:id})
        return deleted;
   }


   
   static async getAllIncidentReport(location, latitude, longitude) {
    // Log the received latitude and longitude
    console.log('Received Latitude:', latitude);
    console.log('Received Longitude:', longitude);

    // Convert latitude and longitude to numbers
    const userLatitude = parseFloat(latitude);
    const userLongitude = parseFloat(longitude);

    if (isNaN(userLatitude) || isNaN(userLongitude)) {
        throw new Error('Invalid latitude or longitude values');
    }

    // Log the parsed latitude and longitude
    console.log('Parsed Latitude:', userLatitude);
    console.log('Parsed Longitude:', userLongitude);

    // Define the radius within which to search for incident reports (in kilometers)
    const radius = 5; // Change this value as needed

    // Calculate the bounding box for the search area
    const earthRadius = 6371; // Earth radius in kilometers
    const latDelta = radius / earthRadius;
    const lonDelta = radius / (earthRadius * Math.cos((userLatitude * Math.PI) / 180));

    // Log the calculated latitude and longitude deltas
    console.log('Latitude Delta:', latDelta);
    console.log('Longitude Delta:', lonDelta);

    // Extract latitude and longitude values from the location string
    const locationRegex = /\(([^,]+),\s*([^)]+)\)/;
    const match = location.match(locationRegex);
    if (!match || match.length < 3) {
        throw new Error('Invalid location format');
    }
    const reportLatitude = parseFloat(match[1]);
    const reportLongitude = parseFloat(match[2]);

    // Log the extracted latitude and longitude values
    console.log('Report Latitude:', reportLatitude);
    console.log('Report Longitude:', reportLongitude);

    // Define the bounding box coordinates
    const minLat = userLatitude - latDelta;
    const maxLat = userLatitude + latDelta;
    const minLon = userLongitude - lonDelta;
    const maxLon = userLongitude + lonDelta;

    // Construct the query to find incident reports within the bounding box
    const query = {
        location: {
            $geoWithin: {
                $box: [[minLon, minLat], [maxLon, maxLat]]
            }
        }
    };

    // Query the database to find incident reports within the bounding box
    const news = await IncidentModel.find(query);

    return news;
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
}

module.exports = ReportServices;
