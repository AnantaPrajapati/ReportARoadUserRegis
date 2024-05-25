
const { sendError } = require('../utils/error');
const ReportServices = require('../services/ReportServices');
const User = require('../model/UserModel');
const IncidentServices = require('../services/IncidentService');
const https = require('https');
const ReportModel = require('../model/ReportModel');
const { mailTransport } = require('../utils/mail');
const UserModel = require('../model/UserModel');
const ResourceModel = require('../model/ResourceModel');
const RatingFeedbackModel = require('../model/RatingFeedback');
const IncidentModel = require('../model/IncidentModel');
const NewsModel = require('../model/NewsModel');

exports.ManageResource = async (req, res, next) => {
    try {
       
        const id = req.query.id;
        const userId = req.query.userId;
        const { manpower, budget, time, image, statuss } = req.body;
            //   const statuss = 'Work in progress';
        if (!manpower) {
            return res.status(400).json({ success: false, message: 'Manpower is require' });
        }
        if (!budget) {
            return res.status(400).json({ success: false, message: 'Please allocate the budget' });
        }
        if (!statuss) {
            return res.status(400).json({ success: false, message: 'Please update the status' });
        }
        if (!time) {
            return res.status(400).json({ success: false, message: 'Please provide the time' });
        }
        if (req.file) {
            const image = await uploadImage(req.file.path);
          }
        const existingEntry = await ResourceModel.findOne({_id:id, userId: userId});
        if (existingEntry) {
            return res.status(400).json({ success: false, message: 'Managed' });
        }
        const user = await UserModel.findById(userId);
        if (!user) {
            return sendError(res, 'User not found');
        }

        // const report = await ReportModel.findById(reportId);
        // if (!report) {
        //     return res.status(404).json({ success: false, message: 'Report not found' });
        // }

        const ResourceManagement = new ResourceModel({
           _id:id,
           userId: userId,
            manpower: manpower,
            budget: budget,
            time: time,
            statuss: statuss,
            image: image
        });
        await mailTransport().sendMail({
            from: 'infoReportARoad@gmail.com',
            to:user.email,
            subject: "Your report has been managed",
            html: `<h1>It is assgined with ${manpower} people. THe budget is ${budget} and the time will we ${time}. Image:${image}, Satus:${statuss}</h1>`
        });
        await ResourceManagement.save();
        res.json({ success: true, message: 'Report assigned successfully' });
    } catch (error) {
        next(error);
    }
};


exports.updateResource = async (req, res) => {
    try {
        const { image, time, statuss } = req.body;
        const id = req.query.id;
        const userId = req.query.userId;
        
        const report = await ResourceModel.findById(id);
        if (!report) {
            return sendError(res, 'Report not found');
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return sendError(res, 'User not found');
        }

        const updatedResource = await ResourceModel.findOneAndUpdate(
            { _id: id },
            { image, time , statuss},
            { new: true }
        );
        await mailTransport().sendMail({
            from: 'infoReportARoad@gmail.com',
            to: user.email,
            subject: "Your assigned report has been updated",
            html: `<h1>Your report has been updated.</h1><p>Description:</p>`
        });

        res.json({ success: true, message: 'Resources updated successfully', report: updatedResource });
    } catch (error) {
        console.error('Error updating report:', error);
        sendError(res, 'Internal server error: ' + error.message);
    }
};




exports.DeleteResource = async (req, resp) => {
    try {
        const _id = req.query._id;
        const { comment } = req.body;

        if (!_id) {
            return resp.status(400).json({ success: false, message: 'Resource not found' });
        }
        // const user = await ResourceModel.findById(_id);
        // if (!user) {
        //     return resp.status(404).json({ success: false, message: 'User not found' });
        // }
      
        const deleteUResource= await ResourceModel.findByIdAndDelete(_id );
        // const emailBody = `Your account has been deleted. Reason: ${comment}`;
        // await mailTransport().sendMail({
        //     from: 'infoReportARoad@gmail.com',
        //     to: resource.email,
        //     subject: "Resource deletion",
        //     html: `<h1>Your resource has already been updated. Reason: ${comment}</h1>`
        // });
        resp.json({ success: true, message: 'Resource deleted successfully' });
    } catch (error) {
        console.error('Error in deleting account:', error);
        resp.status(500).json({ success: false, message: 'Internal server error: ' + error.message });
    }
};


exports.ResponseRating = async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const { comment } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    await mailTransport().sendMail({
        from: 'infoReportARoad@gmail.com',
        to: user.email,
        subject: "Your rating and feesback has been received",
        html: `<h1>Keep giving us rating and feedback.${comment}</h1>`
    });

        res.json({ success: true, message: 'Rating and feedback submitted successfully' });
    } catch (error) {
        next(error);
    }
};


exports.deleteRating = async (req, res, next) => {
    try {
        // console.log(req.query.id);
        const _id = req.query._id;
        const { comment } = req.body;
        let deletedData = await RatingFeedbackModel.findByIdAndDelete(_id);
        res.json({ status: true, success: deletedData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}


exports.deleteIncident = async (req, res, next) => {
    try {
        // console.log(req.query.id);
        const _id = req.query._id;
        const { comment } = req.body;
        let deletedData = await IncidentModel.findByIdAndDelete(_id);
        res.json({ status: true, success: deletedData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}



exports.DeleteNews = async (req, res, next) => {
    try {
        // console.log(req.query.id);
        const id = req.query.id;
        const { comment } = req.body;
        let deletedData = await NewsModel.findByIdAndDelete({id:_id});
        res.json({ status: true, success: deletedData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
