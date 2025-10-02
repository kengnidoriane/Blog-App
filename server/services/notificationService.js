const Notification = require('../models/Notification');

class NotificationService {
  static async createNotification(data) {
    try {
      const notification = new Notification(data);
      await notification.save();
      await notification.populate(['sender', 'recipient'], 'name username');
      return notification;
    } catch (error) {
      console.error('Erreur création notification:', error);
      throw error;
    }
  }

  static async getNotifications(userId, page = 1, limit = 20) {
    try {
      const notifications = await Notification.find({ recipient: userId })
        .populate('sender', 'name username')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      
      return notifications;
    } catch (error) {
      console.error('Erreur récupération notifications:', error);
      throw error;
    }
  }

  static async markAsRead(notificationId, userId) {
    try {
      await Notification.findOneAndUpdate(
        { _id: notificationId, recipient: userId },
        { read: true }
      );
    } catch (error) {
      console.error('Erreur marquage notification:', error);
      throw error;
    }
  }

  static async getUnreadCount(userId) {
    try {
      return await Notification.countDocuments({ 
        recipient: userId, 
        read: false 
      });
    } catch (error) {
      console.error('Erreur comptage notifications:', error);
      return 0;
    }
  }
}

module.exports = NotificationService;