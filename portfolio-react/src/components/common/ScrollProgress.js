import React, { useState, useEffect, useCallback } from 'react';
import './ScrollProgress.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Move sections array outside component to prevent re-creation
const sections = ['home', 'about', 'projects', 'skills', 'contact'];

const ScrollProgress = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Check if the screen is mobile on component mount
  useEffect(() => {
    // Check initial screen size
    const checkIfMobile = () => {
      // Always start with navigation hidden
      setIsExpanded(false);
    };
    
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / totalHeight;
      setScrollPosition(currentProgress * 100);

      // Determine active section
      const sectionElements = sections.map(id => document.getElementById(id));
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.4; // 40% of viewport height

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= threshold) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Remove sections from dependency array

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - 20;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);
  
  const toggleExpand = useCallback(() => {
    setIsAnimating(true);
    
    if (isExpanded) {
      // When hiding, add a small delay before changing state
      // to allow for the animation to complete
      setTimeout(() => {
        setIsExpanded(false);
        setIsAnimating(false);
      }, 300);
    } else {
      // When showing, change state immediately
      setIsExpanded(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  }, [isExpanded]);

  return (
    <div className="scroll-progress-container">
      <div className="scroll-progress-bar" style={{ width: `${scrollPosition}%` }}></div>
      
      {/* Floating toggle button to show navigation */}
      <button 
        className={`floating-toggle-btn toggle-indicators-btn ${isExpanded || isAnimating ? 'hidden' : ''}`}
        onClick={toggleExpand}
        aria-label="Show navigation"
        disabled={isAnimating}
      >
        <FontAwesomeIcon 
          icon={faChevronLeft} 
          className="toggle-icon"
        />
      </button>
      
      <div className={`scroll-navigation-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <button 
          className="toggle-indicators-btn"
          onClick={toggleExpand}
          aria-label="Hide navigation"
          disabled={isAnimating}
        >
          <FontAwesomeIcon 
            icon={faChevronRight} 
            className="toggle-icon"
          />
        </button>
        
        <div className="scroll-indicators">
          {sections.map(section => (
            <div 
              key={section}
              className={`scroll-indicator ${activeSection === section ? 'active' : ''}`}
              onClick={() => scrollToSection(section)}
            >
              <div className="indicator-dot"></div>
              <span className="indicator-label">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress; 