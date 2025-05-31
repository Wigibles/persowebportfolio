import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Projects.css';
import bulsufindImg from '../../assets/projects/bulsufind.png';
import codingChroniclesImg from '../../assets/projects/coding-chronicles.png';
import bulsuClassroomImg from '../../assets/projects/bulsu-classroom.png';
import barbershopAppImg from '../../assets/projects/barber-appointment.png';

// Move projects and filters arrays outside component to prevent re-creation
const projects = [
  {
    id: 'barbershop-appointment',
    title: 'Barbershop Appointment System',
    image: barbershopAppImg,
    alt: 'Barbershop Appointment System Screenshot',
    brief: 'An online appointment booking system for barbershops with scheduling, service selection, and customer management.',
    categories: ['web'],
    youtubeId: 'JleOAvKj8Ug',
    status: 'Completed',
    technologies: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
    year: '2023'
  },
  {
    id: 'bulsufind',
    title: 'BulSUFind',
    image: bulsufindImg,
    alt: 'BulSUFind Screenshot',
    brief: 'A mobile app for managing lost and found items at Bulacan State University, built with Android, Java, and Firebase.',
    categories: ['mobile', 'web'],
    youtubeId: 'LOOvYX3b7dA',
    status: 'Completed',
    technologies: ['Android', 'Java', 'Firebase', 'Google Cloud Platform'],
    year: '2024'
  },
  {
    id: 'coding-chronicles',
    title: 'Coding Chronicles',
    image: codingChroniclesImg,
    alt: 'Coding Chronicles Screenshot',
    brief: 'A 2D platformer game developed for PC and Android, featuring dynamic gameplay and custom assets.',
    categories: ['game', 'mobile'],
    youtubeId: 'CZxOOZRPv8w',
    status: 'Completed',
    technologies: ['Unity', 'C#', 'Android SDK', 'Photoshop'],
    year: '2024'
  },
  {
    id: 'bulsu-classroom',
    title: 'BulSU Classroom',
    image: bulsuClassroomImg,
    alt: 'BulSU Classroom Screenshot',
    brief: 'An automated quiz and grading system with anti-cheating features and real-time monitoring.',
    categories: ['web'],
    status: 'Completed',
    technologies: ['Python', 'Django', 'JavaScript', 'Bootstrap'],
    year: '2024'
  }
];

// Filters definition
const filters = [
  { id: 'all', name: 'All Projects' },
  { id: 'web', name: 'Web Development' },
  { id: 'mobile', name: 'Mobile Apps' },
  { id: 'game', name: 'Game Development' }
];

const Projects = () => {
  const projectsRef = useRef(null);
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  
  useEffect(() => {
    // Initial filter
    setFilteredProjects(projects);
    setAnimateCards(true);
    
    // Check if the current URL has the projects hash
    if (location.hash === '#projects' && projectsRef.current) {
      // Add a class to ensure it takes up enough vertical space
      projectsRef.current.classList.add('full-height-view');
    } else if (projectsRef.current) {
      projectsRef.current.classList.remove('full-height-view');
    }
  }, [location]); // Remove projects from dependency array
  
  const handleFilterClick = useCallback((category) => {
    setActiveFilter(category);
    setAnimateCards(false);
    
    setTimeout(() => {
      if (category === 'all') {
        setFilteredProjects(projects);
      } else {
        const filtered = projects.filter(project => 
          project.categories.includes(category)
        );
        setFilteredProjects(filtered);
      }
      setAnimateCards(true);
    }, 300);
  }, []);

  const handleMouseEnter = useCallback((projectId) => {
    // Add a small delay before showing video to prevent accidental triggers
    setTimeout(() => {
      setHoveredProject(projectId);
    }, 200);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredProject(null);
  }, []);

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <h2>Projects</h2>
      
      <div className="project-filters">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter.id)}
          >
            {filter.name}
          </button>
        ))}
      </div>
      
      <div className={`projects-grid ${animateCards ? 'animate' : ''}`}>
        {filteredProjects.map((project, index) => {
          const hasVideo = project.youtubeId && hoveredProject === project.id;
          
          return (
            <Link 
              key={project.id} 
              to={`/project/${project.id}`} 
              className="project-card"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => handleMouseEnter(project.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Status Badge */}
              <div className="project-status">{project.status}</div>
              
              {/* Project Image or Video */}
              {hasVideo ? (
                <div 
                  className="project-video-container"
                  onClick={(e) => {
                    // Prevent the click from being captured by the video
                    e.stopPropagation();
                    // Navigate programmatically
                    window.location.href = `/project/${project.id}`;
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.youtubeId}&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&fs=0&cc_load_policy=0&disablekb=1&enablejsapi=1&origin=${window.location.origin}`}
                    title={`${project.title} preview`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="project-video"
                    style={{ pointerEvents: 'none' }}
                  ></iframe>
                  {/* Video overlay to ensure click navigation works */}
                  <div className="video-click-overlay"></div>
                </div>
              ) : (
                <img 
                  src={project.image} 
                  alt={project.alt} 
                  className="project-img" 
                />
              )}
              
              {/* Project Title */}
              <div className="project-title">{project.title}</div>
              
              {/* Technology Tags */}
              <div className="tech-tags">
                {project.technologies?.slice(0, 3).map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
                {project.technologies?.length > 3 && (
                  <span className="tech-tag">+{project.technologies.length - 3}</span>
                )}
              </div>
              
              {/* Project Overlay */}
              <div className={`project-card-overlay ${project.youtubeId ? 'has-video' : ''}`}>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-brief">{project.brief}</p>
                <div className="project-meta">
                  <span className="project-year">{project.year}</span>
                  <span className="project-tech-count">{project.technologies?.length} Technologies</span>
                </div>
                <span className="view-project">View Project</span>
                {project.youtubeId && (
                  <div className="video-indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#ffffff">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Projects; 