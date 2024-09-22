import React, { useState } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import LargeSpinner from '../notifications/LargeSpinner';
import './signUp.css'
import axios from 'axios';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

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
        setSubmitting(true);
        setErrors({});
        setLoginError(null);
   

        const response = await axios.post('/api/v1/users/login', {
          email,
          password,
        }, { withCredentials: true });

        if (response.status === 200) {
          setShowSpinner(true);
          await login();
          setTimeout(() => {
            setShowSpinner(false); // Hide the spinner
            navigate('/'); // Navigate to home page
          }, 3000); // Optional delay to keep spinner visible for a moment
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          setLoginError(error.response.data.error);
        } else {
          setLoginError('An error occurred. Please try again.');
        }
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <Container className={`login-container mt-5 mb-5 ${showSpinner ? 'blur' : ''}`}>
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

          <Button type="submit" disabled={submitting} variant="primary">
            {submitting ? <Spinner size="sm" animation="border" /> : 'Login'}
          </Button>
        </Form>

        <p className="mt-3">
        Don't have an account yet? <Link to="/signup">Sign up</Link>
      </p>
      </div>

      {/* Show LargeSpinner if showSpinner is true */}
      {showSpinner && <LargeSpinner />}
    </Container>
  );
}

export default Login;
