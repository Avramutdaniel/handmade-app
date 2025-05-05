import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to homepage
  const redirectPath = location.state?.from || '/';
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // Error and loading states
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (error) setError('');
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // In a real app, you would send this data to your backend
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, let's pretend the login was successful
      // In a real app, you would check the response and handle errors
      
      // Store auth token in localStorage (in a real app, this would come from your API)
      localStorage.setItem('authToken', 'demo-token-123456');
      
      // Store user info in localStorage (in a real app, this would come from your API)
      localStorage.setItem('user', JSON.stringify({
        id: 'user123',
        email: formData.email,
        name: 'Demo User',
        role: 'user'
      }));
      
      // Redirect user
      navigate(redirectPath);
      
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle social login (in a real app, this would redirect to OAuth provider)
  const handleSocialLogin = (provider) => {
    alert(`${provider} login not implemented in this demo`);
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Sign In</h1>
          <p>Welcome back! Please login to your account.</p>
        </div>
        
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="auth-divider">
          <span>or continue with</span>
        </div>
        
        <div className="social-login-buttons">
          <button 
            type="button"
            className="social-button google"
            onClick={() => handleSocialLogin('Google')}
          >
            Google
          </button>
          
          <button 
            type="button"
            className="social-button facebook"
            onClick={() => handleSocialLogin('Facebook')}
          >
            Facebook
          </button>
          
          <button 
            type="button"
            className="social-button microsoft"
            onClick={() => handleSocialLogin('Microsoft')}
          >
            Microsoft
          </button>
        </div>
        
        <div className="auth-footer">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;