const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const notificationController = require('../controllers/notificationController');

router.get('/', protect, notificationController.getNotifications);
router.put('/:id/read', protect, notificationController.markAsRead);
router.get('/unread-count', protect, notificationController.getUnreadCount);

module.exports = router;