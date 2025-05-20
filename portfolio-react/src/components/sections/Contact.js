import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Contact.css';
import linkedinIcon from '../../assets/socials/3d-icon-linkedin.png';
import githubIcon from '../../assets/socials/3d-icon-github.png';
import facebookIcon from '../../assets/socials/3d-icon-facebook.png';

// Custom SocialIcon component with better tooltip handling
const SocialIcon = ({ href, title, icon, alt }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="social-icon-wrapper">
      <a 
        href={href}
        className="contact-social-icon" 
        target="_blank" 
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <img src={icon} alt={alt} className="social-img" />
        {showTooltip && (
          <div className="social-tooltip">
            <span>{title}</span>
            <div className="tooltip-arrow"></div>
          </div>
        )}
      </a>
    </div>
  );
};

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
          <SocialIcon 
            href="https://www.facebook.com/luigisantiago231" 
            title="Facebook"
            icon={facebookIcon}
            alt="Facebook"
          />
          <SocialIcon 
            href="https://www.linkedin.com/in/luigiatlinkdin/" 
            title="LinkedIn"
            icon={linkedinIcon}
            alt="LinkedIn"
          />
          <SocialIcon 
            href="https://github.com/Wigibles" 
            title="GitHub"
            icon={githubIcon}
            alt="GitHub"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact; 