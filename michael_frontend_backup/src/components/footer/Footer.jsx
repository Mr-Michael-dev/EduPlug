import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'; // For layout
import './footer.css'; // Footer CSS for custom styles

function Footer() {
  return (
    <footer className="footer-container bg-dark text-white py-4">
      <Container>
        <Row>
          {/* Left Section */}
          <Col md={4} className="footer-section">
            <ul>
              <li><Link to="/about-us" className="text-white">About Us</Link></li>
              <li><Link to="/our-mission" className="text-white">Our Mission</Link></li>
              <li><Link to="/meet-the-team" className="text-white">Meet the Team</Link></li>
              <li><Link to="/admin" className="text-white">Admin</Link></li>
              <li><Link to="/our-contributors" className="text-white">Our Contributors</Link></li>
              <li><Link to="/newsletters" className="text-white">Newsletters</Link></li>
              <li><Link to="/faq" className="text-white">Frequently Asked Questions</Link></li>
              <li><Link to="/account-help" className="text-white">Account Help</Link></li>
            </ul>
          </Col>

          {/* Center Section */}
          <Col md={4} className="footer-section">
            <h4>WHAT WE DO</h4>
            <ul>
              <li><Link to="/educational-content" className="text-white">Educational Content</Link></li>
              <li><Link to="/news" className="text-white">News</Link></li>
              <li><Link to="/articles" className="text-white">Articles</Link></li>
              <li><Link to="/research" className="text-white">Research</Link></li>
              <li><Link to="/jobs" className="text-white">Jobs</Link></li>
            </ul>
          </Col>

          {/* Right Section */}
          <Col md={4} className="footer-section">
            <h4>FOLLOW US</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <i className="fab fa-x-twitter"></i>
              </a>
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <Row className="footer-bottom text-center mt-4">
          <Col>
            <p>&copy; 2024 All Rights Reserved. <Link to="/privacy-policy" className="text-white">Privacy Policy</Link> | <Link to="/terms-of-use" className="text-white">Terms of Use</Link></p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
