import React, { useState, useRef } from 'react';
import { Form, Button, Image, Container } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import DOMPurify from 'dompurify';

// Custom toolbar for Quill editor
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    ['link', 'code-block'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['clean']
  ],
};

function PostUpload() {
  const [postTitle, setPostTitle] = useState('');
  const [postBanner, setPostBanner] = useState(null);
  const [previewBanner, setPreviewBanner] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const quillRef = useRef(null); // Create a reference for the Quill editor

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    setPostBanner(file);
    setPreviewBanner(URL.createObjectURL(file));
  };

  const handlePost = async () => {
    if (!postTitle || !postBanner) {
      setError('Please fill all fields and upload a banner.');
      return;
    }

    const postContent = quillRef.current.getEditor().root.innerHTML; // Get raw HTML content
    const sanitizedContent = DOMPurify.sanitize(postContent); // Sanitize the contentr

    const formData = new FormData();
    formData.append('title', postTitle);
    formData.append('content', sanitizedContent); // Use sanitized content
    formData.append('banner', postBanner); // Upload the banner image

    try {
      const response = await axios.post('/api/v1/posts', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Reset fields after successful post creation
      setSuccessMessage('Post created successfully!');
      setPostTitle('');
      setPostBanner(null);
      setPreviewBanner(null);
      setError('');
      if (quillRef.current) {
        quillRef.current.getEditor().setContents([]); // Clear the editor after post creation
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post');
    }
  };

  return (
    <Container className="post-upload-page py-4" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-4">Create a Post</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <Form>
        {/* Post Banner Upload */}
        <Form.Group controlId="formFileBanner" className="mb-4">
          <Form.Label>Upload Banner Image</Form.Label>
          <Form.Control type="file" onChange={handleBannerUpload} />
        </Form.Group>

        {/* Display the uploaded banner */}
        {previewBanner && (
          <div className="mb-4 text-center">
            <Image src={previewBanner} alt="Post Banner" fluid rounded style={{ maxHeight: '400px', objectFit: 'cover' }} />
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
            ref={quillRef} // Set the ref
            theme="snow"
            placeholder="Write your post content here..."
            modules={modules}
            style={{ height: '200px', marginBottom: '50px' }}
          />
        </Form.Group>

        {/* Submit Button */}
        <div className="text-center my-auto mz-auto">
          <Button variant="primary" size="lg" onClick={handlePost}>
            Publish Post
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default PostUpload;
