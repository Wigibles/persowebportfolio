import React, { useState, useEffect } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const sections = ['home', 'about', 'projects', 'skills', 'contact'];

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
  }, []);

  const scrollToSection = (sectionId) => {
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
  };

  return (
    <div className="scroll-progress-container">
      <div className="scroll-progress-bar" style={{ width: `${scrollPosition}%` }}></div>
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
  );
};

export default ScrollProgress; 