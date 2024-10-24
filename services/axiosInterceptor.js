// src/services/api.js
import axios from 'axios';
import useTokenStore from '@/stores/tokenStore';

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER_URL, // Base URL for your backend
});

// Add a request interceptor to include the Authorization token
api.interceptors.request.use(
  (config) => {
    const token = useTokenStore.getState().token; // Access the token from Zustand
    if (token) {
      config.headers['Authorization'] = token; // Add the token to the request headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle errors
  }
);

export default api;
