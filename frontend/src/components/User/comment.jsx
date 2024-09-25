import React from 'react';

function Comment({ comment }) {
  return (
    <div className="mb-2">
      <strong>{comment.author.username}:</strong> {comment.text}
    </div>
  );
}

export default Comment;