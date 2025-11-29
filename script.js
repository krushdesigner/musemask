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
        }
    });
});

// ===== MENU OVERLAY FUNCTIONALITY =====
const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuLinks = document.querySelectorAll('.menu-link');
const pageTransition = document.querySelector('.page-transition');

let menuOpen = false;

// Toggle menu
function toggleMenu() {
    menuOpen = !menuOpen;
    
    if (menuOpen) {
        menuToggle.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Event listeners
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// Menu link click - navigate with transition
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        // Add page transition
        if (pageTransition) {
            pageTransition.classList.add('active');
            
            setTimeout(() => {
                window.location.href = href;
            }, 600);
        } else {
            window.location.href = href;
        }
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
        toggleMenu();
    }
});

// Close menu when clicking outside content
if (menuOverlay) {
    menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay) {
            toggleMenu();
        }
    });
}

// Intersection Observer for portfolio items
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe portfolio items
document.addEventListener('DOMContentLoaded', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        observer.observe(item);
    });

    // Add hover effect to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });

        // Remove initial transform when not hovering
        setTimeout(() => {
            item.addEventListener('mouseleave', function() {
                if (!this.matches(':hover')) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });
        }, 1000);
    });
});

// Parallax effect on scroll
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-image');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        });
        ticking = true;
    }
});

// ===== BULB MOUSE FOLLOW ANIMATION =====
const hero = document.querySelector('.hero');
const bulbContainer = document.querySelector('.bulb-container');

if (hero && bulbContainer) {
    let isHovering = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    
    hero.addEventListener('mouseenter', () => {
        isHovering = true;
        bulbContainer.classList.add('mouse-active');
    });
    
    hero.addEventListener('mouseleave', () => {
        isHovering = false;
        bulbContainer.classList.remove('mouse-active');
        // Reset bulb position smoothly
        targetX = 0;
        targetY = 0;
    });
    
    hero.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        
        const rect = hero.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate mouse position relative to center
        const mouseX = e.clientX - rect.left - centerX;
        const mouseY = e.clientY - rect.top - centerY;
        
        // Calculate rotation angles (limited range)
        targetX = (mouseY / centerY) * 15; // Max 15 degrees
        targetY = (mouseX / centerX) * -20; // Max 20 degrees
    });
    
    // Smooth animation loop
    function animateBulb() {
        // Smooth interpolation
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        
        // Apply transform with glow effect intensity based on movement
        const glowIntensity = Math.abs(currentX) + Math.abs(currentY);
        const scale = 1 + (glowIntensity * 0.002);
        
        bulbContainer.style.transform = `
            perspective(1000px) 
            rotateX(${currentX}deg) 
            rotateY(${currentY}deg)
            scale(${scale})
        `;
        
        requestAnimationFrame(animateBulb);
    }
    
    animateBulb();
}

// Navbar show/hide on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
let scrolling = false;

window.addEventListener('scroll', () => {
    if (!scrolling) {
        window.requestAnimationFrame(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            scrolling = false;
        });
        scrolling = true;
    }
});

// Add animation to hero title words with stagger effect
document.addEventListener('DOMContentLoaded', () => {
    const words = document.querySelectorAll('.hero-title .word');
    
    words.forEach((word, index) => {
        // Add emphasis to specific words
        const emphasisWords = ['BROCHURES', 'BOOKS', 'PHARMA COLLATERALS'];
        if (emphasisWords.some(ew => word.textContent.includes(ew))) {
            word.style.fontWeight = '900';
        }
        
        // Add underline animation to specific keywords
        const underlineWords = ['BRANDING', 'EXHIBITION', 'EXPERIENTIAL DESIGN', 'PRINT ADS'];
        if (underlineWords.some(uw => word.textContent.includes(uw))) {
            word.style.borderBottom = '3px solid #000';
            word.style.display = 'inline-block';
            word.style.paddingBottom = '2px';
        }
    });
});

// Add ripple effect on click
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.position = 'fixed';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(201, 42, 42, 0.5)';
    ripple.style.pointerEvents = 'none';
    ripple.style.left = e.clientX - 10 + 'px';
    ripple.style.top = e.clientY - 10 + 'px';
    ripple.style.animation = 'ripple-expand 0.6s ease-out forwards';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-expand {
        to {
            transform: scale(10);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Portfolio item click effect
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        this.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
});

// Lazy loading for images (when actual images are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    // This will work when images with data-src are added
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Social links hover effect
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(10deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Footer links animation
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.paddingLeft = '10px';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.paddingLeft = '0';
    });
});

// Custom cursor effect (optional enhancement)
document.addEventListener('mousemove', (e) => {
    // This can be enhanced with a custom cursor element if needed
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            item.style.setProperty('--mouse-x', x + 'px');
            item.style.setProperty('--mouse-y', y + 'px');
        }
    });
});

console.log('Moxwell Media - Website loaded successfully!');

// ===== PORTFOLIO FILTER FUNCTIONALITY =====
const filterTabs = document.querySelectorAll('.filter-tab');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const filter = tab.getAttribute('data-filter');
        
        portfolioCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'animateScaleUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
            
            // Reset form
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// ===== ANIMATED COUNTER FOR STATS =====
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for stat counters
if (statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statObserver.observe(stat));
}

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.animate-fade-up, .animate-slide-right, .animate-slide-left, .animate-scale-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    revealObserver.observe(el);
});

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-progress');

if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
}
