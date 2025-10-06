const NotificationService = require('../services/notificationService');

exports.getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const notifications = await NotificationService.getNotifications(
      req.user._id, 
      parseInt(page), 
      parseInt(limit)
    );
    
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await NotificationService.markAsRead(req.params.id, req.user._id);
    res.json({ message: 'Notification marquée comme lue' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const count = await NotificationService.getUnreadCount(req.user._id);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};