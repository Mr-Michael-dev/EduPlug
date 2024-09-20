import React, { useState, useRef, useEffect } from 'react';
import useFetchPosts from '../../hooks/useFetchPosts'; // Import the custom hook
import PostCard from './PostCard'; // Import your PostCard component
import './blog.css'; // To add custom CSS for hover effects

const Blog = () => {
  const [page, setPage] = useState(1); // Initialize page state for pagination
  const { posts, loading, error, hasMore } = useFetchPosts(page, 20); // Fetch 10 posts per page
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
    <div className="blog-container">
      <h1>User Blog Posts</h1>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card-container">
            <PostCard
              title={post.title}
              tags={post.tags}
              reactions={post.reactions}
              comments={post.comments}
              readTime={post.readTime}
              author={post.author.name}
              date={new Date(post.createdAt).toLocaleDateString()}
              authorImage={post.author.image}
            />
          </div>
        ))}
      </div>
      <div ref={loader} className="loading">
        {loading ? 'Loading more posts...' : ''}
      </div>
      {error && <div>Error fetching posts: {error.message}</div>}
    </div>
  );
};

export default Blog;
