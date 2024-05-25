const mongoose =require('mongoose');
const dbConnection = require('../config/dbConnection');
const{Schema} = mongoose;

const notificationSchema = new Schema({
    userId: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    isRead: Boolean,
    actionType: String
});

const Notification = dbConnection.model('Notification', notificationSchema);

module.exports = Notification;
