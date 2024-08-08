import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-links">
          <NavLink to="/aboutus" className="footer-link">About Us</NavLink>
          <NavLink to="/contactus" className="footer-link">Contact Us</NavLink>
          <NavLink to="/faq" className="footer-link">FAQ</NavLink>
          {/* <NavLink to="/terms" className="footer-link">Terms of Service</NavLink>
          <NavLink to="/privacy" className="footer-link">Privacy Policy</NavLink> */}
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <div className="footer-contact">
          <p>© 2024 Logistic Management System. All rights reserved.</p>
          <p>Contact us: xxx@logisticms.com | +91 12345 xxxxx</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
