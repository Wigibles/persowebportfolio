// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add animation to skill items
const skillItems = document.querySelectorAll('.skill-item');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

skillItems.forEach(item => {
    observer.observe(item);
});

// Add animation to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    observer.observe(card);
});

// Typing animation for hero title
const typingText = document.getElementById('typing-text');
const cursor = document.querySelector('.typing-cursor');
const textToType = "Hello, I'm Luigi";
const typingSpeed = 100;
const deletingSpeed = 60;
const delayAfterTyping = 1200;
const delayAfterDeleting = 500;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
    if (!isDeleting && charIndex <= textToType.length) {
        typingText.textContent = textToType.substring(0, charIndex);
        charIndex++;
        setTimeout(typeLoop, typingSpeed);
    } else if (isDeleting && charIndex >= 0) {
        typingText.textContent = textToType.substring(0, charIndex);
        charIndex--;
        setTimeout(typeLoop, deletingSpeed);
    } else if (!isDeleting && charIndex > textToType.length) {
        isDeleting = true;
        setTimeout(typeLoop, delayAfterTyping);
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        setTimeout(typeLoop, delayAfterDeleting);
    }
}

typeLoop();

// (Fade-in on scroll for sections removed) 

const chatbotuiToggle = document.getElementById('chatbotui-toggle');
const chatbotuiIframe = document.getElementById('chatbotui-iframe');
chatbotuiToggle.onclick = () => {
  chatbotuiIframe.style.display = chatbotuiIframe.style.display === 'block' ? 'none' : 'block';
}; 