import React, { useState, useRef, useEffect } from 'react';
import useFetchPosts from '../../hooks/UseFetchPosts'; // Import the custom hook
import PostCard from './PostCard'; // Import your PostCard component
import Spinner from 'react-bootstrap/Spinner';
import profilePic from '../../assets/profilePic.webp';
import './blog.css'; // To add custom CSS for hover effects

const Blog = () => {
  const [page, setPage] = useState(1); // Initialize page state for pagination
  const { posts, loading, error, hasMore } = useFetchPosts(page, 10); // Fetch 20 posts per page
  const loader = useRef(null); // To observe the loader for infinite scrolling

  // Infinite Scroll - IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Load next page when the loader is visible
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [hasMore]);

  return (
    <div className="blog-container" style={{ minHeight: '70vh' }}>
      <h4>Blog Posts</h4>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post._id} className="post-card-container"> {/* Use post._id for the key */}
            <PostCard
              title={post.title}
              tags={post.tags}
              likes={post.likes}
              comments={post.comments}
              readTime={post.readTime}
              author={post.author?.username || 'Unknown Author'}
              date={new Date(post.createdAt).toLocaleDateString()}
              authorImage={post.author?.profilePic || profilePic}
              id={post._id}
            />
          </div>
        ))}
      </div>
      <div ref={loader} className="loading">
        {loading && (
          <div>
            <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }} />
            <p>Loading...</p>
          </div>
        )}
      </div>

      {error && <div>Error fetching posts: {error.message}</div>}
    </div>
  );
};

export default Blog;
