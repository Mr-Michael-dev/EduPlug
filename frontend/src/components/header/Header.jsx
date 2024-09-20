import React from "react";
import './header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import eduplug_logo_1_copy from "../../assets/eduplug_logo_1_copy.png";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Logout from "../auth/Logout";
import profilePic from '../../assets/profilePic.webp'; // Assumes default profile picture

function Header() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar  expand="lg" className="bg-dark navbar-dark" sticky="top">
      <Container>
      <Navbar.Brand href="#home" className="d-flex align-items-center ms-3">
            <img
              alt=""
              src={eduplug_logo_1_copy}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{' '}
            <b style={{ lineHeight: '40px' }}>EduPlug</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/blogs">Blog</Nav.Link>
            <Nav.Link href="/aboutUs">About</Nav.Link>
          </Nav>
          {/* Conditionally render based on user authentication */}
          {isAuthenticated ? (
              <>
                <NavDropdown
                  title={
                    <img
                      src={user.profilePic || profilePic} // Assumes user object has profilePic
                      alt="Profile"
                      width="40"
                      height="40"
                      style={{ borderRadius: '50%' }}
                    />
                  }
                  id="user-nav-dropdown"
                >
                  <NavDropdown.Item href="/profile">{user.username}</NavDropdown.Item>
                  <NavDropdown.Item>
                    <Logout />
                  </NavDropdown.Item>

                </NavDropdown>
                {/* Render Create Post button for admins or contributors */}
                {(user.role === 'admin' || user.role === 'contributor') && (
                  <Button variant="outline-info" onClick={() => navigate('/create-post')}>
                    Create Post
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button variant="outline-info" className="mx-2" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button variant="info" onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </>
            )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
