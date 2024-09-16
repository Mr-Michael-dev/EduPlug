import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import AdminDashboard from './components/admin/AdminDashboard';
import Profile from './components/user/Profile';
import PostUpload from './components/user/PostUpload';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import './App.css';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<PostUpload />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
