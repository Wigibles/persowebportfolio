import { useEffect } from 'react';

const SectionObserver = () => {
  useEffect(() => {
    const animateSections = () => {
      const sections = document.querySelectorAll('section');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate children with staggered delay
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('visible');
              }, 100 * index);
            });
          }
        });
      }, { threshold: 0.1 });
      
      sections.forEach(section => {
        section.classList.add('section-animate');
        
        // Add animation class to elements that should animate on scroll
        const animateElements = section.querySelectorAll('h1, h2, h3, p, .btn, .project-card, .skill-card');
        animateElements.forEach(el => {
          el.classList.add('animate-on-scroll');
        });
        
        observer.observe(section);
      });
      
      // Return the observer for cleanup
      return observer;
    };
    
    // Wait for the page to fully load before setting up animations
    let observer;
    const timer = setTimeout(() => {
      observer = animateSections();
    }, 100);
    
    return () => {
      // Cleanup timer and observer
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);
  
  return null;
};

export default SectionObserver; 