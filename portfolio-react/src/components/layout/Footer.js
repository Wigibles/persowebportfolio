import React, { useState, useEffect } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      setCurrentTime(timeString);
    };
    
    updateClock(); // Initial call
    const intervalId = setInterval(updateClock, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="contact-location">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" /> Philippines
        </span>
        <span className="contact-copyright">
          © {new Date().getFullYear()}, All Rights By Luigi Santiago.
        </span>
        <span id="footer-clock">{currentTime}</span>
      </div>
    </footer>
  );
};

export default Footer; 