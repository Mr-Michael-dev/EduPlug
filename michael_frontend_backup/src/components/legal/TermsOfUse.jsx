import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function TermsOfUse() {
  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="terms-container">
              <h1>Terms of Use</h1>
              <p>
                By accessing and using our website, you agree to comply with the following terms and conditions. Please read them carefully before using our services.
              </p>
              <h2>Use of the Website</h2>
              <p>
                You may use this website for lawful purposes only. Any unauthorized use of the website, including hacking or violating security features, is strictly prohibited.
              </p>
              <h2>Intellectual Property</h2>
              <p>
                All content provided on this website is the property of the site owner or used with permission. You are not allowed to copy, distribute, or create derivative works without our consent.
              </p>
              <h2>Disclaimer</h2>
              <p>
                We make no guarantees regarding the accuracy, reliability, or completeness of the information on this site.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TermsOfUse;
