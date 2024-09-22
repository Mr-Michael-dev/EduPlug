import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const { user, isAdmin, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect non-admin users
  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      navigate('/'); // Redirect to the homepage or a login page if not admin
    }
  }, [isAuthenticated, isAdmin, loading, navigate, user]);

  if (loading) {
    return (
      <div>
        <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }} />
        <p>Loading...</p>
      </div>
    ); // Show a loading indicator while fetching auth state
  }

  useEffect(() => {
    const fetchData = async () => {
      const postsResponse = await axios.get('http://localhost:5000/api/v1/posts?page=1&limit=50');
      const usersResponse = await axios.get('http://localhost:5000/api/v1/users/allUsers', {}, { withCredentials: true });
      setPosts(postsResponse.data);
      setUsers(usersResponse.data);
    };

    fetchData();
  }, []);

  // Handle Delete Post
  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${selectedPost._id}`,  {}, { withCredentials: true });
      setPosts(posts.filter(post => post._id !== selectedPost._id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/profile/${selectedUser._id}`,  {}, { withCredentials: true });
      setUsers(users.filter(user => user._id !== selectedUser._id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle Create Post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/posts', newPost, { withCredentials: true });
      setPosts([...posts, response.data]);
      setNewPost({ title: '', content: '' });
      setShowCreatePostModal(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDeleteModalOpen = (item, type) => {
    if (type === 'post') {
      setSelectedPost(item);
    } else if (type === 'user') {
      setSelectedUser(item);
    }
    setShowDeleteModal(true);
  };

  return (
    <Container>
      <h2>Manage Posts</h2>
      <Button onClick={() => setShowCreatePostModal(true)} className="mb-3">
        Create New Post
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteModalOpen(post, 'post')}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>Manage Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.fullname}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteModalOpen(user, 'user')}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this {selectedPost ? 'post' : 'user'}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={selectedPost ? handleDeletePost : handleDeleteUser}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Post Modal */}
      <Modal show={showCreatePostModal} onHide={() => setShowCreatePostModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreatePost}>
          <Modal.Body>
            <Form.Group controlId="formTitle">
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter post title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Post Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter post content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreatePostModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Post
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default AdminDashboard;
