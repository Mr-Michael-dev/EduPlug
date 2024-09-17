import React from 'react';
import { Placeholder } from 'react-bootstrap';

class LoadingPost extends React.Component {
  render() {
    return (
      <div className="loading-post">
        <Placeholder as="h3" animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as="p" animation="glow">
          <Placeholder xs={4} /> <Placeholder xs={4} />
        </Placeholder>
      </div>
    );
  }
}

export default LoadingPost;
