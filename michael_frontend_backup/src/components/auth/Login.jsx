import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import './signUp.css'
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null);

  const validateLoginForm = () => {
    let formErrors = {};

    if (!email.trim()) {
      formErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email address is invalid.";
    }

    if (!password.trim()) {
      formErrors.password = "Password is required.";
    }

    return formErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const formErrors = validateLoginForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        setErrors({});
        setLoginError(null);

        const response = await axios.post('http://localhost:5000/api/login', {
          email,
          password,
        });

        if (response.status === 200) {
          // Handle successful login
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          setLoginError(error.response.data.message);
        } else {
          setLoginError('An error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <Container className="login-container mt-5 mb-5">
      <div className="form-box">
        <h1 className="text-center">Login</h1>

        {loginError && (
          <Alert variant="danger">
            {loginError}
          </Alert>
        )}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
