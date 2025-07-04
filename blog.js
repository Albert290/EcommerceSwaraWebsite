 
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


  // Scroll progress indicator
        window.addEventListener('scroll', function() {
            const scrollProgress = document.getElementById('scrollProgress');
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });

        // Smooth scrolling for anchor links
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

        // Add loading animation to external links
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-spinner fa-spin';
                    setTimeout(() => {
                        icon.className = 'fas fa-external-link-alt';
                    }, 2000);
                }
            });
        });

        // Intersection Observer for scroll animations
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

        // Observe all blog sections
        document.querySelectorAll('.blog-section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

// personal journeys
// Urban Swaras Personal Running Journeys Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll animation for internal links
    function smoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
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

    // Intersection Observer for scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Elements to animate
        const animateElements = document.querySelectorAll([
            '.journeys-header',
            '.featured-story',
            '.story-text p',
            '.story-quote',
            '.run-details',
            '.runner-profile',
            '.related-content'
        ].join(','));

        animateElements.forEach(el => {
            el.classList.add('animate-element');
            observer.observe(el);
        });
    }

    // Reading progress indicator
    function createReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
        document.body.appendChild(progressBar);

        const storyContent = document.querySelector('.story-text');
        if (!storyContent) return;

        function updateProgress() {
            const rect = storyContent.getBoundingClientRect();
            const contentHeight = storyContent.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrolled = Math.max(0, windowHeight - rect.top);
            const progress = Math.min(100, (scrolled / contentHeight) * 100);
            
            const fill = document.querySelector('.reading-progress-fill');
            if (fill) {
                fill.style.width = `${progress}%`;
            }
        }

        window.addEventListener('scroll', updateProgress);
        updateProgress();
    }

    // Interactive hashtags
    function initHashtagInteraction() {
        const hashtags = document.querySelectorAll('.hashtag');
        hashtags.forEach(hashtag => {
            hashtag.addEventListener('click', function() {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'hashtag-ripple';
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Copy hashtag to clipboard
                const text = this.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    showToast(`Copied ${text} to clipboard!`);
                });
            });
        });
    }

    // Toast notification system
    function showToast(message, duration = 3000) {
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('toast-show'), 100);

        // Remove toast
        setTimeout(() => {
            toast.classList.remove('toast-show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // Parallax effect for background elements
    function initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.personal-journeys-section::before');
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const section = document.querySelector('.personal-journeys-section');
            
            if (section) {
                const rect = section.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const translateY = scrolled * 0.5;
                    section.style.setProperty('--parallax-offset', `${translateY}px`);
                }
            }
        }

        window.addEventListener('scroll', updateParallax);
    }

    // Image lazy loading and optimization
    function initImageOptimization() {
        const images = document.querySelectorAll('.story-image');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('image-loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Enhanced story interaction
    function initStoryInteraction() {
        const storyQuote = document.querySelector('.story-quote');
        const runDetails = document.querySelector('.run-details');
        const relatedLinks = document.querySelectorAll('.related-link');

        // Quote hover effect
        if (storyQuote) {
            storyQuote.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
            });
            
            storyQuote.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }

        // Run details expansion
        if (runDetails) {
            const detailsHeader = runDetails.querySelector('h3');
            if (detailsHeader) {
                detailsHeader.style.cursor = 'pointer';
                detailsHeader.addEventListener('click', function() {
                    const specs = runDetails.querySelector('.run-specs');
                    specs.style.display = specs.style.display === 'none' ? 'block' : 'none';
                    
                    // Toggle icon
                    const icon = this.querySelector('i') || document.createElement('i');
                    if (!this.querySelector('i')) {
                        icon.className = 'fas fa-chevron-down';
                        this.appendChild(icon);
                    }
                    
                    icon.classList.toggle('fa-chevron-down');
                    icon.classList.toggle('fa-chevron-up');
                });
            }
        }

        // Related links tracking
        relatedLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const linkText = this.textContent.trim();
                showToast(`"${linkText}" - Coming soon!`);
                
                // Add clicked state
                this.classList.add('link-clicked');
                setTimeout(() => {
                    this.classList.remove('link-clicked');
                }, 1000);
            });
        });
    }

    // Text highlight and sharing
    function initTextSharing() {
        const storyText = document.querySelector('.story-text');
        if (!storyText) return;

        storyText.addEventListener('mouseup', function() {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();
            
            if (selectedText.length > 10) {
                showShareButton(selectedText, selection);
            } else {
                hideShareButton();
            }
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.share-button')) {
                hideShareButton();
            }
        });
    }

    function showShareButton(text, selection) {
        hideShareButton(); // Remove existing button
        
        const shareBtn = document.createElement('div');
        shareBtn.className = 'share-button';
        shareBtn.innerHTML = `
            <i class="fas fa-share-alt"></i>
            <span>Share Quote</span>
        `;
        
        document.body.appendChild(shareBtn);
        
        // Position the button
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        shareBtn.style.top = `${rect.top - 50}px`;
        shareBtn.style.left = `${rect.left + (rect.width / 2)}px`;
        
        shareBtn.addEventListener('click', function() {
            const shareText = `"${text}" - From Urban Swaras Running Stories`;
            navigator.clipboard.writeText(shareText).then(() => {
                showToast('Quote copied to clipboard!');
                hideShareButton();
            });
        });
    }

    function hideShareButton() {
        const existingBtn = document.querySelector('.share-button');
        if (existingBtn) {
            existingBtn.remove();
        }
    }

    // Performance optimization
    function optimizePerformance() {
        // Debounce scroll events
        let scrollTimer;
        const originalScrollHandlers = [];
        
        window.addEventListener('scroll', function() {
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }
            
            scrollTimer = setTimeout(() => {
                // Execute scroll handlers
                originalScrollHandlers.forEach(handler => handler());
            }, 10);
        });
    }

    // Initialize all features
    function init() {
        smoothScroll();
        initScrollAnimations();
        createReadingProgress();
        initHashtagInteraction();
        initParallaxEffect();
        initImageOptimization();
        initStoryInteraction();
        initTextSharing();
        optimizePerformance();
        
        // Add custom CSS for dynamic elements
        addDynamicStyles();
        
        console.log('🏃‍♂️ Urban Swaras Personal Journeys initialized successfully!');
    }

    // Add dynamic CSS styles
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Animation classes */
            .animate-element {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Reading progress bar */
            .reading-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(31, 60, 95, 0.1);
                z-index: 1000;
            }
            
            .reading-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #F57C51, #FFD700);
                width: 0%;
                transition: width 0.2s ease;
            }
            
            /* Hashtag ripple effect */
            .hashtag {
                position: relative;
                overflow: hidden;
            }
            
            .hashtag-ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            /* Toast notifications */
            .toast {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: #1F3C5F;
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                transform: translateX(400px);
                transition: transform 0.3s ease;
                z-index: 1001;
            }
            
            .toast-show {
                transform: translateX(0);
            }
            
            .toast i {
                color: #FFD700;
            }
            
            /* Share button */
            .share-button {
                position: absolute;
                background: #F57C51;
                color: white;
                padding: 8px 15px;
                border-radius: 20px;
                font-size: 0.9rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                transform: translateX(-50%);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                transition: all 0.2s ease;
                z-index: 1000;
            }
            
            .share-button:hover {
                background: #ff6b35;
                transform: translateX(-50%) scale(1.05);
            }
            
            /* Image loading animation */
            .story-image {
                transition: opacity 0.3s ease;
                opacity: 0.7;
            }
            
            .image-loaded {
                opacity: 1;
            }
            
            /* Link clicked state */
            .link-clicked {
                background: linear-gradient(135deg, #F57C51 0%, #ff6b35 100%) !important;
                color: white !important;
                transform: translateX(10px) !important;
            }
            
            /* Mobile optimizations */
            @media (max-width: 768px) {
                .toast {
                    bottom: 20px;
                    right: 20px;
                    left: 20px;
                    transform: translateY(100px);
                }
                
                .toast-show {
                    transform: translateY(0);
                }
                
                .share-button {
                    font-size: 0.8rem;
                    padding: 6px 12px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize everything when DOM is ready
    init();
});