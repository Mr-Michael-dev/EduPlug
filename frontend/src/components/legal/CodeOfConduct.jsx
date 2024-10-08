import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

function CodeOfConduct() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // Simulate fetching data from an API
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup timer when component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return (
      <div className='my-3'>
        <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }} />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="conduct-container">
              <h1>Code of Conduct</h1>
              <p>
                We are committed to maintaining a respectful and inclusive community. Please follow these guidelines when interacting on our platform.
              </p>

              <h2>Be Respectful</h2>
              <p>
                Treat others with respect. Harassment, discrimination, and hate speech will not be tolerated.
              </p>

              <h2>Be Inclusive</h2>
              <p>
                We welcome people of all backgrounds. Make sure your contributions foster inclusivity and respect.
              </p>

              <h2>Enforcement</h2>
              <p>
                Violations of this code of conduct may result in a temporary or permanent ban from our platform.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CodeOfConduct;
