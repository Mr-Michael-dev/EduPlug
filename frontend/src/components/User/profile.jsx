import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile and activity history
    const fetchProfile = async () => {
      try {
        const profileRes = await axios.get('/api/profile');
        setProfile(profileRes.data);

        // Fetch user activity
        const activityRes = await axios.get('/api/activity');
        setActivities(activityRes.data);
      } catch (error) {
        console.error('Error fetching profile or activities', error);
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('profilePic', selectedFile);

    try {
      const res = await axios.put('/api/profile/profile-pic', formData);
      setMessage('Profile picture updated successfully.');
      setProfile(res.data);
    } catch (error) {
      setMessage('Error uploading profile picture.');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/v1/logout');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <Container>
      {profile && (
        <div>
          <h1>{profile.fullname}'s Profile</h1>
          <Row>
            <Col md={4}>
              <Image
                src={profile.profilePic || '/default-pic.png'}
                roundedCircle
                width="150"
                height="150"
              />
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              <Button onClick={handleUpload} disabled={!selectedFile}>
                Upload Profile Picture
              </Button>
            </Col>
            <Col md={8}>
              <p>Username: {profile.username}</p>
              <p>Email: {profile.email}</p>
              <p>Role: {profile.role}</p>
              <p>Status: {profile.isVerified ? 'Verified' : 'Not Verified'}</p>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Col>
          </Row>

          <h3 className="mt-4">Activity History</h3>
          <ul>
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <li key={index}>
                  {activity.action} on Post ID: {activity.postId} at {new Date(activity.timestamp).toLocaleString()}
                </li>
              ))
            ) : (
              <p>No recent activities.</p>
            )}
          </ul>
        </div>
      )}
      {message && <p>{message}</p>}
    </Container>
  );
}

export default Profile;
