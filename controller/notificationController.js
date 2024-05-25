
const notificationService = require('../services/notificationService');

async function createNotification(req, res) {
    const { userId, message,  actionType, isRead } = req.body;
    try {
        const notification = await notificationService.createNotification(userId, message,  actionType, isRead);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getNotifications(req, res) {
    const userId = req.query.userId;
    try {
        const notifications = await notificationService.getNotifications(userId);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function markAsRead(req, res) {
    const notificationId = req.query.notificationId;
    try {
        await notificationService.markAsRead(notificationId);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({ error: error.message });
    }
}

async function deleteNotification(req, res) {
    const notificationId = req.query.notificationId;
    try {
        await notificationService.deleteNotification(notificationId);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getNotificationCount(req, res) {
    const { userId } = req.query;
    try {
        const count = await notificationService.getNotificationCount(userId);
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createNotification,
    getNotifications,
    markAsRead,
    deleteNotification,
    getNotificationCount
};
