import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'; // For layout
import eduplug_logo_1_copy from "../../assets/eduplug_logo_1_copy.png";
import './footer.css'; // Footer CSS for custom styles

function Footer() {
  return (
    <footer className="footer-container bg-dark text-white py-4 fs-6 lh-1">
      <Container>
        <Row>
          {/* Left Section */}
          <Col md={3} className="footer-section mt-2">
            <div>
              <img src={eduplug_logo_1_copy} alt="Logo" className="mb-2" width="50"
              height="50" />
              <p className='fs-6'><em>plugging readers into knowledge...</em></p>
            </div>
          </Col>

          <Col md={3} className="footer-section mt-2">
            <ul>
              <li><Link to="/about-us" className="text-white">About Us</Link></li>
              <li><Link to="/our-mission" className="text-white">Our Mission</Link></li>
              <li><Link to="/our-contributors" className="text-white">Become Contributor</Link></li>
            </ul>
          </Col>

          {/* Center Section */}
          <Col md={3} className="footer-section mt-2">
            <h5>WHAT WE DO</h5>
            <ul>
              <li><Link to="/educational-content" className="text-white">Educational Content</Link></li>
              <li><Link to="/news" className="text-white">News</Link></li>
              <li><Link to="/research" className="text-white">Research</Link></li>
              <li><Link to="/jobs" className="text-white">Jobs</Link></li>
            </ul>
          </Col>

          {/* Right Section */}
          <Col md={3} className="footer-section mt-2">
            <h5>FOLLOW US</h5>
            <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                  <i className='bx bxl-facebook-circle bx-md' style={{ color: '#0037ff' }}></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                  <i className='bx bxl-instagram bx-md' style={{ color: '#ff8100' }}></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                  <i className='bx bxl-youtube bx-md' style={{ color: '#ff0000' }}></i>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                  <i className='bx bx-x bx-md' style={{ color: '#ececec' }}></i>
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
