import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProjectDetail.css';
import linkedinIcon from '../../assets/socials/3d-icon-linkedin.png';
import githubIcon from '../../assets/socials/3d-icon-github.png';
import facebookIcon from '../../assets/socials/3d-icon-facebook.png';
import bulsufindImg from '../../assets/projects/bulsufind.png';
import codingChroniclesImg from '../../assets/projects/coding-chronicles.png';
import bulsuClassroomImg from '../../assets/projects/bulsu-classroom.png';
import barbershopAppImg from '../../assets/projects/barber-appointment.png';

const ProjectDetail = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { id } = useParams();
  
  // Project data hardcoded to match the original
  const projects = [
    {
      id: 'barbershop-appointment',
      title: 'Barbershop Appointment System',
      year: 2023,
      role: 'Full-Stack Developer',
      desc: 'Created a prototype of a Barbershop Website System using HTML, CSS, JavaScript, PHP, and MySQL. This system was developed as our final project in our System Analysis and Design course subject. The application features online appointment booking, service selection, and customer management capabilities.',
      media: [
        { type: 'image', src: barbershopAppImg, alt: 'Barbershop Appointment System Screenshot' },
        { type: 'video', src: 'https://youtu.be/JleOAvKj8Ug', alt: 'Barbershop Appointment System Demo' }
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap', 'AJAX', 'Full-Stack Development'],
      links: [
        { label: 'Watch Demo', url: 'https://youtu.be/JleOAvKj8Ug' }
      ]
    },
    {
      id: 'bulsufind',
      title: 'BulSUFind',
      year: 2024,
      role: 'Web & Mobile Developer',
      desc: 'A mobile app for managing lost and found items at Bulacan State University. Built with native Android, Java, Google API, REST, and Firebase, it streamlines item reporting, searching (including image-based search), real-time notifications, and user chat for efficient recovery and communication.',
      media: [
        { type: 'image', src: bulsufindImg, alt: 'BulSUFind Screenshot' },
        { type: 'video', src: 'https://youtu.be/LOOvYX3b7dA', alt: 'BulSUFind Demo Video' }
      ],
      tech: ['Java', 'JavaScript', 'Android', 'Google API / GCloud', 'REST', 'Firebase'],
      links: [
        { label: 'Watch Demo', url: 'https://youtu.be/LOOvYX3b7dA' }
      ]
    },
    {
      id: 'coding-chronicles',
      title: 'Coding Chronicles',
      year: 2024,
      role: 'Lead Programmer & Game Designer',
      desc: 'Led development of a 2D platformer game, building the core gameplay, physics, and cross-platform architecture for PC and Android. Created most visual assets and coordinated integration of all game elements for a cohesive experience.',
      media: [
        { type: 'image', src: codingChroniclesImg, alt: 'Coding Chronicles Screenshot' },
        { type: 'video', src: 'https://www.youtube.com/watch?v=CZxOOZRPv8w', alt: 'Coding Chronicles Trailer' }
      ],
      tech: ['Unity', 'C#', 'Android'],
      links: [
        { label: 'YouTube Demo', url: 'https://www.youtube.com/watch?v=CZxOOZRPv8w' }
      ]
    },
    {
      id: 'bulsu-classroom',
      title: 'BulSU Classroom',
      year: 2024,
      role: 'Quiz System & Assessment Module Lead',
      desc: 'Developed an automated quiz and grading system with anti-cheating features, real-time monitoring, and grade computation. Designed user interfaces and integrated the system with other platform features using JavaScript and browser APIs.',
      media: [
        { type: 'image', src: bulsuClassroomImg, alt: 'BulSU Classroom Screenshot' }
      ],
      tech: ['JavaScript', 'Bootstrap', 'Python', 'Browser APIs'],
      links: []
    }
  ];

  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Project not found</h2>
        <Link to="/" className="btn back-btn">Back to Home</Link>
      </div>
    );
  }

  const isYouTubeUrl = (url) => {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
  };

  const extractYouTubeId = (url) => {
    const ytMatch = url.match(/[?&]v=([^&#]+)/) || url.match(/youtu\.be\/([^?&#]+)/);
    return ytMatch ? ytMatch[1] : '';
  };

  // Track embedded YouTube video IDs
  const embeddedYouTubeIds = new Set();

  return (
    <main className="project-detail-main">
      <div className={`project-card-detail ${project.media.length > 1 ? 'landscape' : 'single-col'}`}>
        <div className="project-card-media">
          {project.media.map((m, index) => {
            if (m.type === 'image') {
              return (
                <img 
                  key={index}
                  src={m.src} 
                  alt={m.alt || project.title} 
                  className="project-detail-img" 
                />
              );
            } else if (m.type === 'video' && isYouTubeUrl(m.src)) {
              const videoId = extractYouTubeId(m.src);
              if (videoId) {
                embeddedYouTubeIds.add(videoId);
                return (
                  <iframe
                    key={index}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    className="project-detail-iframe"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${project.title} video`}
                  ></iframe>
                );
              }
              return null;
            }
            return null;
          })}
        </div>
        <div className="project-card-info">
          <Link to="/#projects" className="btn project-back-btn">&larr; Back to Projects</Link>
          <h1 className="project-detail-title">{project.title}</h1>
          <div className="project-meta">
            <b>Year:</b> {project.year}
          </div>
          <div className="project-meta">
            <b>Role:</b> {project.role}
          </div>
          <p className="project-detail-desc">{project.desc}</p>
          <div className="project-detail-tech">
            {project.tech.map((tech, index) => (
              <span key={index} className="project-detail-tech-item">{tech}</span>
            ))}
          </div>
          <div className="project-detail-links">
            {project.links && project.links.map((link, index) => {
              if (isYouTubeUrl(link.url)) {
                const videoId = extractYouTubeId(link.url);
                if (videoId && !embeddedYouTubeIds.has(videoId)) {
                  return (
                    <a 
                      key={index} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  );
                }
              }
              return (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              );
            })}
          </div>
          <div className="project-socials">
            <a href="https://www.linkedin.com/in/luigiatlinkdin/" className="about-social-icon" title="LinkedIn" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="social-img" />
            </a>
            <a href="https://github.com/Wigibles" className="about-social-icon" title="GitHub" target="_blank" rel="noopener noreferrer">
              <img src={githubIcon} alt="GitHub" className="social-img" />
            </a>
            <a href="https://www.facebook.com/luigisantiago231" className="about-social-icon" title="Facebook" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" className="social-img" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail; 