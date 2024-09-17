import React, { useState } from 'react';

function PostManagement() {
  const [posts, setPosts] = useState([
    { id: 1, content: 'This is the first post' },
    { id: 2, content: 'This is the second post' },
  ]);

  const handleDeletePost = (postId) => {
    // Simulate API Call to delete post
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="post-management">
      <h2>Manage Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="post">
            <p>{post.content}</p>
            <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
          </div>
        ))
      )}
    </div>
  );
}

export default PostManagement;

// function PostManagement() {
//   const handleDeletePost = (postId) => {
//     // API Call to delete post
//     console.log(`Delete post with ID: ${postId}`);
//   };

//   return (
//     <div className="post-management">
//       <h2>Manage Posts</h2>
//       <div className="post">
//         <p>Post Content Here</p>
//         <button onClick={() => handleDeletePost(1)}>Delete Post</button>
//       </div>
//     </div>
//   );
// }

// export default PostManagement;
