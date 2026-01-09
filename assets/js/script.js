// assets/js/script.js

// ========== DOM ELEMENTS ==========
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const menu = document.getElementById('menu');
const menuLinks = document.querySelectorAll('.header-menu a');
const bgVideo = document.getElementById('bgVideo');

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== MOBILE MENU TOGGLE ==========
mobileToggle.addEventListener('click', function() {
    menu.classList.toggle('active');
    
    // Animate hamburger icon
    const icon = this.querySelector('i');
    if (menu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ========== CLOSE MENU ON LINK CLICK ==========
menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        menu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== VIDEO BACKGROUND OPTIMIZATION ==========
// Pause video when not in viewport (performance optimization)
const heroSection = document.querySelector('.hero');
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            bgVideo.play();
        } else {
            bgVideo.pause();
        }
    });
}, { threshold: 0.5 });

videoObserver.observe(heroSection);

// ========== SCROLL ANIMATIONS ==========
// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .member-card, .music-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== ACTIVE MENU LINK HIGHLIGHT ==========
const sections = document.querySelectorAll('section[id]');

function highlightMenuLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.header-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightMenuLink);

// ========== VIDEO FALLBACK ==========
// Check if video can play
bgVideo.addEventListener('error', function() {
    console.error('Video could not be loaded. Using fallback background.');
    const videoContainer = document.querySelector('.video-container');
    videoContainer.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)';
});

// ========== LOADING OPTIMIZATION ==========
window.addEventListener('load', function() {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
    
    // Ensure video plays on mobile devices
    if (bgVideo && bgVideo.paused) {
        bgVideo.play().catch(error => {
            console.log('Video autoplay prevented:', error);
        });
    }
});

// ========== CLOSE MENU ON OUTSIDE CLICK ==========
document.addEventListener('click', function(event) {
    const isClickInsideMenu = menu.contains(event.target);
    const isClickOnToggle = mobileToggle.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains('active')) {
        menu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ========== CONSOLE MESSAGE ==========
console.log('%cEchoDome Website', 'color: #ff6b35; font-size: 24px; font-weight: bold;');
console.log('%cWebsite loaded successfully! 🎸', 'color: #f7931e; font-size: 16px;');