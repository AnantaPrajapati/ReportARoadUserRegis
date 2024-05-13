const Notification = require('./notificationModel');

async function createNotification(userId, message, relatedOrderId, actionType, isRead) {
    const newNotification = new Notification({
        userId,
        message,
        isRead,
        relatedOrderId,
        actionType
    });
    return await newNotification.save();
}

async function getNotifications(userId) {
    return await Notification.find({ userId });
}

async function markAsRead(notificationId) {
    return await Notification.findByIdAndUpdate(notificationId, { isRead: true });
}

async function deleteNotification(notificationId) {
    return await Notification.findByIdAndDelete(notificationId);
}

async function getNotificationCount(userId) {
    return await Notification.countDocuments({ userId });
}

module.exports = {
    createNotification,
    getNotifications,
    markAsRead,
    deleteNotification,
    getNotificationCount
};
