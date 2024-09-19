import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

class LoadingCard extends React.Component {
  render() {
    return (
      <Card>
        <Placeholder as={Card.Img} variant="top" style={{ height: '200px' }} />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />
          </Placeholder>
        </Card.Body>
      </Card>
    );
  }
}

export default LoadingCard;
