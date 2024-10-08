import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AboutUs from './components/aboutUs/AboutUs.jsx';
import Home from './components/home/Home';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminSignUp from './components/Admin/AdminSignUp';
import Profile from './components/User/profile';
import PostUpload from './components/User/postUpload';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import EmailVerification from './components/auth/EmailVerification'; // Import the VerifyEmail component
import Blog from './components/blog/Blog'; // Import the Blog component
import BlogPost from './components/blog/BlogPost'; // Import the BlogPost component
import CodeOfConduct from './components/legal/CodeOfConduct'
import PrivacyPolicy from './components/legal/PrivacyPolicy'
import TermsOfUse from './components/legal/TermsOfUse'
import PrivateRoute from './components/auth/PrivateRoute';
import { AuthProvider } from './components/auth/AuthContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admins/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admins/signup" element={<AdminSignUp />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/admins/verify-email" element={<EmailVerification />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/code-of-conduct" element={<CodeOfConduct />} />
            {/* New Routes for Blog and BlogPost */}
            <Route path="/blogs" element={<Blog />} /> {/* View all posts */}
            <Route path="/blogs/:id" element={<BlogPost />} /> {/* View single post */}
            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/create-post" element={<PostUpload />} />
              <Route path="/admins/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
          <Footer />
        </>
      </AuthProvider>
    </Router>
  );
}


export default App;
