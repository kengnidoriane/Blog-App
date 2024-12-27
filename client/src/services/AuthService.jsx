import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user'; // Remplacez par l'URL de votre API

const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const AuthService = {
  signUp,
};

export default AuthService;
