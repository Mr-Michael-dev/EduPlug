import React from 'react';

function LikeButton({ likes, onLike }) {
  const userHasLiked = likes.includes('currentUserId'); // Replace with actual user ID

  return (
    <button className={ btn ${ userHasLiked ? 'btn-danger' : 'btn-outline-danger' } } onClick={onLike}>
      {userHasLiked ? 'Unlike' : 'Like'} ({likes.length})
    </button>
  );
}

export default LikeButton;