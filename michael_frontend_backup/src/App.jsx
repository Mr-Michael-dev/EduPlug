import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import AdminDashboard from './components/Admin/AdminDashboard';
import Profile from './components/User/profile';
import PostUpload from './components/User/postUpload';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import SignUp from './components/auth/SignUp';
import Blog from './components/blog/Blog'; // Import the Blog component
import BlogPost from './components/blog/BlogPost'; // Import the BlogPost component
import './App.css';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<PostUpload />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* New Routes for Blog and BlogPost */}
          <Route path="/blog" element={<Blog />} /> {/* View all posts */}
          <Route path="/blog/:id" element={<BlogPost />} /> {/* View single post */}
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;




// export default App;


// function App() {
//   return (
//     <Router> {/* Wrap the app in Router */}
//       <>
//         <Header />
//         {/* Add your Routes here if needed */}
//         <Footer />
//       </>
//     </Router>
//   );
// }

// export default App;
