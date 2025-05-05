import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-section">
            <h3 className="footer-heading">Shop</h3>
            <ul className="footer-links">
              <li><Link to="/category/kitchen">Kitchen</Link></li>
              <li><Link to="/category/decor">Home Decor</Link></li>
              <li><Link to="/category/accessories">Accessories</Link></li>
              <li><Link to="/category/jewelry">Jewelry</Link></li>
              <li><Link to="/category/art">Art</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-heading">Customer Service</h3>
            <ul className="footer-links">
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping & Returns</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-heading">About Us</h3>
            <ul className="footer-links">
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/artisans">Our Artisans</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/sustainability">Sustainability</Link></li>
            </ul>
          </div>
          
          <div className="footer-section newsletter">
            <h3 className="footer-heading">Stay Connected</h3>
            <p>Subscribe to our newsletter for updates and exclusive offers.</p>
            
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                required 
              />
              <button type="submit">Subscribe</button>
            </form>
            
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                Instagram
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-link">
                Pinterest
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                Twitter
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Handmade Store. All rights reserved. 
          </p>
          
          <div className="payment-methods">
            <span className="payment-method">Visa</span>
            <span className="payment-method">Mastercard</span>
            <span className="payment-method">PayPal</span>
            <span className="payment-method">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;