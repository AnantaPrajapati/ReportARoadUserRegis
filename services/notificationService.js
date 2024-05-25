
const notificationModel = require('../model/notificationModel');

async function createNotification(userId, message, actionType, isRead) {
    const newNotification = new notificationModel({
        userId,
        message,
        isRead,
        actionType
    });
    return await newNotification.save();
}

async function getNotifications(userId) {
    return await notificationModel.find({ userId });
}

async function markAsRead(notificationId) {
    return await notificationModel.findByIdAndUpdate(notificationId, { isRead: true });
}

async function deleteNotification(notificationId) {
    return await notificationModel.findByIdAndDelete(notificationId);
}

async function getNotificationCount(userId) {
    return await notificationModel.countDocuments({ userId });
}

module.exports = {
    createNotification,
    getNotifications,
    markAsRead,
    deleteNotification,
    getNotificationCount
};
