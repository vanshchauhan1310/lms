// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Hero Title Animation with GSAP
function animateHeroTitle() {
    const title = document.getElementById('heroTitle');
    const text = title.textContent;
    title.innerHTML = '';
    
    text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = char === ' ' ? 'inline' : 'inline-block';
        title.appendChild(span);
    });
    
    gsap.fromTo('.char',
        {
            opacity: 0,
            y: 50,
            rotationX: -90
        },
        {
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.03,
            duration: 0.8,
            ease: 'back.out(1.7)'
        }
    );
}

// Ambient Glow Animation
function animateAmbientGlow() {
    gsap.to('.ambient-glow', {
        scale: 1.2,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });
}

// Course Cards Scroll Animation
function animateCourseCards() {
    gsap.fromTo('.course-card',
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.courses-grid',
                start: 'top 80%'
            }
        }
    );
}

// Achievement Cards Animation
function animateAchievementCards() {
    gsap.fromTo('.achievement-card',
        {
            opacity: 0,
            scale: 0.8,
            rotationY: -45
        },
        {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.stats-grid',
                start: 'top 80%'
            }
        }
    );
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.achievement-value');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        
        gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%'
            },
            onUpdate: function() {
                counter.innerHTML = Math.floor(counter.innerHTML) + suffix;
            }
        });
    });
}

// Progress Bar Animations
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        gsap.to(bar, {
            width: width,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: bar,
                start: 'top 90%'
            }
        });
    });
}

// Section Headers Animation
function animateSectionHeaders() {
    gsap.fromTo('.section-header',
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.section-header',
                start: 'top 85%'
            }
        }
    );
}

// Navigation Scroll Effect
function setupNavigationScroll() {
    let lastScroll = 0;
    const nav = document.querySelector('.navigation');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.transform = currentScroll > lastScroll ? 'translateY(-100%)' : 'translateY(0)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// Card Hover Effects with GSAP
function setupCardHoverEffects() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Button Hover Effects
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-item, .upgrade-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mousedown', () => {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1
            });
        });
        
        button.addEventListener('mouseup', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.1
            });
        });
    });
}

// Initialize all animations
function init() {
    // Hero animations
    animateHeroTitle();
    animateAmbientGlow();
    
    // Scroll-triggered animations
    animateCourseCards();
    animateAchievementCards();
    animateCounters();
    animateProgressBars();
    animateSectionHeaders();
    
    // Interactive effects
    setupNavigationScroll();
    setupCardHoverEffects();
    setupButtonEffects();
    
    // Smooth scroll behavior
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
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
