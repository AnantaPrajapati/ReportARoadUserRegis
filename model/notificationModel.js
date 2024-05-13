const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    isRead: Boolean,
    relatedOrderId: String,
    actionType: String
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
