import React, { useState } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import './signUp.css';
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Register as'); // New state for role selection
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [accountCreated, setAccountCreated] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const validateForm = () => {
    let formErrors = {};

    if (!fullName.trim()) {
      formErrors.fullName = "Full Name is required.";
    }

    if (!userName.trim()) {
      formErrors.userName = "Username is required.";
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

    if (confirmPassword !== password) {
      formErrors.confirmPassword = "Passwords do not match.";
    }

    return formErrors;
  };

  const handleCreateAccount = async (e) => {
    const formErrors = validateForm();
    e.preventDefault();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        setSubmitting(true);
        setErrors({});
        setApiError(null);

        const userData = {
          fullname: fullName,
          username: userName,
          email: email,
          password: password,
          role: role, // Include role in the user data
        };

        const response = await axios.post(
          '/api/v1/users/signup',
          userData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 201) {
          setAccountCreated(true);
          setEmailSent(true); // Indicates email verification was sent
          setTimeout(() => {
            navigate(`/verify-email?email=${encodeURIComponent(email)}`);
          }, 3000);
        }
      } catch (error) {
        console.log(error.response);
        if (error.response && error.response.data.error) {
          setApiError(error.response.data.error);
        } else {
          setApiError('An error occurred. Please try again.');
        }
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <Container className="signup-container mt-5 mb-5">
      <div className="form-box">
        <h1 className="text-center">Sign Up</h1>

        {accountCreated && (
          <Alert variant="success">
            Account created successfully! Please check your email to verify your account.
          </Alert>
        )}

        {emailSent && (
          <Alert variant="info">
            A verification email has been sent to {email}. Please follow the instructions to complete your registration.
          </Alert>
        )}

        {apiError && (
          <Alert variant="danger">{apiError}</Alert>
        )}

        <Form onSubmit={handleCreateAccount}>
          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Control
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              isInvalid={!!errors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUserName">
            <Form.Control
              type="text"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              isInvalid={!!errors.userName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.userName}
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

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          {/* New Role Selection Section */}
          <Form.Group className="mb-3" controlId="formRole">
            <Form.Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              isInvalid={!!errors.role}
            >
              <option value="">Register as</option>
              <option value="user">User</option>
              <option value="contributor">Contributor</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" disabled={submitting} variant="primary">
            {submitting ? <Spinner size="sm" animation="border" /> : 'Create Account'}
          </Button>
        </Form>

        <p className="mt-3">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

        <p className="mt-3">
          By signing up, you agree to our{' '}
          <a href="/privacy-policy">privacy policy</a>,{' '}
          <a href="/terms-of-use">terms of use</a>, and{' '}
          <a href="/code-of-conduct">code of conduct</a>.
        </p>
      </div>
    </Container>
  );
}

export default SignUp;
