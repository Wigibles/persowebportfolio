import React from 'react';
import './Skills.css';
import htmlIcon from '../../assets/skills/html5.png';
import cssIcon from '../../assets/skills/css3.png';
import jsIcon from '../../assets/skills/js.png';
import bootstrapIcon from '../../assets/skills/bootstrap5.png';
import gitIcon from '../../assets/skills/git.png';
import javaIcon from '../../assets/skills/java.png';
import pythonIcon from '../../assets/skills/python.png';
import csharpIcon from '../../assets/skills/csharp.png';
import gcloudIcon from '../../assets/skills/gcloud.png';
import postmanIcon from '../../assets/skills/postman.png';
import androidIcon from '../../assets/skills/android.png';
import firebaseIcon from '../../assets/skills/firebase.png';

const Skills = () => {
  const skills = [
    { name: 'HTML5', icon: htmlIcon },
    { name: 'CSS3', icon: cssIcon },
    { name: 'JavaScript', icon: jsIcon },
    { name: 'Bootstrap 5', icon: bootstrapIcon },
    { name: 'Git', icon: gitIcon },
    { name: 'Java', icon: javaIcon },
    { name: 'Python', icon: pythonIcon },
    { name: 'C#', icon: csharpIcon },
    { name: 'Google Cloud', icon: gcloudIcon },
    { name: 'Postman', icon: postmanIcon },
    { name: 'Android', icon: androidIcon },
    { name: 'Firebase', icon: firebaseIcon }
  ];

  return (
    <section id="skills" className="skills">
      <h2>Skills</h2>
      <p className="skills-subtitle">My Techstack that I use in my projects!</p>
      <div className="skills-simple-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <img src={skill.icon} alt={skill.name} title={skill.name} />
            <span className="skill-label">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills; 