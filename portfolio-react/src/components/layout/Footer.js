import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faClock, 
  faLaptopCode, 
  faCode, 
  faMobile, 
  faDatabase,
  faCloud,
  faCogs,
  faServer,
  faWrench
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGithub, 
  faLinkedin, 
  faTwitter,
  faHtml5,
  faCss3Alt,
  faJs,
  faBootstrap,
  faJava,
  faPython,
  faAndroid,
  faGit
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');
  const marqueeRef = useRef(null);
  
  // Skills and roles to display in the marquee - complete tech stack
  const skills = [
    { name: 'HTML5', icon: faHtml5 },
    { name: 'CSS3', icon: faCss3Alt },
    { name: 'JavaScript', icon: faJs },
    { name: 'Bootstrap 5', icon: faBootstrap },
    { name: 'Git', icon: faGit },
    { name: 'Java', icon: faJava },
    { name: 'Python', icon: faPython },
    { name: 'C#', icon: faCode },
    { name: 'Google Cloud', icon: faCloud },
    { name: 'Postman', icon: faWrench },
    { name: 'Android', icon: faAndroid },
    { name: 'Firebase', icon: faDatabase },
    { name: 'Web Development', icon: faCode },
    { name: 'Mobile Development', icon: faMobile },
    { name: 'Full Stack', icon: faServer }
  ];
  
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
      <div className="footer-content">
        <div className="footer-logo">Luigi Santiago</div>
        <p className="footer-text">
          Software Developer
        </p>
        
        <div 
          className="skills-marquee-container"
          ref={marqueeRef}
        >
          <div className="gradient-overlay left"></div>
          
          <div className="skills-marquee-wrapper">
            {/* First set of skills */}
            <div className="skills-marquee">
              {skills.map((skill, index) => (
                <div 
                  key={`first-${index}`} 
                  className="skill-badge"
                >
                  <FontAwesomeIcon icon={skill.icon} className="skill-badge-icon" />
                  <span className="skill-badge-text">{skill.name}</span>
                </div>
              ))}
            </div>
            
            {/* Second set of skills (exact duplicate) for seamless looping */}
            <div className="skills-marquee">
              {skills.map((skill, index) => (
                <div 
                  key={`second-${index}`} 
                  className="skill-badge"
                >
                  <FontAwesomeIcon icon={skill.icon} className="skill-badge-icon" />
                  <span className="skill-badge-text">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="gradient-overlay right"></div>
        </div>
        
        <div className="copyright">
          <span>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Philippines | 
          </span>
          <span> {currentTime} | </span>
          <span>© {new Date().getFullYear()} Luigi Santiago</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 