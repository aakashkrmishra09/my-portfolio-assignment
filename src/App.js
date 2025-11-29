import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectForm from './pages/ProjectForm';
import Services from './pages/Services';
import ServiceForm from './pages/ServiceForm';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status when app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {/* Pass login state and logout function to Navbar */}
      <MyNavbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/add" element={<ProjectForm />} />
        <Route path="/projects/edit/:id" element={<ProjectForm />} />
        
        <Route path="/services" element={<Services />} />
        <Route path="/services/add" element={<ServiceForm />} />
        <Route path="/services/edit/:id" element={<ServiceForm />} />
        
        <Route path="/contact" element={<Contact />} />
        
        {/* Pass handleLogin to Login page so it can update the state */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;