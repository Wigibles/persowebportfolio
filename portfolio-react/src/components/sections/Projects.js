import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Projects.css';
import bulsufindImg from '../../assets/projects/bulsufind.png';
import codingChroniclesImg from '../../assets/projects/coding-chronicles.png';
import bulsuClassroomImg from '../../assets/projects/bulsu-classroom.png';

const Projects = () => {
  const projectsRef = useRef(null);
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [animateCards, setAnimateCards] = useState(false);
  
  const projects = [
    {
      id: 'bulsufind',
      title: 'BulSUFind',
      image: bulsufindImg,
      alt: 'BulSUFind Screenshot',
      brief: 'A mobile app for managing lost and found items at Bulacan State University, built with Android, Java, and Firebase.',
      categories: ['mobile', 'web']
    },
    {
      id: 'coding-chronicles',
      title: 'Coding Chronicles',
      image: codingChroniclesImg,
      alt: 'Coding Chronicles Screenshot',
      brief: 'A 2D platformer game developed for PC and Android, featuring dynamic gameplay and custom assets.',
      categories: ['game', 'mobile']
    },
    {
      id: 'bulsu-classroom',
      title: 'BulSU Classroom',
      image: bulsuClassroomImg,
      alt: 'BulSU Classroom Screenshot',
      brief: 'An automated quiz and grading system with anti-cheating features and real-time monitoring.',
      categories: ['web']
    }
  ];

  // Filters definition
  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'game', name: 'Game Development' }
  ];
  
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
  }, [location]);
  
  const handleFilterClick = (category) => {
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
  };

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
        {filteredProjects.map((project, index) => (
          <Link 
            key={project.id} 
            to={`/project/${project.id}`} 
            className="project-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img 
              src={project.image} 
              alt={project.alt} 
              className="project-img" 
            />
            <div className="project-title">{project.title}</div>
            <div className="project-card-overlay">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-brief">{project.brief}</p>
              <span className="view-project">View Project</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Projects; 