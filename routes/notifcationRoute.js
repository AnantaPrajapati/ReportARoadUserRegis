const router = require('express').Router();
const notificationController = require('../controller/notificationController');

router.post('/createNotification', notificationController.createNotification);
router.get('/getNotifications', notificationController.getNotifications);
router.put('/markAsRead', notificationController.markAsRead);
router.post('/deleteNotification', notificationController.deleteNotification);
router.get('/getNotificationCount', notificationController.getNotificationCount);

module.exports = router;
