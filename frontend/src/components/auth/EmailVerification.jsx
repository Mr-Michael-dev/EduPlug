import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Alert, Spinner, Form, Button } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import LargeSpinner from '../notifications/LargeSpinner';
import './emailVerification.css'

function EmailVerification() {
  const [verified, setVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();  // Use AuthContext to login after verification
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const email = queryParams.get('email');

  // Handle email verification via token in URL
  useEffect(() => {
    if (token && email) {
      verifyEmailWithToken(token, email);
    }
  }, [token, email]);

  const verifyEmailWithToken = async (token, email) => {
    try {
      setShowSpinner(true); // Show spinner during verification
      const response = await axios.post('/api/v1/users/verify-email', { token, email }, { withCredentials: true });

      if (response.status === 200) {
        setVerified(true);
        await login();  // Automatically login after successful verification
        setTimeout(() => {
          setShowSpinner(false);
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      setVerificationError(error.response?.data?.error || 'Verification failed. Please try again.');
    } finally {
      setShowSpinner(false);
    }
  };

  // Handle manual code verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateVerificationForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        setSubmitting(true);
        setVerificationError(null);

        const response = await axios.post('/api/v1/users/verify-email', { email, token: verificationCode }, { withCredentials: true });

        if (response.status === 200) {
          setShowSpinner(true);
          setVerified(true);
          await login();  // Automatically login after successful manual verification
          setTimeout(() => {
            setShowSpinner(false);
            navigate('/');
          }, 3000);
        }
      } catch (error) {
        setVerificationError(error.response?.data?.error || 'Verification failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const validateVerificationForm = () => {
    let formErrors = {};

    if (!verificationCode.trim()) {
      formErrors.verificationCode = 'Verification code is required.';
    }

    return formErrors;
  };

  return (
    <Container className={`verification-container mt-5 ${showSpinner ? 'blur' : ''}`}>
      {verified ? (
        <Alert variant="success">Email verified successfully! Redirecting to the home page...</Alert>
      ) : verificationError ? (
        <Alert variant="danger">{verificationError}</Alert>
      ) : token ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Verifying...</span>
          </Spinner>
        </div>
      ) : (
        <div className="form-box">
          <h1 className="text-center">Email Verification</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="verificationCode" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                isInvalid={!!errors.verificationCode}
              />
              <Form.Control.Feedback type="invalid">
                {errors.verificationCode}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" disabled={submitting || showSpinner}>
              {submitting ? <Spinner size="sm" animation="border" /> : 'Verify Email'}
            </Button>
          </Form>
        </div>
      )}

      {/* Show LargeSpinner if showSpinner is true */}
      {showSpinner && <LargeSpinner />}
    </Container>
  );
}

export default EmailVerification;
