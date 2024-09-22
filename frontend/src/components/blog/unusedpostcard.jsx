import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './home.css';

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { fetchPosts, likePost, commentOnPost } from '../../services/api';
import LikeButton from './LikeButton';
import Comment from './Comment';

function PostCard({ post, isAdmin = false, onDelete }) {
  const { user, token } = useContext(AuthContext);
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState('');


  const handleLike = async () => {
    try {
      const updatedLikes = await likePost(token, post.id);
      setLikes(updatedLikes);
    } catch (error) {
      console.error('Error liking post:', error);
      alert('Failed to like the post.');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const newComment = await commentOnPost(token, post.id, commentText);
      setComments([...comments, newComment]);
      setCommentText('');
    } catch (error) {
      console.error('Error commenting on post:', error);
      alert('Failed to add comment.');
    }
  };

  return (
    <div className="card mb-4">
      {post.image && <img src={post.image} className="card-img-top" alt="Post" />}
      <div className="card-body">
        <h5 className="card-title">{post.author.username}</h5>
        <p className="card-text">{post.text}</p>
        <LikeButton likes={likes} onLike={handleLike} />
        <hr />
        <h6>Comments:</h6>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        <form onSubmit={handleComment} className="mt-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Comment
            </button>
          </div>
        </form>
        {isAdmin && (
          <button className="btn btn-danger mt-3" onClick={() => onDelete(post.id)}>
            Delete Post
          </button>
        )}
      </div>
    </div>
  );
}

export default PostCard;
