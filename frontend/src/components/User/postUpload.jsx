import React, { useState } from 'react';
import { Form, Button, Image, Container } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// Custom toolbar for Quill editor with link and code block options
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    ['link', 'code-block'],  // Enable link and code-block
    [{ color: [] }, { background: [] }],  // Dropdown with defaults from theme
    [{ script: 'sub' }, { script: 'super' }],
    ['clean']  // Remove formatting
  ],
};

function PostUpload() {
  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [postBanner, setPostBanner] = useState(null);

  const handlePost = () => {
    // Simulate API Call to submit the post
    console.log("Post Data:", { postTitle, postText, postBanner });
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    setPostBanner(URL.createObjectURL(file));
  };

  return (
    <Container className="post-upload-page py-4" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-4">Create a Post</h2>
      <Form>
        {/* Post Banner Upload */}
        <Form.Group controlId="formFileBanner" className="mb-4">
          <Form.Label>Upload Banner Image</Form.Label>
          <Form.Control type="file" onChange={handleBannerUpload} />
        </Form.Group>

        {/* Display the uploaded banner */}
        {postBanner && (
          <div className="mb-4 text-center">
            <Image src={postBanner} alt="Post Banner" fluid rounded style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </div>
        )}

        {/* Post Title Input */}
        <Form.Group controlId="postTitle" className="mb-4">
          <Form.Label>Post Title</Form.Label>
          <Form.Control
            type="text"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Enter your post title"
            className="mb-3"
          />
        </Form.Group>

        {/* Post Content (Rich Text Editor) */}
        <Form.Group controlId="postEditor" className="mb-4">
          <Form.Label>Post Content</Form.Label>
          <ReactQuill
            theme="snow"
            value={postText}
            onChange={setPostText}
            placeholder="Write your post content here..."
            modules={modules}  // Use custom toolbar
            style={{ height: '200px', marginBottom: '50px' }}
          />
        </Form.Group>

        {/* Submit Button */}
        <div className="text-center">
          <Button variant="primary" size="lg" onClick={handlePost}>
            Publish Post
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default PostUpload;
