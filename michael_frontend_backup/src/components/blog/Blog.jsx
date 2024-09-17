import React, { useEffect, useState } from 'react';
import axios from 'axios'; // If using axios for API calls
import { Link } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts (adjust the API endpoint as needed)
    axios.get('/api/posts').then(response => {
      setPosts(response.data);
    }).catch(error => {
      console.error("Error fetching posts:", error);
    });
  }, []);

  return (
    <div>
      <h1>User Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
