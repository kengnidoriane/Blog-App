import { create } from 'zustand';

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  socket: null,

  setSocket: (socket) => set({ socket }),

  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications],
    unreadCount: state.unreadCount + 1
  })),

  markAsRead: (notificationId) => set((state) => ({
    notifications: state.notifications.map(notif => 
      notif._id === notificationId ? { ...notif, read: true } : notif
    ),
    unreadCount: Math.max(0, state.unreadCount - 1)
  })),

  setNotifications: (notifications) => set({ notifications }),
  
  setUnreadCount: (count) => set({ unreadCount: count }),

  clearNotifications: () => set({ 
    notifications: [], 
    unreadCount: 0,
    socket: null 
  })
}));