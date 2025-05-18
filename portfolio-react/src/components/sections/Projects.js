import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Projects.css';
import bulsufindImg from '../../assets/projects/bulsufind.png';
import codingChroniclesImg from '../../assets/projects/coding-chronicles.png';
import bulsuClassroomImg from '../../assets/projects/bulsu-classroom.png';

const Projects = () => {
  const projectsRef = useRef(null);
  const location = useLocation();
  
  useEffect(() => {
    // Check if the current URL has the projects hash
    if (location.hash === '#projects' && projectsRef.current) {
      // Add a class to ensure it takes up enough vertical space
      projectsRef.current.classList.add('full-height-view');
    } else if (projectsRef.current) {
      projectsRef.current.classList.remove('full-height-view');
    }
  }, [location]);
  
  const projects = [
    {
      id: 'bulsufind',
      title: 'BulSUFind',
      image: bulsufindImg,
      alt: 'BulSUFind Screenshot'
    },
    {
      id: 'coding-chronicles',
      title: 'Coding Chronicles',
      image: codingChroniclesImg,
      alt: 'Coding Chronicles Screenshot'
    },
    {
      id: 'bulsu-classroom',
      title: 'BulSU Classroom',
      image: bulsuClassroomImg,
      alt: 'BulSU Classroom Screenshot'
    }
  ];

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <Link 
            key={project.id} 
            to={`/project/${project.id}`} 
            className="project-card"
          >
            <img 
              src={project.image} 
              alt={project.alt} 
              className="project-img" 
            />
            <div className="project-title">{project.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Projects; 