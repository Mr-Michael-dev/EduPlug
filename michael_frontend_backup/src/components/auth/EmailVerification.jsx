import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Alert, Spinner, Form, Button } from 'react-bootstrap';

function EmailVerification() {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  // Handle email verification via link (token)
  useEffect(() => {
    if (token) {
      verifyEmailWithToken(token);
    }
  }, [token]);

  const verifyEmailWithToken = async (token) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/verify-email?token=${token}`);
      if (response.status === 200) {
        setVerified(true);
        setTimeout(() => {
          navigate('/home');
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Verification failed. Please try again.');
    }
  };

  // Handle manual code verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/verify-email', { email: 'user_email', code: verificationCode });
      if (response.status === 200) {
        setVerified(true);
        setTimeout(() => {
          navigate('/home');
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-5">
      {verified ? (
        <Alert variant="success">
          Email verified successfully! Redirecting to the home page...
        </Alert>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : token ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Verifying...</span>
          </Spinner>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="verificationCode">
            <Form.Label>Enter your verification code</Form.Label>
            <Form.Control
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" disabled={submitting}>
            {submitting ? <Spinner size="sm" animation="border" /> : 'Verify Email'}
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default EmailVerification;
