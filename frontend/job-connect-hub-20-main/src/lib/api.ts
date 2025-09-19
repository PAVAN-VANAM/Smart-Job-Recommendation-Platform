import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/users/login', { email, password }),
  
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: 'ROLE_USER' | 'ROLE_RECRUITER';
  }) => api.post('/users/register', userData),
};

// Profile API calls
export const profileAPI = {
  getProfile: (userId: string) => api.get(`/profiles/${userId}`),
  createProfile: (profileData: any) => api.post('/profiles', profileData),
  updateProfile: (id: string, profileData: any) => api.put(`/profiles/${id}`, profileData),
};

// Jobs API calls
export const jobsAPI = {
  getAllJobs: (filters?: any) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
    }
    return api.get(`/jobs?${params.toString()}`);
  },
  
  getRecommendations: (userId: string, filters?: any) => {
    const params = new URLSearchParams();
    params.append('userId', userId);
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
    }
    return api.get(`/jobs/recommendations?${params.toString()}`);
  },
  
  createJob: (jobData: any) => api.post('/jobs', jobData),
  updateJob: (id: string, jobData: any) => api.put(`/jobs/${id}`, jobData),
  deleteJob: (id: string) => api.delete(`/jobs/${id}`),
};