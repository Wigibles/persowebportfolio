import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Contact.css';
import linkedinIcon from '../../assets/socials/3d-icon-linkedin.png';
import githubIcon from '../../assets/socials/3d-icon-github.png';
import facebookIcon from '../../assets/socials/3d-icon-facebook.png';

const Contact = () => {
  const contactRef = useRef(null);
  const location = useLocation();
  
  useEffect(() => {
    // Check if the current URL has the contact hash
    if (location.hash === '#contact' && contactRef.current) {
      // Add a class to ensure it takes up enough vertical space
      contactRef.current.classList.add('full-height-view');
    } else if (contactRef.current) {
      contactRef.current.classList.remove('full-height-view');
    }
  }, [location]);
  
  return (
    <section id="contact" className="contact" ref={contactRef}>
      <div className="contact-main">
        <h2 className="contact-title">Contact Me</h2>
        <p className="contact-message">
          Let's build something great together. If you like what you see, feel free to reach out—I'm always open to new ideas and collaborations.
        </p>
        <div className="contact-socials">
          <a 
            href="https://www.facebook.com/luigisantiago231" 
            className="contact-social-icon" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="Facebook"
          >
            <img src={facebookIcon} alt="Facebook" className="social-img" />
          </a>
          <a 
            href="https://www.linkedin.com/in/luigiatlinkdin/" 
            className="contact-social-icon" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="LinkedIn"
          >
            <img src={linkedinIcon} alt="LinkedIn" className="social-img" />
          </a>
          <a 
            href="https://github.com/Wigibles" 
            className="contact-social-icon" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="GitHub"
          >
            <img src={githubIcon} alt="GitHub" className="social-img" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact; 