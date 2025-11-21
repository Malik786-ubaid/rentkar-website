// src/api/axios.js
import axios from "axios";

// Backend base URL
const API_BASE = "https://rentkar-backend.vercel.app/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000, // 15 seconds timeout
});

// Request interceptor: add token if present
api.interceptors.request.use(
  (config) => {
    const saved = localStorage.getItem("rentkar_admin");
    if (saved) {
      try {
        const user = JSON.parse(saved);
        if (user && user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (err) {
        console.error("Error parsing rentkar_admin from localStorage", err);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle auth errors globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Network or server unavailable
    if (!error.response) {
      alert("Network error: Backend not reachable. Please try again later.");
      return Promise.reject(error);
    }

    // Unauthorized or forbidden
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("rentkar_admin");
      window.location.href = "/"; // redirect to login
    }

    return Promise.reject(error);
  }
);

export default api;
