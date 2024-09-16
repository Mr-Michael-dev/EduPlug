import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [accountCreated, setAccountCreated] = useState(false);
  const [apiError, setApiError] = useState(null);

  const validateForm = () => {
    let formErrors = {};

    if (!firstName.trim()) {
      formErrors.firstName = "First Name is required.";
    }
    
    if (!lastName.trim()) {
      formErrors.lastName = "Last Name is required.";
    }

    if (!email.trim()) {
      formErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email address is invalid.";
    }
    
    if (!password.trim()) {
      formErrors.password = "Password is required.";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters.";
    }

    return formErrors;
  };

  const handleCreateAccount = async () => {
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        setErrors({});
        setApiError(null);

        const response = await axios.post('please add the backend url here', {
          firstName,
          lastName,
          email,
          password,
        });

        if (response.status === 201) {
          setAccountCreated(true);
          setTimeout(() => {
            navigate('/blog');
          }, 2000);
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError('An error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <Container className="signup-container mt-5">
      {/* Header */}
      <h1 className="text-center">Sign Up</h1>

      {accountCreated && (
        <Alert variant="success">
          Account created successfully! Redirecting to blog page...
        </Alert>
      )}

      {apiError && (
        <Alert variant="danger">
          {apiError}
        </Alert>
      )}

      <Form>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Control
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            isInvalid={!!errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            isInvalid={!!errors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>

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

        <Button variant="primary" type="button" onClick={handleCreateAccount}>
          Create Account
        </Button>
      </Form>

      <p className="mt-3">
        By signing up, you agree to our{' '}
        <a href="/privacy-policy">privacy policy</a>,{' '}
        <a href="/terms-of-use">terms of use</a>, and{' '}
        <a href="/code-of-conduct">code of conduct</a>.
      </p>
    </Container>
  );
}

export default SignUp;
