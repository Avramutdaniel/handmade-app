import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        
        <div className="not-found-actions">
          <Link to="/" className="back-home-button">
            Back to Home
          </Link>
          
          <Link to="/contact" className="contact-button">
            Contact Support
          </Link>
        </div>
        
        <div className="not-found-suggestions">
          <h3>You might be interested in:</h3>
          <ul>
            <li><Link to="/">Featured Products</Link></li>
            <li><Link to="/category/new-arrivals">New Arrivals</Link></li>
            <li><Link to="/category/bestsellers">Best Sellers</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;