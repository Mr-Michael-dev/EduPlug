import React from 'react';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import PostCard from './postCard/PostCard';
import LoadingCard from './postCard/LoadingCard'; // New loading card component
import LatestPost from './latestPosts/LatestPost';
import LoadingPost from './latestPosts/LoadingPost'; // New loading post component
import useFetchPosts from '../../assets/customHooks/UseFetchPosts';

const Home = () => {
  const { posts, loading, error } = useFetchPosts();

//   if (error) return <p>Error fetching posts: {error.message}</p>;

  // Dummy array for showing loading cards
  const dummyArray = [1, 2, 3, 4];

  return (
    <>
      {/* Hero Section with Carousel */}
      <section className="hero-section">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/1200x400"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Welcome to Our Blog</h3>
              <p>Discover insightful articles and stories.</p>
              <Button variant="primary">Read More</Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Top Posts Section (Cards) */}
      <section className="top-posts my-5">
        <Container>
          <h2 className="text-center mb-4">Top Posts</h2>
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
                      postUrl={`/post/${post._id}`}
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
          <h2 className="text-center mb-4">Latest Posts</h2>
          {loading
            ? dummyArray.map((_, index) => <LoadingPost key={index} />) // Display loading posts
            : posts.map((post) => (
                <LatestPost
                  key={post._id}
                  title={post.title}
                  author={post.author}
                  datePosted={new Date(post.createdAt).toLocaleDateString()}
                  postUrl={`/post/${post._id}`}
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
