import React from 'react';
import { Link } from 'react-router-dom'; // For internal links
import './Footer.css'; // Footer CSS for styling

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-section left">
          <ul>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/our-mission">Our Mission</Link></li>
            <li><Link to="/meet-the-team">Meet the Team</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/our-contributors">Our Contributors</Link></li>
            <li><Link to="/newsletters">Newsletters</Link></li>
            <li><Link to="/faq">Frequently Asked Questions</Link></li>
            <li><Link to="/account-help">Account Help</Link></li>
          </ul>
        </div>

        {/* Center Section */}
        <div className="footer-section center">
          <h4>WHAT WE DO</h4>
          <ul>
            <li><Link to="/educational-content">Educational Content</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/articles">Articles</Link></li>
            <li><Link to="/research">Research</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-section right">
          <h4>FOLLOW US</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-x-twitter"></i> {/* X / Twitter icon */}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; 2024 All Rights Reserved. <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms-of-use">Terms of Use</Link></p>
      </div>
    </footer>
  );
}

export default Footer;
