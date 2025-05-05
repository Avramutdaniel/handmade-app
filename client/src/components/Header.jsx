import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { isAuthenticated, isAdmin, logout } from '../utils/auth';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Check authentication status
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    setIsAdminUser(isAdmin());
  }, []);
  
  // Calculate total items in cart
  const cartItemCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  
  // Handle logout
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setIsAdminUser(false);
    navigate('/');
  };
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <span className="logo-text">Handmade</span>
          </Link>
        </div>
        
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <nav className={`main-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/kitchen" className="nav-link">Kitchen</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/decor" className="nav-link">Home Decor</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/accessories" className="nav-link">Accessories</Link>
            </li>
          </ul>
        </nav>
        
        <div className={`header-actions ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="search-bar">
            <input type="text" placeholder="Search products..." />
            <button className="search-btn">Search</button>
          </div>
          
          <div className="user-actions">
            <Link to="/cart" className="cart-icon">
              <span className="cart-icon-symbol">🛒</span>
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </Link>
            
            {isLoggedIn ? (
              <div className="user-menu">
                <button className="user-menu-button">
                  <span className="user-icon">👤</span>
                </button>
                <div className="user-dropdown">
                  <Link to="/dashboard" className="dropdown-item">My Account</Link>
                  {isAdminUser && (
                    <Link to="/admin" className="dropdown-item">Admin Panel</Link>
                  )}
                  <button onClick={handleLogout} className="dropdown-item">Logout</button>
                </div>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="auth-link">Sign In</Link>
                <Link to="/register" className="auth-link register">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;