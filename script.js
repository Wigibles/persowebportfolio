// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen when all resources are loaded
    window.addEventListener('load', () => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.classList.add('fade-out');
        
        // Remove loading screen from DOM after fade out
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navContainer = document.querySelector('.nav-container');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.mobile-menu-overlay');
const body = document.body;

function toggleMenu() {
    hamburger.classList.toggle('active');
    navContainer.classList.toggle('active');
    overlay.classList.toggle('active');
    body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
}

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navContainer.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }
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
                toggleMenu();
            }
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
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
}

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

function startTypingEffect(targetElement, roles, typingSpeed = 90, backSpeed = 50, pause = 1200, loopPause = 400) {
    let roleIndex = 0;
    let charIdx = 0;
    let typing = true;

    function type() {
        const currentRole = roles[roleIndex];
        if (typing) {
            if (charIdx <= currentRole.length) {
                targetElement.textContent = currentRole.substring(0, charIdx);
                charIdx++;
                setTimeout(type, typingSpeed);
            } else {
                typing = false;
                setTimeout(type, pause);
            }
        } else {
            if (charIdx >= 0) {
                targetElement.textContent = currentRole.substring(0, charIdx);
                charIdx--;
                setTimeout(type, backSpeed);
            } else {
                typing = true;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, loopPause);
            }
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', function() {
    const heroTyping = document.getElementById('hero-typing');
    const aboutTyping = document.getElementById('about-typing');

    if (heroTyping) startTypingEffect(heroTyping, [
        'Web Development',
        'Mobile Development',
        'Java Developer',
        'FullStack Developer'
    ]);
    if (aboutTyping) startTypingEffect(aboutTyping, [
        'Software Developer',
        'Java Developer',
        'FullStack Developer',
        'Problem Solver'
    ]);

    // Real-time clock in footer
    function updateFooterClock() {
        const clock = document.getElementById('footer-clock');
        if (clock) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            clock.textContent = timeString;
        }
    }
    setInterval(updateFooterClock, 1000);
    updateFooterClock();
});

const chatbotuiToggle = document.getElementById('chatbotui-toggle');
const chatbotuiIframe = document.getElementById('chatbotui-iframe');
chatbotuiToggle.onclick = () => {
  chatbotuiIframe.style.display = chatbotuiIframe.style.display === 'block' ? 'none' : 'block';
};

// Accessibility: Close menu with Escape key and trap focus
function closeMenu() {
    hamburger.classList.remove('active');
    navContainer.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (navContainer.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeMenu();
        }
        // Focus trap
        const focusableLinks = navContainer.querySelectorAll('.nav-link');
        if (focusableLinks.length > 0) {
            const first = focusableLinks[0];
            const last = focusableLinks[focusableLinks.length - 1];
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    }
}); 