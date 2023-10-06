import axios from 'axios';


const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Replace with your FastAPI server URL
});

// Automatically add JWT token to headers if available
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;

// Axios Configuration - src/utils/axiosConfig.ts
// This file will contain the base configuration for Axios, which we'll use for making API calls to the FastAPI backend.
// Explanation
// We're using Axios to create an instance with a base URL. This URL is the address of your FastAPI server.
// We'll use this Axios instance for all the API calls.