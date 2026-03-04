import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get("/dashboard/stats"),
  getWeeklyLogins: () => api.get("/dashboard/logins/weekly"),
  getMonthlyLogins: () => api.get("/dashboard/logins/monthly"),
  getOnlineUsers: () => api.get("/dashboard/online-users"),
  getRecentEvents: () => api.get("/dashboard/events/recent")
};

// Users API
export const usersAPI = {
  getAll: () => api.get("/users"),
  getById: (id) => api.get(`/users/${id}`),
  create: (userData) => api.post("/users", userData),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
  getByRole: (role) => api.get(`/users?role=${role}`)
};

// Reports API
export const reportsAPI = {
  getAll: () => api.get("/reports"),
  getById: (id) => api.get(`/reports/${id}`),
  create: (reportData) => api.post("/reports", reportData),
  update: (id, reportData) => api.put(`/reports/${id}`, reportData),
  delete: (id) => api.delete(`/reports/${id}`),
  getByType: (type) => api.get(`/reports?type=${type}`)
};

// Events API
export const eventsAPI = {
  getAll: () => api.get("/events"),
  getById: (id) => api.get(`/events/${id}`),
  create: (eventData) => api.post("/events", eventData),
  update: (id, eventData) => api.put(`/events/${id}`, eventData),
  delete: (id) => api.delete(`/events/${id}`),
  getUpcoming: () => api.get("/events?upcoming=true")
};

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  logout: () => api.post("/auth/logout"),
  refreshToken: () => api.post("/auth/refresh"),
  getProfile: () => api.get("/auth/profile")
};

export default api;
