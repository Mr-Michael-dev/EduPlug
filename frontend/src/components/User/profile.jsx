import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Image, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Logout from '../auth/Logout';
import profilePic from '../../assets/profilePic.webp';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);  // Loading state
  const { user, isAuthenticated } = useAuth();  // Get user and auth state from context
  const navigate = useNavigate();

  // Fetch profile data
  useEffect(() => {
    if (user && isAuthenticated) {
      setProfile(user);
      setActivities(user.activityHistory);
      setLoading(false);  // Stop loading once user is set
    } else {
      setLoading(false);
    }
  }, [user, isAuthenticated]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('profilePic', selectedFile);
  
    try {
      const res = await axios.put('http://localhost:5000/api/v1/users/profile/profile-pic', formData, { withCredentials: true });
      
      // Assuming the response returns the complete user object
      setProfile(prevProfile => ({
        ...prevProfile,
        profilePic: res.data.profilePic // Update only the profilePic
      }));
      
      setMessage('Profile picture updated successfully.');
      console.log(profile);
    } catch (error) {
      setMessage('Error uploading profile picture.');
      console.error(error); // Log the error for debugging
    }
  };
  
  if (loading) {
    // Show loading spinner while fetching data
    return (
      <Container className="text-center" style={{ paddingTop: '100px' }}>
        <Spinner animation="border" role="status" style={{ width: '100px', height: '100px' }}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container>
      {profile && (
        <div>
          <h1 className="mt-4">{profile.fullname}</h1>
          <Row className="align-items-center">
            <Col md={4} className="text-center">
              <Image
                src={profile.profilePic || profilePic}
                roundedCircle
                width="150"
                height="150"
                style={{ objectFit: 'cover' }} 
                className="mb-3"
              />
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              <Button onClick={handleUpload} disabled={!selectedFile}>
                Upload Profile Picture
              </Button>
              {message && <p className="mt-2">{message}</p>}
            </Col>
            <Col md={8} className='my-3'>
              <h5>Profile Information</h5>
              <p><strong>Username:</strong> @{profile.username}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              <p><strong>Status:</strong> {profile.isVerified ? 'Verified' : 'Not Verified'}</p>
              <Button variant="danger" className="mt-3">
                <Logout />
              </Button>
            </Col>
          </Row>

          <h3 className="mt-5">Activity History</h3>
          <ul className="list-group">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <li key={index} className="list-group-item">
                  <strong>{activity.action}</strong> on Post ID: {activity.postId} at {new Date(activity.timestamp).toLocaleString()}
                </li>
              ))
            ) : (
              <p>No recent activities.</p>
            )}
          </ul>
        </div>
      )}
      {!profile && <p>No profile data available.</p>}
    </Container>
  );
}

export default Profile;
