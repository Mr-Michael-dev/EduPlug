import React from 'react';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import PostCard from './postCard/PostCard';
import LoadingCard from './postCard/LoadingCard'; // New loading card component
import LatestPost from './latestPosts/LatestPost';
import LoadingPost from './latestPosts/LoadingPost'; // New loading post component
import carousel_1 from '../../assets/carousel_1.png';
import carousel_2 from '../../assets/carousel_2.png';
import carousel_3 from '../../assets/carousel_3.png';
import './home.css';
import useFetchPosts from '../../hooks/UseFetchPosts';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { posts, loading, error } = useFetchPosts(1, 10); // Fetch only the first 10 latest posts

  // Dummy array for showing loading cards
  const dummyArray = [1, 2, 3, 4];

  return (
    <>
      {/* Hero Section with Carousel */}
      <section className="hero-section">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={carousel_1} alt="First slide" />
            <Carousel.Caption>
              <h3>Welcome to EduPlug</h3>
              <p>We plug learners to knowledge</p>
              <Button variant="primary" onClick={() => navigate('/aboutUs')}>Read More</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={carousel_2} alt="Second slide" />
            <Carousel.Caption>
              <h3>Educational Resources</h3>
              <p>Discover insightful articles and stories.</p>
              <Button variant="primary" onClick={() => navigate('/aboutUs')}>Read More</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={carousel_3} alt="Third slide" />
            <Carousel.Caption>
              <h3>Serving you knowledge</h3>
              <p>We sponsor purely educational contents, articles, news ....</p>
              <Button variant="primary" onClick={() => navigate('/aboutUs')}>Read More</Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Top Posts Section (Cards) */}
      <section className="top-posts my-5">
        <Container>
          <h4 className="text-center mb-4">Top Posts</h4>
          <Row>
            {loading
              ? dummyArray.map((_, index) => (
                  <Col key={index} md={3}>
                    <LoadingCard /> {/* Display loading cards */}
                  </Col>
                ))
              : posts.slice(0, 4).map((post) => (
                  <Col key={post._id} md={3}>
                    <PostCard
                      title={post.title}
                      imageUrl={post.banner}
                      description="Click to read this post."
                      postUrl={`/blogs/${post._id}`}
                      buttonText="Read More"
                    />
                  </Col>
                ))}
          </Row>
        </Container>
      </section>

      {/* Latest Posts Section (Rectangular Divs) */}
      <section className="latest-posts my-5">
        <Container>
          <h4 className="text-center mb-4">Latest Posts</h4>
          {loading
            ? dummyArray.map((_, index) => <LoadingPost key={index} />) // Display loading posts
            : posts.map((post) => (
                <LatestPost
                  key={post._id} // Ensure key is based on post._id
                  title={post.title}
                  author={post.author?.username || 'Unknown'} // Handle cases where author might not be available
                  datePosted={new Date(post.createdAt).toLocaleDateString()}
                  postUrl={`/blogs/${post._id}`}
                  likes={post.likes.length}
                  comments={post.comments.length}
                />
              ))}
        </Container>
      </section>
    </>
  );
};

export default Home;
