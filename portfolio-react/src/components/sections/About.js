import React, { useEffect, useRef } from 'react';
import './About.css';
import avatarAbout from '../../assets/avatar-about.png';
import linkedinIcon from '../../assets/socials/3d-icon-linkedin.png';
import githubIcon from '../../assets/socials/3d-icon-github.png';
import facebookIcon from '../../assets/socials/3d-icon-facebook.png';

const About = () => {
  const typingRef = useRef(null);
  
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
  
  return (
    <section id="about" className="about custom-about">
      <div className="about-card about-flex">
        <div className="about-left">
          <img src={avatarAbout} alt="Luigi About Avatar" className="about-avatar-img" />
        </div>
        <div className="about-right">
          <h2 className="about-title">About me</h2>
          <p className="about-subtitle"><span id="about-typing" ref={typingRef}></span><span className="typing-cursor">|</span></p>
          <p className="about-desc">I'm a software developer passionate about building applications and provide modern solutions. I create complex app features, integrate them into systems, and enjoy solving real-world problems—whether it's web, mobile, or full-stack. Always up for a challenge and learning more!</p>
          <div className="about-row">
            <a href="/assets/Luigi Santiago Resume.pdf" className="btn about-btn primary" download="Luigi-Santiago-Resume.pdf">Download CV</a>
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
    </section>
  );
};

export default About; 