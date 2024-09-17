import React from "react";
import './header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import eduplug_logo_1_copy from "../../assets/eduplug_logo_1_copy.png";
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate(); 
  return (
    <Navbar  expand="lg" className="bg-dark navbar-dark" sticky="top">
      <Container>
      <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img
              alt=""
              src={eduplug_logo_1_copy}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{' '}
            <b style={{ lineHeight: '40px' }}>EduPlug</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#blogs">Blogs</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contacts">Contacts</Nav.Link>
            <NavDropdown title="Resources" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Coming soon</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Coming soon
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Coming soon</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button variant="outline-info" className="mx-2" onClick={() => navigate('/login')}>Login</Button>
          <Button variant="info" onClick={() => navigate('/register')}>Register</Button>
          <Button variant="info" onClick={() => navigate('/signup')}>Sign Up</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
