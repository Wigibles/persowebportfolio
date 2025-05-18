import React, { useEffect, useRef } from 'react';
import './Hero.css';
import avatarHero from '../../assets/avatar-hero.png';
import linkedinIcon from '../../assets/socials/3d-icon-linkedin.png';
import githubIcon from '../../assets/socials/3d-icon-github.png';
import facebookIcon from '../../assets/socials/3d-icon-facebook.png';

const Hero = () => {
  const typingRef = useRef(null);
  
  useEffect(() => {
    if (!typingRef.current) return;
    
    const roles = [
      'Web Development',
      'Mobile Development',
      'Java Developer',
      'FullStack Developer'
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="home" className="hero custom-hero">
      <div className="hero-content-centered">
        <h1 className="hero-title fade-in">Luigi Santiago</h1>
        <p className="hero-subtitle">
          <span id="hero-typing" ref={typingRef}></span>
          <span className="typing-cursor">|</span>
        </p>
        <div className="hero-buttons">
          <button onClick={() => scrollToSection('contact')} className="btn hero-btn primary">Get in touch</button>
          <a 
            href="/assets/Luigi%20Santiago%20Resume.pdf" 
            className="btn hero-btn secondary" 
            download="Luigi-Santiago-Resume.pdf"
          >
            Download CV
          </a>
        </div>
      </div>
      <div className="hero-right">
        <div className="avatar-card">
          <img src={avatarHero} alt="Luigi Hero Avatar" className="avatar-img" />
        </div>
        <div className="social-vertical">
          <a 
            href="https://www.linkedin.com/in/luigiatlinkdin/" 
            className="social-icon" 
            title="LinkedIn" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img src={linkedinIcon} alt="LinkedIn" className="social-img" />
          </a>
          <a 
            href="https://github.com/Wigibles" 
            className="social-icon" 
            title="GitHub" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="GitHub" className="social-img" />
          </a>
          <a 
            href="https://www.facebook.com/luigisantiago231" 
            className="social-icon" 
            title="Facebook" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img src={facebookIcon} alt="Facebook" className="social-img" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero; 