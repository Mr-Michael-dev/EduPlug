import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PostCard = ({ title, imageUrl, description, postUrl, buttonText }) => {
  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={imageUrl || 'https://via.placeholder.com/300x200'} alt="Post image" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" href={postUrl}>
          {buttonText || "Read More"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
