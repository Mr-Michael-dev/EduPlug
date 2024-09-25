import React, { useState } from 'react';  
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap'; 
import { useNavigate, Link } from 'react-router-dom'; 
import './adminSignUp.css'; 
import axios from 'axios'; 
  
function AdminSignUp() { 
  const navigate = useNavigate(); 
  const [fullName, setFullName] = useState(''); 
  const [userName, setUserName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [token, setToken] = useState(''); // New token field
  const [submitting, setSubmitting] = useState(false); 
  const [errors, setErrors] = useState({}); 
  const [accountCreated, setAccountCreated] = useState(false); 
  const [apiError, setApiError] = useState(null); 
  const [emailSent, setEmailSent] = useState(false); 
  
  const validateForm = () => { 
    let formErrors = {}; 
  
    if (!fullName.trim()) { 
      formErrors.fullName = "Full Name is required."; 
    } 
      
    if (!userName.trim()) { 
      formErrors.userName = "Username is required."; 
    } 
  
    if (!email.trim()) { 
      formErrors.email = "Email is required."; 
    } else if (!/\S+@\S+\.\S+/.test(email)) { 
      formErrors.email = "Email address is invalid."; 
    } 
      
    if (!password.trim()) { 
      formErrors.password = "Password is required."; 
    } else if (password.length < 6) { 
      formErrors.password = "Password must be at least 6 characters."; 
    } 
  
    if (confirmPassword !== password) { 
      formErrors.confirmPassword = "Passwords do not match."; 
    } 
    
    if (!token.trim()) { 
      formErrors.token = "Admin token is required.";  // New token validation
    }
  
    return formErrors; 
  }; 
  
  const handleCreateAccount = async (e) => { 
    e.preventDefault(); 
    const formErrors = validateForm(); 
      
    if (Object.keys(formErrors).length > 0) { 
      setErrors(formErrors); 
    } else { 
      try { 
        setSubmitting(true); 
        setErrors({}); 
        setApiError(null); 
  
        const adminData = { 
          fullname: fullName, 
          username: userName, 
          email: email, 
          password: password, 
          token: token,  // Send token with form data
          role: 'admin', // Automatically set role as admin
        }; 
  
        const response = await axios.post( 
          '/api/v1/admins/signup', 
          adminData, 
          { headers: { 'Content-Type': 'application/json' } } 
        ); 
  
        if (response.status === 201) { 
          setAccountCreated(true); 
          setEmailSent(true);  // Indicates email verification was sent 
          setTimeout(() => { 
            navigate(`/verify-email?email=${encodeURIComponent(email)}`); 
          }, 3000); 
        } 
      } catch (error) { 
        console.log(error.response); 
        if (error.response && error.response.data.error) { 
          setApiError(error.response.data.error); 
        } else { 
          setApiError('An error occurred. Please try again.'); 
        }  
      } finally { 
        setSubmitting(false); 
      } 
    } 
  }; 
  
  return ( 
    <Container className="admin-signup-container mt-5 mb-5"> 
      <div className="form-box"> 
        <h1 className="text-center">Admin Sign Up</h1> 
  
        {accountCreated && ( 
          <Alert variant="success"> 
            Admin account created successfully! Please check your email to verify your account. 
          </Alert> 
        )} 
  
        {emailSent && ( 
          <Alert variant="info"> 
            A verification email has been sent to {email}. Please follow the instructions to complete your registration. 
          </Alert> 
        )} 
  
        {apiError && ( 
          <Alert variant="danger"> 
            {apiError} 
          </Alert> 
        )} 
  
        <Form onSubmit={handleCreateAccount}> 
          <Form.Group className="mb-3" controlId="formFullName"> 
            <Form.Control 
              type="text" 
              placeholder="Full Name" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              isInvalid={!!errors.fullName} 
            /> 
            <Form.Control.Feedback type="invalid"> 
              {errors.fullName} 
            </Form.Control.Feedback> 
          </Form.Group> 
  
          <Form.Group className="mb-3" controlId="formUserName"> 
            <Form.Control 
              type="text" 
              placeholder="User Name" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
              isInvalid={!!errors.userName} 
            /> 
            <Form.Control.Feedback type="invalid"> 
              {errors.userName} 
            </Form.Control.Feedback> 
          </Form.Group> 
  
          <Form.Group className="mb-3" controlId="formEmail"> 
            <Form.Control 
              type="email" 
              placeholder="Email Address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              isInvalid={!!errors.email} 
            /> 
            <Form.Control.Feedback type="invalid"> 
              {errors.email} 
            </Form.Control.Feedback> 
          </Form.Group> 
  
          <Form.Group className="mb-3" controlId="formPassword"> 
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              isInvalid={!!errors.password} 
            /> 
            <Form.Control.Feedback type="invalid"> 
              {errors.password} 
            </Form.Control.Feedback> 
          </Form.Group> 
  
          <Form.Group className="mb-3" controlId="formConfirmPassword"> 
            <Form.Control 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              isInvalid={!!errors.confirmPassword} 
            /> 
            <Form.Control.Feedback type="invalid"> 
              {errors.confirmPassword} 
            </Form.Control.Feedback> 
          </Form.Group> 
  
          {/* Token Field */} 
          <Form.Group className="mb-3" controlId="formToken"> 
            <Form.Control 
              type="password" 
              placeholder="Admin Token" 
              value={token} 
              onChange={(e) => setToken(e.target.value)} 
              isInvalid={!!errors.token} 
            /> 
            <Form.Control.Feedback type="invalid"> 
              {errors.token} 
            </Form.Control.Feedback> 
          </Form.Group> 
  
          <Button type="submit" disabled={submitting} variant="primary"> 
            {submitting ? <Spinner size="sm" animation="border" /> : 'Create Admin Account'} 
          </Button> 
        </Form> 
  
        <p className="mt-3"> 
          Already have an account? <Link to="/login">Sign in</Link> 
        </p> 
      </div> 
    </Container> 
  ); 
} 
  
export default AdminSignUp;
