import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function PrivacyPolicy() {
  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="policy-container">
              <h1>Privacy Policy</h1>
              <p>
                Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information when you use our services.
              </p>
              <h2>Information We Collect</h2>
              <p>
                We may collect personal information such as your name, email address, and other details to provide you with a personalized experience.
              </p>
              <h2>How We Use Your Information</h2>
              <p>
                We use your information to improve our services, communicate with you, and ensure the security of our platform.
              </p>
              <h2>Your Rights</h2>
              <p>
                You have the right to request access to, correction of, or deletion of your personal data at any time.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PrivacyPolicy;