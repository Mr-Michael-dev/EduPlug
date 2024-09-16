import React, { useState } from 'react';
import { Form, Button, Image, Container } from 'react-bootstrap';

function PostUpload() {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);

  const handlePost = () => {
    // API Call to submit the post
    console.log(postText, postImage);
  };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setPostImage(URL.createObjectURL(file));
//   };


  return (
    <Container className="post-upload-page">
      <h2 className="text-center mt-4">Create a Post</h2>
      <Form>
        <Form.Group controlId="postTextarea" className="mb-3">
          <Form.Label>Post Content</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={5} 
            value={postText} 
            onChange={(e) => setPostText(e.target.value)} 
            placeholder="Write something..." 
          />
        </Form.Group>
  
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={handleImageUpload} />
        </Form.Group>
  
        {postImage && (
          <div className="mb-3 text-center">
            <Image src={postImage} alt="Post" fluid rounded />
          </div>
        )}
  
        <div className="text-center">
          <Button variant="primary" onClick={handlePost}>
            Post
          </Button>
        </div>
      </Form>
    </Container>
  );
//   return (
//     <div className="post-upload-page">
//       <h2>Create a Post</h2>
//       <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Write something..." />
//       <input type="file" onChange={handleImageUpload} />
//       {postImage && <img src={postImage} alt="Post" />}
//       <button onClick={handlePost}>Post</button>
//     </div>
//   );
}

export default PostUpload;
