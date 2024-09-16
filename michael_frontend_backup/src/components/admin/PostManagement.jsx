import React from 'react';

function PostManagement() {
  const handleDeletePost = (postId) => {
    // API Call to delete post
    console.log(`Delete post with ID: ${postId}`);
  };

  return (
    <div className="post-management">
      <h2>Manage Posts</h2>
      <div className="post">
        <p>Post Content Here</p>
        <button onClick={() => handleDeletePost(1)}>Delete Post</button>
      </div>
    </div>
  );
}

export default PostManagement;
