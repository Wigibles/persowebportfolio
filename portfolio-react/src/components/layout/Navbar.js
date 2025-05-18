import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? '' : 'hidden';
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const scrollToSection = (sectionId) => {
    closeMobileMenu();
    
    if (location.pathname !== '/') {
      // If we're not on the home page, navigate to home and then scroll
      const state = { scrollToSection: sectionId };
      return { pathname: '/', state };
    } else {
      // If we're on the home page, just scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        // Get navbar height for offset calculation
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        
        // Calculate position with offset
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        let offsetPosition = elementPosition - navbarHeight;
        
        // Section-specific adjustments
        if (sectionId === 'skills') {
          offsetPosition -= 40; // Extra offset for Skills section
        } else if (sectionId === 'projects') {
          // For Projects section, ensure window height is considered to avoid showing Skills
          const windowHeight = window.innerHeight;
          const projectsSection = document.getElementById('projects');
          
          if (projectsSection) {
            // Check if we need additional offset to prevent Skills from showing
            const projectsSectionHeight = projectsSection.offsetHeight;
            const skillsSection = document.getElementById('skills');
            
            if (skillsSection) {
              const skillsTop = skillsSection.getBoundingClientRect().top + window.pageYOffset;
              const viewBottom = offsetPosition + windowHeight;
              
              // If Skills would be visible, adjust offset
              if (viewBottom > skillsTop) {
                offsetPosition = Math.max(offsetPosition, elementPosition - 20);
              }
            }
          }
        } else if (sectionId === 'contact') {
          // For Contact section, ensure proper positioning
          offsetPosition -= 20; // Extra offset for Contact section
          
          // Make sure footer is not visible when navigating to Contact
          const footer = document.querySelector('footer');
          if (footer) {
            const footerTop = footer.getBoundingClientRect().top + window.pageYOffset;
            const windowHeight = window.innerHeight;
            const viewBottom = offsetPosition + windowHeight;
            
            // If footer would be visible, adjust offset
            if (viewBottom > footerTop) {
              offsetPosition = Math.max(0, footerTop - windowHeight + 100);
            }
          }
        }
        
        // Scroll to the element with offset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link to="/">Luigi.</Link>
      </div>
      <div className={`nav-container ${mobileMenuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link" onClick={() => scrollToSection('home')}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link" onClick={() => scrollToSection('about')}>
              About
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link" onClick={() => scrollToSection('projects')}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link" onClick={() => scrollToSection('skills')}>
              Skills
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link" onClick={() => scrollToSection('contact')}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div 
        className={`hamburger ${mobileMenuOpen ? 'active' : ''}`} 
        onClick={toggleMobileMenu}
        aria-label="Open navigation menu"
        tabIndex="0"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} 
        onClick={closeMobileMenu}
      ></div>
    </nav>
  );
};

export default Navbar; 