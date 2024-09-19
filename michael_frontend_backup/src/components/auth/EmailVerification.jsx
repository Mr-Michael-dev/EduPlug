import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Alert, Spinner } from 'react-bootstrap';

function EmailVerification() {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/verify-email?token=${token}`);
        if (response.status === 200) {
          setVerified(true);g
          setTimeout(() => {
            navigate('/home');
          }, 3000);
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Verification failed. Please try again.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <Container className="mt-5">
      {verified ? (
        <Alert variant="success">
          Email verified successfully! Redirecting to the home page...
        </Alert>
      ) : error ? (
        <Alert variant="danger">
          {error}
        </Alert>
      ) : (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Verifying...</span>
          </Spinner>
        </div>
      )}
    </Container>
  );
}

export default EmailVerification;
