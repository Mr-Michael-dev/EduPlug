import React from 'react';
import { Row, Col } from 'react-bootstrap';

const LatestPost = ({ title, author, datePosted, postUrl, likes, comments }) => {
  return (
    <div className="latest-post p-3 mb-4 border rounded">
      <Row>
        <Col md={8}>
          <h5>
            <a href={postUrl} className="text-dark text-decoration-none">
              {title}
            </a>
          </h5>
          <p>
            By <strong>{author}</strong> - {datePosted}
          </p>
        </Col>
        <Col md={4} className="text-right">
          <p>Likes: {likes}</p>
          <p>Comments: {comments}</p>
        </Col>
      </Row>
    </div>
  );
};

export default LatestPost;
