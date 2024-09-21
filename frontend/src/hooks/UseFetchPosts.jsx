import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook to fetch posts with a limit and optional pagination
const useFetchPosts = (page = 1, limit = 10) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/v1/posts?page=${page}&limit=${limit}`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const newPosts = response.data.posts || [];
        setPosts((prevPosts) => {
          const postIds = new Set(prevPosts.map(post => post._id));
          const newUniquePosts = newPosts.filter(post => !postIds.has(post._id));
          return [...prevPosts, ...newUniquePosts];
        });        
  
        // Set hasMore to false if no new posts are returned
        if (newPosts.length < limit) {
          setHasMore(false);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, limit]);

  return { posts, loading, error, hasMore };
};

export default useFetchPosts;
