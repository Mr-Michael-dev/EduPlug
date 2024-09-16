import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Ensure Router is imported
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css'

function App() {
  return (
    <Router> {/* Wrap the app in Router */}
      <>
        <Header />
        {/* Add your Routes here if needed */}
        <Footer />
      </>
    </Router>
  );
}

export default App;
