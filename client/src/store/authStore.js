import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (userData) => {
        console.log('Login userData:', userData);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData));
        set({
          user: userData,
          token: userData.token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        set({ user: userData });
      },

      clearStorage: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('auth-storage');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      refreshUserProfile: async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;
          
          const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.ok) {
            const userData = await response.json();
            set({ user: userData });
            localStorage.setItem('user', JSON.stringify(userData));
          }
        } catch (error) {
          console.error('Erreur refresh profil:', error);
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);