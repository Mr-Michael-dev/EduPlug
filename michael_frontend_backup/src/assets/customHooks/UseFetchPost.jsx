import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook for fetching a post
const useFetchPost = (postId) => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    banner: null,
    author: '',
    tags: [],
    likes: [],
    comments: [],
    createdAt: '',
    updatedAt: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/posts/${postId}`); // replace with actual API endpoint
        setPost(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, loading, error };
};

export default useFetchPost;
