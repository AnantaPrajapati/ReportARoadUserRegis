
const { sendError } = require('../utils/error');
const ReportServices = require('../services/ReportServices');
const User = require('../model/UserModel');
const IncidentServices = require('../services/IncidentService');
const https = require('https');
const ReportModel = require('../model/ReportModel');
const { mailTransport } = require('../utils/mail');
// const {sendNotification}= require('../controller/ReportController');

exports.createReport = async (req, resp, next) => {
    try {
        const { userId, location, image, severity, desc } = req.body;

        // const user= await User.findOne({ email: email });
        // if (!user) {
        //     return sendError(resp, "User doesn't exitst");
        // }

        if(!location){
            return sendError(resp, "Please enter the location");
        } 
        if(!image){
            return sendError(resp, "Image dosen't exist");
        } 
        if(!severity ){
            return sendError(resp, "Please mention the severity");
        } 
        if( !desc) {
            return sendError(resp, 'Fill up the description');
        }
        const reportStatus = "pending";

        let Report = await ReportServices.createReport(userId, location, image, severity, desc,reportStatus);
        resp.json({ status: true, });
    } catch (error) {
        next(error);
    }
};
exports.getReport = async (req, resp, next) => {
    try {
        
        const userId = req.query.userId;
        const statuses = ['pending', 'approved', 'disapproved'];
        let report = await ReportServices.getReport(userId, statuses);
        resp.json({ status: true, success:report });
    } catch (error) {
        next(error);
    }
};


exports.deleteReport =  async (req,res,next)=>{
    try {
        console.log(req.query.id);
        const { id } = req.body;
        let deletedData = await ReportServices.deleteReport(id);
        res.json({status: true,success:deletedData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
exports.IncidentReport = async (req, resp, next) => {
    try {
        const { email, location, image, title, desc } = req.body;

        const user= await User.findOne({ email: email });
        if (!user) {
            return sendError(resp, "User doesn't exitst");
        }

        if(!location){
            return sendError(resp, "Please enter the location");
        } 
        if(!image){
            return sendError(resp, "Image dosen't exist");
        } 
        if(!title ){
            return sendError(resp, "Please mention the severity");
        } 
        if( !desc) {
            return sendError(resp, 'Fill up the description');
        }

        let Report = await IncidentServices.createReport(email, location, image, title, desc);
        resp.json({ status: true, });
    } catch (error) {
        next(error);
    }
};


exports.getNearbyHospitals = async (req, resp, next) => {
    try {
        // Extract query parameters from the request
        // const { location, radius, keyword, type } = req.query;

        // Ensure required parameters are provided
        // if (!location) {
        //     return sendError(resp, "Please provide the location");
        // }

        // Construct the path for the API endpoint with query parameters
        const path = `/nearbysearch/json?location=27.717245%2C85.323959&radius=1500&keyword=School&type=School`;

        // Options for the HTTP GET request
        const options = {
            method: 'GET',
            hostname: 'map-places.p.rapidapi.com',
            port: null,
            path: path,
            headers: {
                'X-RapidAPI-Key': 'b0cef6cf54mshda03fe8a676295ep1c8383jsnc5b8ff8108d3', 
                'X-RapidAPI-Host': 'map-places.p.rapidapi.com'
            }
        };

    
        const req = https.request(options, function (res) {
            const chunks = [];

            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on('end', function () {
                const body = Buffer.concat(chunks); 
                resp.json(JSON.parse(body.toString()));
            });
        });

        req.end(); 
    } catch (error) {
        next(error); 
    }
};




