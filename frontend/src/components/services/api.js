// frontend/src/services/api.js
import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

// Add a request interceptor to include the access token in the headers
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); // Assuming you stored the token in localStorage
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;