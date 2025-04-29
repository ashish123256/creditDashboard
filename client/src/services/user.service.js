import axios from 'axios';
import { API_URL } from '../baseUrl';



// Create axios instance with common headers
const api = axios.create({
  baseURL: API_URL,
});

// Set up request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const usersService = {
  /**
   * Get all users (admin only)
   * @returns {Promise<Array>} Array of user objects
   */
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  /**
   * Get user by ID (admin only)
   * @param {string} userId - ID of the user to fetch
   * @returns {Promise<Object>} User object
   */
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },

  /**
   * Get user activity data (admin only)
   * @param {string} userId - ID of the user to fetch activity for
   * @returns {Promise<Object>} User activity data
   */
  getUserActivity: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/activity`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user activity');
    }
  },

  /**
   * Update user role (admin only)
   * @param {string} userId - ID of the user to update
   * @param {string} role - New role ('user' or 'admin')
   * @returns {Promise<Object>} Updated user object
   */
  updateUserRole: async (userId, role) => {
    try {
      const response = await api.put(`/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user role');
    }
  },

  /**
   * Search users by query (admin only)
   * @param {string} query - Search term (username or email)
   * @returns {Promise<Array>} Array of matching users
   */
  searchUsers: async (query) => {
    try {
      const response = await api.get('/users/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search users');
    }
  },

  /**
   * Deactivate user account (admin only)
   * @param {string} userId - ID of the user to deactivate
   * @returns {Promise<Object>} Updated user object
   */
  deactivateUser: async (userId) => {
    try {
      const response = await api.put(`/users/${userId}/deactivate`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to deactivate user');
    }
  },

  /**
   * Reactivate user account (admin only)
   * @param {string} userId - ID of the user to reactivate
   * @returns {Promise<Object>} Updated user object
   */
  reactivateUser: async (userId) => {
    try {
      const response = await api.put(`/users/${userId}/reactivate`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reactivate user');
    }
  },

  /**
   * Get user statistics (admin dashboard)
   * @returns {Promise<Object>} Statistics object
   */
  getUserStatistics: async () => {
    try {
      const response = await api.get('/users/statistics');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user statistics');
    }
  },
};

export default usersService;