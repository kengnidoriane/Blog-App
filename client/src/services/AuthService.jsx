// src/services/authService.js
import api, { setAuthTokens, clearAuthTokens } from './api';

export const authService = {
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    if (response.data.token && response.data.refreshToken) {
      setAuthTokens(response.data.token, response.data.refreshToken);
    }
    return response.data;
  },

  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token && response.data.refreshToken) {
      setAuthTokens(response.data.token, response.data.refreshToken);
    }
    return response.data;
  },

  logout() {
    clearAuthTokens();
    return api.post('/auth/logout');
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

};
