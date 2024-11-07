import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
  const token = Cookies.get('token');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;

}, (error)=> {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !error.config._retry) {
      error .config._retry = true;
      try {
        const refreshToken = Cookies.get('refreshToken');
        const res = await api.post('/auth/refresh-token', { refreshToken});
        if (res.data.token) {
          Cookies.set('token', res.data.token, { expires: 1, secure: true, sameSite: 'Strict'});
          api.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;
          return api(error.config);
        }
      } catch (refreshToken) {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshToken);
      }
    }
    return Promise.reject(error);
  }
);

export const setAuthTOkens = (token, refreshToken) => {
  Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'strict' });
  Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, samSite: 'strict' });
};

export const ClearAuthTOkens = () => {
  Cookies.remove('token');
  Cookies.remove('refreshToken')
}

export default api;