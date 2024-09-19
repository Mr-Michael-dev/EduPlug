import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogPost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the single post by its ID (adjust the API endpoint as needed)
    axios.get(`/api/posts/${id}`).then(response => {
      setPost(response.data);
    }).catch(error => {
      console.error("Error fetching post:", error);
    });
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPost;
