const mongoose = require('mongoose');
const { Schema } = mongoose;
const dbConnection = require('../config/dbConnection');
const ReportModel = require('../model/ReportModel');

const RatingFeedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    Rating: {
        type: Number,
        min: 0,
        max: 5
    },
    feedback: String
}, { timestamps: true });

const RatingFeedbackModel = dbConnection.model('RatingFeedback',RatingFeedbackSchema);

module.exports = RatingFeedbackModel;