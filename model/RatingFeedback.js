const mongoose = require('mongoose');
const { Schema } = mongoose;
const dbConnection = require('../config/dbConnection');
const ReportModel = require('../model/ReportModel');

const RatingFeedbackSchema = new Schema({
    reportId: {
        type: Schema.Types.ObjectId,
        ref: 'Report',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Rating: {
        type: Number,
     
     
    },
    feedback: String
}, { timestamps: true });

const RatingFeedbackModel = dbConnection.model('RatingFeedback',RatingFeedbackSchema);

module.exports = RatingFeedbackModel;