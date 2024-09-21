import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const PostCard = ({ title, tags, likes, comments, readTime, author, date, authorImage, id }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '70%' }} className="my-3">
        <Card.Body>
          <div className="d-flex align-items-center mb-2">
            <Image src={authorImage} roundedCircle width={40} height={40} className="me-3" />
            <div>
              <h6 className="mb-0">@{author}</h6>
              <small className="text-muted">{date}</small>
            </div>
          </div>
          <Card.Title>
            <a href="#" onClick={() => navigate(`/blogs/${id}`)}>
              {title}
            </a>
          </Card.Title>
          <div className="mb-2">
            {tags.map((tag, index) => (
              <span key={index} className="badge bg-secondary me-1">
                #{tag}
              </span>
            ))}
          </div>
          <div className="d-flex justify-content-between">
            <div>
              {likes ? (
                <span>{likes} likes</span>
              ) : (
                <span>No likes yet</span>
              )}
              {' | '}
              {comments ? (
                <span>{comments} comments</span>
              ) : (
                <span>No comments yet</span>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostCard;
