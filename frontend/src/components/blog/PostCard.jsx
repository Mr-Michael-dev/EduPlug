import React from 'react';
import { Card, Image } from 'react-bootstrap';

const PostCard = ({ title, tags, reactions, comments, readTime, author, date, authorImage }) => {
  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '70%' }} className="my-3">
        <Card.Body>
          <div className="d-flex align-items-center mb-2">
            <Image src={authorImage} roundedCircle width={40} height={40} className="me-3" />
            <div>
              <h6 className="mb-0">{author}</h6>
              <small className="text-muted">{date}</small>
            </div>
          </div>
          <Card.Title>{title}</Card.Title>
          <div className="mb-2">
            {tags.map((tag, index) => (
              <span key={index} className="badge bg-secondary me-1">
                #{tag}
              </span>
            ))}
          </div>
          <div className="d-flex justify-content-between">
            <div>
              {reactions ? (
                <span>{reactions} reactions</span>
              ) : (
                <span>No reactions yet</span>
              )}
              {' | '}
              {comments ? (
                <span>{comments} comments</span>
              ) : (
                <span>No comments yet</span>
              )}
            </div>
            <span>{readTime} min read</span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostCard;
