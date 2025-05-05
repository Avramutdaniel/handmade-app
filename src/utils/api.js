/**
 * API service utilities for making HTTP requests to the backend
 * Handles common API operations and error handling
 */

import { getAuthToken } from './auth';

// Base API URL (should be set in .env file)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Generic fetch function that handles authentication and common options
 * 
 * @param {string} endpoint - API endpoint path
 * @param {Object} options - Fetch options (method, body, etc.)
 * @returns {Promise} - Response data or error
 */
const apiFetch = async (endpoint, options = {}) => {
  // Prepare URL
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get auth token if available
  const token = getAuthToken();
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  // Add auth token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Merge options
  const fetchOptions = {
    ...options,
    headers
  };
  
  try {
    // Make the request
    const response = await fetch(url, fetchOptions);
    
    // Parse JSON response
    const data = await response.json();
    
    // Handle API errors
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  } catch (error) {
    console.error(`API error (${endpoint}):`, error);
    throw error;
  }
};

/**
 * GET request
 * 
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - Response data
 */
export const get = (endpoint, options = {}) => {
  return apiFetch(endpoint, {
    method: 'GET',
    ...options
  });
};

/**
 * POST request
 * 
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body data
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - Response data
 */
export const post = (endpoint, data, options = {}) => {
  return apiFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options
  });
};

/**
 * PUT request
 * 
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body data
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - Response data
 */
export const put = (endpoint, data, options = {}) => {
  return apiFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options
  });
};

/**
 * DELETE request
 * 
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - Response data
 */
export const del = (endpoint, options = {}) => {
  return apiFetch(endpoint, {
    method: 'DELETE',
    ...options
  });
};

/**
 * Upload file to the server (multipart/form-data)
 * 
 * @param {string} endpoint - API endpoint
 * @param {File} file - File to upload
 * @param {Object} additionalData - Additional form data
 * @returns {Promise} - Response data
 */
export const uploadFile = async (endpoint, file, additionalData = {}) => {
  // Create form data
  const formData = new FormData();
  
  // Append file
  formData.append('file', file);
  
  // Append additional data
  Object.entries(additionalData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  
  // Get auth token
  const token = getAuthToken();
  
  // Headers (note: do not set Content-Type, it will be set automatically with boundary)
  const headers = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    // Make the request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
      headers
    });
    
    // Parse JSON response
    const data = await response.json();
    
    // Handle API errors
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred during file upload');
    }
    
    return data;
  } catch (error) {
    console.error(`API error (${endpoint}):`, error);
    throw error;
  }
};

// Specific API services
export const ProductService = {
  getAllProducts: () => get('/products'),
  getProductById: (id) => get(`/products/${id}`),
  getProductsByCategory: (category) => get(`/products/category/${category}`),
  createProduct: (productData) => post('/products', productData),
  updateProduct: (id, productData) => put(`/products/${id}`, productData),
  deleteProduct: (id) => del(`/products/${id}`),
  uploadProductImage: (file, productId) => uploadFile('/products/upload-image', file, { productId })
};

export const OrderService = {
  getAllOrders: () => get('/orders'),
  getOrderById: (id) => get(`/orders/${id}`),
  getUserOrders: () => get('/orders/user'),
  createOrder: (orderData) => post('/orders', orderData),
  updateOrderStatus: (id, status) => put(`/orders/${id}/status`, { status })
};

export const UserService = {
  getUserProfile: () => get('/users/profile'),
  updateUserProfile: (userData) => put('/users/profile', userData)
};

export default {
  get,
  post,
  put,
  del,
  uploadFile,
  ProductService,
  OrderService,
  UserService
};