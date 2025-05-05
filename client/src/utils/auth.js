/**
 * Authentication utilities for the Handmade E-Commerce application
 * Handles user authentication state, token management, and role-based access control
 */

// Check if user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return false;
    }
    
    // In a real application, you would also validate if the token is expired
    // For example, if using JWT tokens, you could decode and check the expiration
    
    return true;
  };
  
  // Check if user has admin role
  export const isAdmin = () => {
    const user = getCurrentUser();
    
    if (!user) {
      return false;
    }
    
    return user.role === 'admin';
  };
  
  // Get current user from localStorage
  export const getCurrentUser = () => {
    const userJson = localStorage.getItem('user');
    
    if (!userJson) {
      return null;
    }
    
    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };
  
  // Set authentication token and user data
  export const setAuth = (token, user) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  // Remove authentication data (logout)
  export const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };
  
  // Get authentication token for API requests
  export const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };
  
  /**
   * In a real application with Azure AD B2C, you would use 
   * the Microsoft Authentication Library (MSAL) for authentication.
   * 
   * Example implementation:
   * 
   * import { PublicClientApplication } from '@azure/msal-browser';
   * 
   * const msalConfig = {
   *   auth: {
   *     clientId: process.env.REACT_APP_AZURE_AD_B2C_CLIENT_ID,
   *     authority: `https://${process.env.REACT_APP_AZURE_AD_B2C_TENANT}.b2clogin.com/${process.env.REACT_APP_AZURE_AD_B2C_TENANT}.onmicrosoft.com/${process.env.REACT_APP_AZURE_AD_B2C_POLICY}`,
   *     knownAuthorities: [`${process.env.REACT_APP_AZURE_AD_B2C_TENANT}.b2clogin.com`],
   *     redirectUri: window.location.origin,
   *   },
   *   cache: {
   *     cacheLocation: 'sessionStorage',
   *     storeAuthStateInCookie: false,
   *   },
   * };
   * 
   * const msalInstance = new PublicClientApplication(msalConfig);
   * 
   * // Login function
   * export const login = async () => {
   *   try {
   *     await msalInstance.loginPopup();
   *   } catch (error) {
   *     console.error('Error during login:', error);
   *   }
   * };
   * 
   * // Get current user from MSAL
   * export const getCurrentUser = () => {
   *   const accounts = msalInstance.getAllAccounts();
   *   if (accounts.length === 0) {
   *     return null;
   *   }
   *   return accounts[0];
   * };
   */