import axios from "axios
const API_BASE = "https://rentkar-backend.vercel.app/api";
const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});
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
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error.response) {
      alert("Network error: Backend not reachable. Please try again later.");
      return Promise.reject(error);
    }
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("rentkar_admin");
      window.location.href = "/"; 
    }

    return Promise.reject(error);
  }
);

export default api;
