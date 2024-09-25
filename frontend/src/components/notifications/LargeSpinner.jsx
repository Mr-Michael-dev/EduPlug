import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './largeSpinner.css'; // Import the CSS file for styling

const LargeSpinner = () => (
  <div className="spinner-overlay">
    <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }} />
    <p>Loading...</p>
  </div>
);

export default LargeSpinner;
