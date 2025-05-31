import React, { useEffect, useRef, useState, useCallback } from 'react';
import './About.css';
import avatarAbout from '../../assets/avatar-about.png';
import linkedinIcon from '../../assets/socials/3d-icon-linkedin.png';
import githubIcon from '../../assets/socials/3d-icon-github.png';
import facebookIcon from '../../assets/socials/3d-icon-facebook.png';

// Certificate imports
import javaUnitTestingImg from '../../assets/certificate/Java Unit Testing.jpg';
import javaUnitTestingPdf from '../../assets/certificate/Java Unit Testing.pdf';
import springBootImg from '../../assets/certificate/Spring Boot 3 Spring 6 & Hibernate.jpg';
import springBootPdf from '../../assets/certificate/Spring Boot 3 Spring 6 & Hibernate.pdf';
import dockerImg from '../../assets/certificate/Docker.jpg';
import dockerPdf from '../../assets/certificate/Docker.pdf';
import javaMasterclassImg from '../../assets/certificate/Java Masterclass 2025.jpg';
import javaMasterclassPdf from '../../assets/certificate/Java Masterclass.pdf';
import gitImg from '../../assets/certificate/Git.jpg';
import gitPdf from '../../assets/certificate/Git.pdf';
import eclipseImg from '../../assets/certificate/Eclipse IDE.jpg';
import eclipsePdf from '../../assets/certificate/Eclipse IDE.pdf';
import mavenImg from '../../assets/certificate/Maven Crash Course.jpg';
import mavenPdf from '../../assets/certificate/Maven.pdf';
import angularImg from '../../assets/certificate/Angular.jpg';
import angularPdf from '../../assets/certificate/Angular.pdf';
import fullStackImg from '../../assets/certificate/The Complete Full-Stack Web Development Bootcamp.jpg';
import fullStackPdf from '../../assets/certificate/The Complete Full-Stack Web Development Bootcamp.pdf';
import vscodeImg from '../../assets/certificate/Udemy-VSCode.jpg';
import vscodePdf from '../../assets/certificate/Udemy-VSCode.pdf';

// Udemy logo
import udemyLogo from '../../assets/socials/udemy-transparent-logo-free-png.webp';

// Certificate data - moved outside component to prevent re-creation on every render
const certificates = [
  {
    id: 1,
    title: "Java Masterclass",
    image: javaMasterclassImg,
    pdf: javaMasterclassPdf,
    issuer: "Udemy",
    certificateId: "UC-83c2f48c-218c-4565-ba38-cd6b7c3c6903",
    description: "Complete Java programming course covering core concepts and advanced topics. Also created projects using OOP concepts.",
    skills: ["Java", "OOP", "Data Structures", "Algorithms"]
  },
  {
    id: 2,
    title: "Spring Boot 3, Spring 6 & Hibernate",
    image: springBootImg,
    pdf: springBootPdf,
    issuer: "Udemy",
    certificateId: "UC-c407d867-fae5-4dfa-84a6-4bfaed4e341d",
    description: "Advanced Spring Boot development with Spring Framework 6 and Hibernate ORM.",
    skills: ["Spring Boot", "Spring Framework", "Hibernate", "REST APIs"]
  },
  {
    id: 3,
    title: "Full-Stack Web Development Bootcamp",
    image: fullStackImg,
    pdf: fullStackPdf,
    issuer: "Udemy",
    certificateId: "UC-708f2806-d22e-49ed-8f02-cc51aa059e98",
    description: "This certificate above verifies that Luigi C. Santiago successfully completed the course The Complete Full-Stack Web Development Bootcamp on 02/10/2025 as taught by Dr. Angela Yu, Developer and Lead Instructor on Udemy. The certificate indicates the entire course was completed as validated by the student. The course duration represents the total video hours of the course at time of most recent completion.",
    skills: ["Full-Stack", "Web Development"]
  },
  {
    id: 4,
    title: "Java Unit Testing",
    image: javaUnitTestingImg,
    pdf: javaUnitTestingPdf,
    issuer: "Udemy",
    certificateId: "UC-a6c5dd1e-f05b-480b-ba46-cac41dde9e96",
    description: "Comprehensive course covering JUnit, Mockito, and testing best practices for Java applications.",
    skills: ["JUnit", "Mockito", "Test-Driven Development", "Unit Testing"]
  },
  {
    id: 5,
    title: "Git Version Control",
    image: gitImg,
    pdf: gitPdf,
    issuer: "Udemy",
    certificateId: "UC-a0cb8cc8-c490-4d16-b1c0-75e560dfa994",
    description: "Version control system fundamentals and advanced Git workflows.",
    skills: ["Git", "Version Control", "GitHub", "Collaboration"]
  },
  {
    id: 6,
    title: "Eclipse IDE",
    image: eclipseImg,
    pdf: eclipsePdf,
    issuer: "Udemy",
    certificateId: "UC-af6dc7c5-d7cb-4365-a304-e3a205d629e3",
    description: "Mastering Eclipse IDE for Java development and productivity.",
    skills: ["Eclipse IDE", "Java Development", "Debugging", "Productivity"]
  },
  {
    id: 7,
    title: "Maven Crash Course",
    image: mavenImg,
    pdf: mavenPdf,
    issuer: "Udemy",
    certificateId: "UC-7e78a262-f149-4796-a1ac-4c155c5aae34",
    description: "Build automation and dependency management with Apache Maven.",
    skills: ["Maven", "Build Automation", "Dependency Management", "Project Structure"]
  },
  {
    id: 8,
    title: "Angular",
    image: angularImg,
    pdf: angularPdf,
    issuer: "Udemy",
    certificateId: "UC-ec207e2d-c600-4b2d-8532-9e3b9e7d025e",
    description: "This certificate above verifies that Luigi C. Santiago successfully completed the course Angular - The Complete Guide (2025 Edition) on 02/25/2025 as taught by Maximilian Schwarzmüller on Udemy. The certificate indicates the entire course was completed as validated by the student. The course duration represents the total video hours of the course at time of most recent completion.",
    skills: ["Angular", "TypeScript", "Frontend Development"]
  },
  {
    id: 9,
    title: "Docker for the Absolute Beginner - Hands On DevOps",
    image: dockerImg,
    pdf: dockerPdf,
    issuer: "Udemy",
    certificateId: "UC-98454763-f57d-4f77-99f5-c480a6c494ab",
    description: "Container technology and Docker fundamentals for application deployment.",
    skills: ["Docker", "Containerization", "DevOps", "Deployment"]
  },
  {
    id: 10,
    title: "Visual Studio Code",
    image: vscodeImg,
    pdf: vscodePdf,
    issuer: "Udemy",
    certificateId: "UC-28f46a6b-cd2f-412e-9cd4-8759896e824a",
    description: "Mastering VS Code for efficient development workflow and productivity.",
    skills: ["VS Code", "Extensions", "Productivity"]
  }
];

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
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [viewMode, setViewMode] = useState('tabs'); // 'tabs' or 'certificate-detail'
  
  const toggleExpand = useCallback((id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const openCertificateDetail = useCallback((certificate) => {
    setSelectedCertificate(certificate);
    setViewMode('certificate-detail');
  }, []);

  const backToAbout = useCallback(() => {
    setSelectedCertificate(null);
    setViewMode('tabs');
  }, []);

  const downloadCertificate = useCallback((pdfUrl, title) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const openUdemyCertificate = useCallback((certificateId) => {
    const udemyUrl = `https://www.udemy.com/certificate/${certificateId}/`;
    window.open(udemyUrl, '_blank', 'noopener,noreferrer');
  }, []);
  
  useEffect(() => {
    // Only run typing effect when in tabs view mode and ref is available
    if (viewMode !== 'tabs' || !typingRef.current) return;
    
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
    let isActive = true; // Flag to prevent updates after cleanup
    
    const type = () => {
      if (!isActive || !typingRef.current) return;
      
      const currentRole = roles[roleIndex];
      if (typing) {
        if (charIdx <= currentRole.length) {
          typingRef.current.textContent = currentRole.substring(0, charIdx);
          charIdx++;
          timer = setTimeout(type, typingSpeed);
        } else {
          typing = false;
          timer = setTimeout(type, pause);
        }
      } else {
        if (charIdx >= 0) {
          typingRef.current.textContent = currentRole.substring(0, charIdx);
          charIdx--;
          timer = setTimeout(type, backSpeed);
        } else {
          typing = true;
          roleIndex = (roleIndex + 1) % roles.length;
          timer = setTimeout(type, loopPause);
        }
      }
    };
    
    // Start typing effect with a small delay to ensure DOM is ready
    const startTimer = setTimeout(() => {
      if (isActive) {
        type();
      }
    }, 100);
    
    return () => {
      isActive = false;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (startTimer) {
        clearTimeout(startTimer);
      }
    };
  }, [viewMode]); // Only depend on viewMode
  
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
      case 'certificates':
        const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, 3);
        return (
          <div className="certificates-container animate-fadeIn">
            <div className="certificates-grid">
              {displayedCertificates.map((cert) => (
                <div 
                  key={cert.id} 
                  className="certificate-item"
                  onClick={() => openCertificateDetail(cert)}
                >
                  <div className="certificate-content">
                    <div className="certificate-icon">
                      <img src={udemyLogo} alt="Udemy Logo" className="udemy-logo" />
                    </div>
                    <h4 className="certificate-title">{cert.title}</h4>
                    <p className="certificate-issuer">{cert.issuer}</p>
                    <div className="certificate-link">
                      <span 
                        className="view-details"
                        onClick={(e) => {
                          e.stopPropagation();
                          openUdemyCertificate(cert.certificateId);
                        }}
                      >
                        View on Udemy
                      </span>
                      <span className="external-link-icon">↗</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {certificates.length > 3 && (
              <div className="certificates-actions">
                <button 
                  className="see-more-btn"
                  onClick={() => setShowAllCertificates(!showAllCertificates)}
                >
                  {showAllCertificates ? 'Show Less' : `See More (${certificates.length - 3} more)`}
                </button>
              </div>
            )}
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
                <p className="experience-description">Intern under Academic Accenture Academy</p>
                <ul className="experience-detail-list">
                  <li>Developed small projects using latest technologies</li>
                  <li>Gained several Udemy courses Certificates</li>
                  <li>Learned more programming languages during the program</li>
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
                  <li>Learned and gained expertise in Salesforce platform administration</li>
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
                  <h3 className="experience-title">Senior High School</h3>
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

  const renderCertificateDetail = () => {
    if (!selectedCertificate) return null;

    return (
      <div className="certificate-detail-container animate-fadeIn">
        <div className="certificate-detail-header">
          <button className="back-btn" onClick={backToAbout}>
            ← Back to About
          </button>
          <h2 className="certificate-detail-title">Certificate Details</h2>
        </div>
        
        <div className="certificate-detail-content">
          <div className="certificate-detail-image-section">
            <div className="certificate-detail-image-container">
              <img 
                src={selectedCertificate.image} 
                alt={selectedCertificate.title}
                className="certificate-detail-image"
              />
            </div>
          </div>
          
          <div className="certificate-detail-info">
            <div className="certificate-detail-header-info">
              <h3 className="certificate-detail-name">{selectedCertificate.title}</h3>
              <p className="certificate-detail-issuer">Issued by: {selectedCertificate.issuer}</p>
            </div>
            
            <div className="certificate-detail-description">
              <h4>About this Certificate</h4>
              <p>{selectedCertificate.description}</p>
            </div>
            
            <div className="certificate-detail-skills">
              <h4>Skills Covered</h4>
              <div className="skills-tags">
                {selectedCertificate.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="certificate-detail-actions">
              <button 
                className="download-certificate-btn"
                onClick={() => downloadCertificate(selectedCertificate.pdf, selectedCertificate.title)}
              >
                Download Certificate PDF
              </button>
              <button 
                className="view-udemy-btn"
                onClick={() => openUdemyCertificate(selectedCertificate.certificateId)}
              >
                View on Udemy
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <section id="about" className="about custom-about">
      <div className="about-container">
        {viewMode === 'tabs' ? (
          <>
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
                  className={`tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
                  onClick={() => setActiveTab('certificates')}
                >
                  Certificates
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
          </>
        ) : (
          renderCertificateDetail()
        )}
      </div>
    </section>
  );
};

export default About; 