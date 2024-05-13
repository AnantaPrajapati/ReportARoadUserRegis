const express = require('express');
const router = express.Router();
const notificationController = require('./notificationController');

router.post('/create', notificationController.createNotification);
router.get('/user', notificationController.getNotifications);
router.put('/mark-as-read/:notificationId', notificationController.markAsRead);
router.delete('/delete/:notificationId', notificationController.deleteNotification);
router.get('/user/count', notificationController.getNotificationCount);

module.exports = router;
