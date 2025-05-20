import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import avatarAbout from '../../assets/avatar-about.png';
import linkedinIcon from '../../assets/socials/3d-icon-linkedin.png';
import githubIcon from '../../assets/socials/3d-icon-github.png';
import facebookIcon from '../../assets/socials/3d-icon-facebook.png';

const About = () => {
  const typingRef = useRef(null);
  const [activeTab, setActiveTab] = useState('about');
  const [expandedItems, setExpandedItems] = useState({
    exp1: false,
    exp2: false,
    edu1: false,
    edu2: false,
    edu3: false,
    edu4: false
  });
  
  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  useEffect(() => {
    if (!typingRef.current) return;
    
    const roles = [
      'Software Developer',
      'Java Developer',
      'FullStack Developer',
      'Problem Solver'
    ];
    
    const typingSpeed = 90;
    const backSpeed = 50;
    const pause = 1200;
    const loopPause = 400;
    
    let roleIndex = 0;
    let charIdx = 0;
    let typing = true;
    let timer = null;
    
    const type = () => {
      const currentRole = roles[roleIndex];
      if (typing) {
        if (charIdx <= currentRole.length) {
          if (typingRef.current) {
            typingRef.current.textContent = currentRole.substring(0, charIdx);
            charIdx++;
            timer = setTimeout(type, typingSpeed);
          }
        } else {
          typing = false;
          timer = setTimeout(type, pause);
        }
      } else {
        if (charIdx >= 0) {
          if (typingRef.current) {
            typingRef.current.textContent = currentRole.substring(0, charIdx);
            charIdx--;
            timer = setTimeout(type, backSpeed);
          }
        } else {
          typing = true;
          roleIndex = (roleIndex + 1) % roles.length;
          timer = setTimeout(type, loopPause);
        }
      }
    };
    
    type();
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'about':
        return (
          <div className="about-content-wrap animate-fadeIn">
            <p className="about-desc">I'm a software developer passionate about building applications and provide modern solutions. I create complex app features, integrate them into systems, and enjoy solving real-world problems—whether it's web, mobile, or full-stack. Always up for a challenge and learning more!</p>
            <div className="about-row">
              <a href="/assets/Luigi Santiago Resume.pdf" className="btn about-btn primary" download="Luigi-Santiago-Resume.pdf">Download CV</a>
              <div className="about-social-icons">
                <a href="https://www.facebook.com/luigisantiago231" className="about-social-icon" title="Facebook" target="_blank" rel="noopener noreferrer">
                  <img src={facebookIcon} alt="Facebook" className="social-img" />
                </a>
                <a href="https://www.linkedin.com/in/luigiatlinkdin/" className="about-social-icon" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <img src={linkedinIcon} alt="LinkedIn" className="social-img" />
                </a>
                <a href="https://github.com/Wigibles" className="about-social-icon" title="GitHub" target="_blank" rel="noopener noreferrer">
                  <img src={githubIcon} alt="GitHub" className="social-img" />
                </a>
              </div>
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="experience-container animate-fadeIn">
            <div className={`experience-card ${expandedItems.exp1 ? 'expanded' : ''}`}>
              <div className="experience-header">
                <div className="experience-year">2025</div>
                <h3 className="experience-title">Intern - FED/BED</h3>
              </div>
              <div className="experience-preview">
                <p className="experience-company">Accenture Philippines</p>
                <p className="experience-duration">January 2025 - April 2025</p>
              </div>
              <div className="experience-content">
                <p className="experience-description">Intern under Accenture Technology Academy Program (ATA)</p>
                <ul className="experience-detail-list">
                  <li>Developed small projects using latest technologies</li>
                  <li>Gained several Udemy courses Certificates</li>
                  <li>Developed java projects using OOP concepts</li>
                </ul>
              </div>
              <button 
                className="expand-btn" 
                onClick={() => toggleExpand('exp1')}
                aria-expanded={expandedItems.exp1}
              >
                {expandedItems.exp1 ? 'Show less' : 'See more'}
                <span className={`expand-icon ${expandedItems.exp1 ? 'rotated' : ''}`}>↓</span>
              </button>
            </div>
            
            <div className={`experience-card ${expandedItems.exp2 ? 'expanded' : ''}`}>
              <div className="experience-header">
                <div className="experience-year">2023</div>
                <h3 className="experience-title">Salesforce Admin Trainee</h3>
              </div>
              <div className="experience-preview">
                <p className="experience-company">Salesforce</p>
              </div>
              <div className="experience-content">
                <ul className="experience-detail-list">
                  <li>Obtained 32 badges including 15 superbadges</li>
                  <li>Developed expertise in Salesforce platform administration</li>
                  <li>Created custom objects, fields, and automation workflows</li>
                  <li>Implemented security models and user access controls</li>
                </ul>
              </div>
              <button 
                className="expand-btn" 
                onClick={() => toggleExpand('exp2')}
                aria-expanded={expandedItems.exp2}
              >
                {expandedItems.exp2 ? 'Show less' : 'See more'}
                <span className={`expand-icon ${expandedItems.exp2 ? 'rotated' : ''}`}>↓</span>
              </button>
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="education-container animate-fadeIn">
            <div className="education-row">
              <div className={`education-card ${expandedItems.edu1 ? 'expanded' : ''}`}>
                <div className="experience-header">
                  <div className="experience-year">2021-2025</div>
                  <h3 className="experience-title">BS Information Technology</h3>
                </div>
                <div className="experience-preview">
                  <p className="experience-company">Bulacan State University</p>
                </div>
                <div className="education-content">
                  <div className="education-details">
                    <p>Specialized in Web and Mobile Application Development</p>
                    <p>Dean's Lister (2024-2025)</p>
                    <p>Recognized & Candidate for Best Capstone Project</p>
                  </div>
                </div>
                <button 
                  className="expand-btn" 
                  onClick={() => toggleExpand('edu1')}
                  aria-expanded={expandedItems.edu1}
                >
                  {expandedItems.edu1 ? 'Show less' : 'See more'}
                  <span className={`expand-icon ${expandedItems.edu1 ? 'rotated' : ''}`}>↓</span>
                </button>
              </div>
              
              <div className={`education-card ${expandedItems.edu2 ? 'expanded' : ''}`}>
                <div className="experience-header">
                  <div className="experience-year">2019-2021</div>
                  <h3 className="experience-title">STEM</h3>
                </div>
                <div className="experience-preview">
                  <p className="experience-company">Cabiao Senior High School</p>
                </div>
                <div className="education-content">
                  <div className="education-details">
                    <p>Graduated with Honors (Grade 11-12)</p>
                    <p>Participated in science research competitions</p>
                    <p>Member of Mathematics and Science Club</p>
                  </div>
                </div>
                <button 
                  className="expand-btn" 
                  onClick={() => toggleExpand('edu2')}
                  aria-expanded={expandedItems.edu2}
                >
                  {expandedItems.edu2 ? 'Show less' : 'See more'}
                  <span className={`expand-icon ${expandedItems.edu2 ? 'rotated' : ''}`}>↓</span>
                </button>
              </div>
            </div>
            
            <div className="education-row">
              <div className={`education-card ${expandedItems.edu3 ? 'expanded' : ''}`}>
                <div className="experience-header">
                  <div className="experience-year">2015-2019</div>
                  <h3 className="experience-title">Junior High School</h3>
                </div>
                <div className="experience-preview">
                  <p className="experience-company">Cabiao National High School</p>
                </div>
                <div className="education-content">
                  <div className="education-details">
                    <p>Graduated with Honors (Grade 8-10)</p>
                    <p>Active participant in school activities</p>
                  </div>
                </div>
                <button 
                  className="expand-btn" 
                  onClick={() => toggleExpand('edu3')}
                  aria-expanded={expandedItems.edu3}
                >
                  {expandedItems.edu3 ? 'Show less' : 'See more'}
                  <span className={`expand-icon ${expandedItems.edu3 ? 'rotated' : ''}`}>↓</span>
                </button>
              </div>
              
              <div className={`education-card ${expandedItems.edu4 ? 'expanded' : ''}`}>
                <div className="experience-header">
                  <div className="experience-year">2008-2015</div>
                  <h3 className="experience-title">Elementary Education</h3>
                </div>
                <div className="experience-preview">
                  <p className="experience-company">Cabiao Adventist Elementary School</p>
                </div>
                <div className="education-content">
                  <div className="education-details">
                    <p>Achievers Award</p>
                  </div>
                </div>
                <button 
                  className="expand-btn" 
                  onClick={() => toggleExpand('edu4')}
                  aria-expanded={expandedItems.edu4}
                >
                  {expandedItems.edu4 ? 'Show less' : 'See more'}
                  <span className={`expand-icon ${expandedItems.edu4 ? 'rotated' : ''}`}>↓</span>
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <p className="about-desc">I'm a software developer passionate about building applications and provide modern solutions.</p>;
    }
  };
  
  return (
    <section id="about" className="about custom-about">
      <div className="about-container">
        <div className="about-header animate-slideDown">
          <div className="about-avatar-container">
            <img src={avatarAbout} alt="Luigi About Avatar" className="about-avatar-img" />
          </div>
          <div className="about-title-container">
            <h2 className="about-title">About me</h2>
            <p className="about-subtitle">
              <span id="about-typing" ref={typingRef}></span>
              <span className="typing-cursor">|</span>
            </p>
          </div>
        </div>

        <div className="about-tabs-container animate-slideUp">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
            <button 
              className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              Experience
            </button>
            <button 
              className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              Education
            </button>
          </div>
          <div className="tabs-content">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 