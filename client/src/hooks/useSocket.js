import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';

export const useSocket = () => {
  const { token, isAuthenticated } = useAuthStore();
  const { setSocket, addNotification } = useNotificationStore();

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const socket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000', {
      auth: { token }
    });

    socket.on('connect', () => {
      console.log('Connecté au serveur WebSocket');
      setSocket(socket);
    });

    socket.on('newNotification', (notification) => {
      addNotification(notification);
    });

    socket.on('disconnect', () => {
      console.log('Déconnecté du serveur WebSocket');
    });

    return () => {
      socket.disconnect();
      setSocket(null);
    };
  }, [isAuthenticated, token, setSocket, addNotification]);
};