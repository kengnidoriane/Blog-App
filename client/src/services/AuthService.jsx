import api from './api';

const AuthService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async signup(name, userName, email, password, imageUrl) {
    try {
      const response = await api.post('/auth/register', { name, userName, email, password, imageUrl });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout() {
    localStorage.removeItem('token');
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  },
};

export default AuthService;
