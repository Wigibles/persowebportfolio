import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import ProjectDetail from './components/sections/ProjectDetail';
import './App.css';

// Location observer component to handle navigation state changes
function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    // Check for state containing section to scroll to
    if (location.state && location.state.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          // Get navbar height for offset calculation
          const navbar = document.querySelector('.navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 0;
          
          // Calculate position with offset
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight - 20; // Extra 20px buffer
          
          // Scroll to the element with offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    } 
    // Check URL hash for section scrolling
    else if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          // Get navbar height for offset calculation
          const navbar = document.querySelector('.navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 0;
          
          // Calculate position with offset
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight - 20; // Extra 20px buffer
          
          // Scroll to the element with offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [location]);

  return null;
}

// Section indicator component to help with layout during development
const SectionIndicator = ({ name }) => (
  <div className="section-indicator">{name} Section</div>
);

// Home component to ensure all sections render properly
function Home() {
  return (
    <div className="main-content">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App">
        {loading ? (
          <div className="loading-screen">
            <div className="loader">
              <div className="loader-circle"></div>
              <div className="loader-text">Loading...</div>
            </div>
          </div>
        ) : (
          <>
            <ScrollToSection />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App; 