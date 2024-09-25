import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';

const AboutUs = () => {
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
    <Container className="mt-5">
      <h1>About EduPlug</h1>
      <p>
        EduPlug is an educational blog site that aims to empower readers by connecting them to
        knowledge. We blog about education and provide educational resources, making it a source
        of educational "power" or connection for students, educators, and lifelong learners.
      </p>
      <p>
        Our content is purely educational, featuring articles, news, and resources that will help students 
        and educators grow academically. Whether you're looking for study tips, insights into 
        educational technology (EdTech), or news on AI in education, EduPlug is your go-to platform.
      </p>
      <p>
        We strongly believe that education is evolving, and with it, the tools and technologies 
        that support learning. EduPlug is dedicated to promoting EdTech and artificial intelligence 
        in education to help students and teachers adapt to this ever-changing landscape.
      </p>
    </Container>
  );
};

export default AboutUs;
