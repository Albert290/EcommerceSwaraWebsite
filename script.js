 
// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const closeMenu = document.getElementById('closeMenu');

    // Check if elements exist before adding event listeners
    if (!hamburger || !mobileMenu || !mobileOverlay) {
        console.warn('Mobile menu elements not found');
        return;
    }

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        hamburger.classList.add('active');
        document.body.classList.add('no-scroll');
        
        // Reset animations
        const mobileItems = document.querySelectorAll('.mobile-links li');
        mobileItems.forEach((item, index) => {
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = `slideIn 0.3s forwards`;
                item.style.animationDelay = `${0.1 + (index * 0.05)}s`;
            }, 10);
        });
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    // Event listeners
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        openMobileMenu();
    });

    if (closeMenu) {
        closeMenu.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileMenu();
        });
    }

    mobileOverlay.addEventListener('click', closeMobileMenu);

    // Close menu when clicking on a link
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', function() {
            // Only close menu if it's not an external link
            if (!this.hasAttribute('target')) {
                closeMobileMenu();
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Active page highlighting
    function setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = document.querySelectorAll('.nav-item, .mobile-item');

        navItems.forEach(item => {
            const link = item.querySelector('a');
            if (link) {
                const href = link.getAttribute('href');
                if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
    }

    // Set active page on load
    setActivePage();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                closeMobileMenu(); // Close menu after smooth scroll
            }
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');

    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.classList.add('scrolled-down');
            } else {
                header.classList.remove('scrolled-down');
            }

            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});


// Animation for hero section
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for CTA buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation class when hero section is in view
    const hero = document.querySelector('.hero');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    observer.observe(hero);
});


// Trigger when hero section is in view
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.hero'));
});

// Toggle expandable content
        function toggleContent() {
            const content = document.getElementById('expandableContent');
            const button = document.querySelector('.read-more-btn');
            const buttonText = document.getElementById('readMoreText');
            
            if (content.classList.contains('expanded')) {
                content.classList.remove('expanded');
                button.classList.remove('expanded');
                buttonText.textContent = 'Read More About Us';
            } else {
                content.classList.add('expanded');
                button.classList.add('expanded');
                buttonText.textContent = 'Show Less';
            }
        }

        // Animated counter for achievement numbers
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + (target >= 200 ? '+' : '+');
            }, 20);
        }

        // Initialize counters when page loads
        document.addEventListener('DOMContentLoaded', function() {
            const counters = document.querySelectorAll('.number');
            
            // Intersection Observer to trigger animation when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = parseInt(entry.target.getAttribute('data-count'));
                        animateCounter(entry.target, target);
                        observer.unobserve(entry.target);
                    }
                });
            });

            counters.forEach(counter => {
                observer.observe(counter);
            });
        });

        // Smooth scroll for internal links
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

        // Hide scroll indicator when user scrolls
        window.addEventListener('scroll', function() {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });

// Simple Our Story Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe story content
    const storyContent = document.querySelector('.story-content');
    if (storyContent) {
        observer.observe(storyContent);
    }

    // Timeline point interactions
    const timelinePoints = document.querySelectorAll('.timeline-point');
    
    timelinePoints.forEach(point => {
        // Click effect
        point.addEventListener('click', function() {
            // Remove active class from all points
            timelinePoints.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked point
            this.classList.add('active');
            
            // Create ripple effect
            createRipple(this);
        });

        // Enhanced hover effects
        point.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });

        point.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Ripple effect function
    function createRipple(element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            background: rgba(245, 124, 81, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple-expand 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // Add CSS animation for ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-expand {
            to {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }
        
        .timeline-point.active .point-icon {
            background: var(--accent) !important;
            transform: scale(1.1);
            box-shadow: 0 10px 30px rgba(245, 124, 81, 0.5);
        }
        
        .timeline-point.active .point-icon i {
            color: var(--white) !important;
        }
        
        .timeline-point.active .point-year,
        .timeline-point.active .point-label {
            background: var(--secondary) !important;
            color: var(--white) !important;
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll reveal for paragraphs
    const paragraphs = document.querySelectorAll('.story-paragraph');
    
    const paragraphObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    paragraphs.forEach(paragraph => {
        paragraph.style.animationPlayState = 'paused';
        paragraphObserver.observe(paragraph);
    });

    // Timeline line animation on scroll
    const timelineLine = document.querySelector('.timeline-line');
    const timelineContainer = document.querySelector('.timeline-container');
    
    const lineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timelineLine.style.animationPlayState = 'running';
                
                // Stagger timeline point animations
                timelinePoints.forEach((point, index) => {
                    setTimeout(() => {
                        point.style.animationPlayState = 'running';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    if (timelineContainer) {
        timelineLine.style.animationPlayState = 'paused';
        timelinePoints.forEach(point => {
            point.style.animationPlayState = 'paused';
        });
        lineObserver.observe(timelineContainer);
    }

    // Add subtle parallax effect to story content
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const storySection = document.querySelector('.our-story');
        
        if (storySection) {
            const rect = storySection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const rate = scrolled * 0.1;
                storyContent.style.transform = `translateY(${rate}px)`;
            }
        }
    });

    // Auto-highlight timeline points as user scrolls through paragraphs
    const highlightTimeline = function() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        paragraphs.forEach((paragraph, index) => {
            const rect = paragraph.getBoundingClientRect();
            const absoluteTop = rect.top + window.scrollY;
            
            if (scrollPosition >= absoluteTop && scrollPosition < absoluteTop + paragraph.offsetHeight) {
                // Highlight corresponding timeline point
                timelinePoints.forEach(point => point.classList.remove('highlight'));
                if (timelinePoints[index]) {
                    timelinePoints[index].classList.add('highlight');
                }
            }
        });
    };

    // Add highlight styles
    const highlightStyle = document.createElement('style');
    highlightStyle.textContent = `
        .timeline-point.highlight .point-icon {
            background: var(--secondary);
            border-color: var(--secondary);
            animation: pulse-highlight 2s ease-in-out infinite;
        }
        
        .timeline-point.highlight .point-icon i {
            color: var(--white);
        }
        
        @keyframes pulse-highlight {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(highlightStyle);

    // Throttled scroll listener
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(highlightTimeline, 10);
    });
});

//hero image carousel
// Hero Image Carousel Functionality
class HeroCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.dot');
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.isAutoPlaying = true;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startAutoPlay();
    }
    
    setupEventListeners() {
        // Previous button
        const prevBtn = document.getElementById('prevBtn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }
        
        // Next button
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause auto-play on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => this.pauseAutoPlay());
            carouselContainer.addEventListener('mouseleave', () => this.resumeAutoPlay());
        }
        
        // Touch/swipe support for mobile
        this.setupTouchEvents();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }
    
    setupTouchEvents() {
        const carouselContainer = document.querySelector('.carousel-container');
        if (!carouselContainer) return;
        
        let startX = 0;
        let endX = 0;
        
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carouselContainer.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });
        
        carouselContainer.addEventListener('touchend', () => {
            const threshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        });
    }
    
    showSlide(index) {
        // Remove active class from all slides and dots
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(nextIndex);
        this.resetAutoPlay();
    }
    
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(prevIndex);
        this.resetAutoPlay();
    }
    
    goToSlide(index) {
        this.showSlide(index);
        this.resetAutoPlay();
    }
    
    startAutoPlay() {
        if (!this.isAutoPlaying) return;
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 4000); // Change slide every 4 seconds
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resumeAutoPlay() {
        if (this.isAutoPlaying && !this.autoPlayInterval) {
            this.startAutoPlay();
        }
    }
    
    resetAutoPlay() {
        this.pauseAutoPlay();
        this.resumeAutoPlay();
    }
    
    // Method to programmatically control auto-play
    toggleAutoPlay() {
        this.isAutoPlaying = !this.isAutoPlaying;
        if (this.isAutoPlaying) {
            this.startAutoPlay();
        } else {
            this.pauseAutoPlay();
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const heroCarousel = new HeroCarousel();
    
    // Make carousel instance globally available if needed
    window.heroCarousel = heroCarousel;
});

// Handle page visibility changes to pause/resume auto-play
document.addEventListener('visibilitychange', () => {
    if (window.heroCarousel) {
        if (document.hidden) {
            window.heroCarousel.pauseAutoPlay();
        } else {
            window.heroCarousel.resumeAutoPlay();
        }
    }
});
