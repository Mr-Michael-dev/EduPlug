import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import AdminDashboard from './components/Admin/AdminDashboard';
import Profile from './components/User/Profile';
import PostUpload from './components/User/PostUpload';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
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
