import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // for retrieving the post ID from the URL
import axios from 'axios'; // for making API calls
import { Container, Row, Col, Image, Card, Spinner } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa'; // For the eye icon next to the view count
import profilePic from '../../assets/profilePic.webp';
import './blogPost.css'

const BlogPost = () => {
  const { id } = useParams(); // Get post ID from route params
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the post data from the backend
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load the post.');
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  // Show error if there is an issue fetching the post
  if (error) {
    return (
      <Container className="my-5 text-center">
        <p>{error}</p>
      </Container>
    );
  }

  // Show the blog post content once the data is available
  return (
    <Container className="my-5" style={{ minHeight: '70vh' }}>
      <Row>
        <Col md={8} className="mx-auto">
          {/* Blog post banner image */}
          {post.banner && (
            <Image 
              src={post.banner} 
              fluid 
              className="mb-4 rounded" 
              alt={post.title}
            />
          )}

          {/* Blog post content */}
          <Card className="border-0">
            <Card.Body>
              <Card.Title as="h2" className="fw-bold">{post.title}</Card.Title>

              {/* Author and views */}
              <div className="d-flex align-items-center mb-3 text-muted">
                <Image 
                  src={post.author.profilePic || profilePic}// Replace with actual author avatar if available
                  roundedCircle 
                  width={40} 
                  height={40} 
                  className="me-2"
                  alt="Author"
                />
                <div>
                  <small className="me-2"><strong>@{post.author?.username || 'Unknown Author'}</strong></small>
                  <small>| {new Date(post.createdAt).toLocaleDateString()}</small>
                </div>
                <div className="ms-auto">
                  <FaEye className="me-1" /> {/* Replace with view count if available */}
                  2k {/* Dummy views, replace with actual views data if you have it */}
                </div>
              </div>

              {/* Blog content - Render HTML safely */}
              <Card.Text as="div" style={{ textAlign: 'left' }}>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <ul>
                  {post.tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                  ))}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogPost;
