// ===========================================================================
// Theme Toggle
// ===========================================================================

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = body.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Add a subtle rotation animation
    themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 400);
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===========================================================================
// Mobile Menu Toggle
// ===========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const menuTrigger = document.querySelector('.main-header__nav-trigger');
    const nav = document.querySelector('.main-header__nav');
    const menuLinks = document.querySelectorAll('.menu-item a');
    const icon = document.querySelector('.main-header__nav-trigger-icon');

    if (menuTrigger && nav) {
        console.log('Mobile menu initialized'); // Check console to verify this runs

        // Toggle Menu
        menuTrigger.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default button behavior
            e.stopPropagation(); // Stop bubble up
            
            console.log('Menu clicked'); // Verify click is registering
            
            nav.classList.toggle('active');
            menuTrigger.classList.toggle('active');
            
            // Handle icon animation class explicitly
            if (icon) {
                // If trigger has active, icon should too
                if (menuTrigger.classList.contains('active')) {
                    icon.classList.add('active');
                } else {
                    icon.classList.remove('active');
                }
            }
        });

        // Close menu when a link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuTrigger.classList.remove('active');
                if(icon) icon.classList.remove('active');
            });
        });
    } else {
        console.error('Menu elements not found: Trigger or Nav missing');
    }
});

// ===========================================================================
// Header Show/Hide on Scroll & Transparency
// ===========================================================================

let lastScroll = 0;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add solid background when scrolled past 50px
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header logic
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.classList.add('scroll-down');
        header.classList.remove('scroll-up');
    } else {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// ===========================================================================
// Smooth Scroll for Anchor Links
// ===========================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip empty or just # links
        if (href === '#' || href === '') {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            // Add a subtle pulse effect to the clicked link
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuTrigger.classList.remove('active');
            }
        }
    });
});

// ===========================================================================
// Portfolio Cards Animation on Scroll
// ===========================================================================

const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px 50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe portfolio cards with staggered animation
document.addEventListener('DOMContentLoaded', () => {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        // Reduced delay from 0.08s to 0.03s per card, and faster animation (0.4s instead of 0.6s)
        card.style.transition = `opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.03}s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.03}s`;
        observer.observe(card);
    });
    
    // Add magnetic effect to portfolio cards
    portfolioCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const rotateX = deltaY * -5;
            const rotateY = deltaX * 5;
            
            card.style.transform = `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

// ===========================================================================
// Portfolio Gallery Lightbox
// ===========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const galleryCards = document.querySelectorAll('.portfolio-gallery-card');
    const lightbox = document.getElementById('portfolio-lightbox');
    if (!galleryCards.length || !lightbox) return;

    const lightboxMedia = lightbox.querySelector('.portfolio-lightbox__media');
    const lightboxCaption = lightbox.querySelector('.portfolio-lightbox__caption');
    const closeButton = lightbox.querySelector('.portfolio-lightbox__close');
    let activeCard = null;

    const openLightbox = (card) => {
        const image = card.querySelector('img');
        const source = card.dataset.image || image?.src;
        if (!source) return;

        const captionText = card.dataset.caption || image?.alt || '';
        const altText = image?.alt || captionText;

        lightboxMedia.src = source;
        lightboxMedia.alt = altText;

        if (lightboxCaption) {
            lightboxCaption.textContent = captionText;
            lightboxCaption.style.display = captionText ? 'block' : 'none';
        }

        lightbox.classList.add('is-visible');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-open');
        activeCard = card;

        if (closeButton) {
            closeButton.focus();
        }
    };

    const closeLightbox = () => {
        lightbox.classList.remove('is-visible');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');

        if (activeCard) {
            activeCard.focus();
            activeCard = null;
        }
    };

    galleryCards.forEach((card) => {
        card.setAttribute('tabindex', '0');

        card.addEventListener('click', (event) => {
            event.preventDefault();
            openLightbox(card);
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openLightbox(card);
            }
        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox.classList.contains('is-visible')) {
            closeLightbox();
        }
    });
});

// ===========================================================================
// Loader Hide
// ===========================================================================

window.addEventListener('load', () => {
    const loader = document.getElementById('loaded');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
        }, 300);
    }
    
    // Add ripple effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// ===========================================================================
// Awards Slider Pause on Hover
// ===========================================================================

const awardsTrack = document.querySelector('.awards-track');
if (awardsTrack) {
    awardsTrack.addEventListener('mouseenter', () => {
        if (awardsTrack.pauseAnimation) {
            awardsTrack.pauseAnimation();
        }
    });
    
    awardsTrack.addEventListener('mouseleave', () => {
        if (awardsTrack.resumeAnimation) {
            awardsTrack.resumeAnimation();
        }
    });
}

// ===========================================================================
// Marquee Text Pause on Hover
// ===========================================================================

const marquees = document.querySelectorAll('.ms-tt');
marquees.forEach(marquee => {
    marquee.addEventListener('mouseenter', () => {
        if (marquee.pauseAnimation) {
            marquee.pauseAnimation();
        }
    });
    
    marquee.addEventListener('mouseleave', () => {
        if (marquee.resumeAnimation) {
            marquee.resumeAnimation();
        }
    });
});

// ===========================================================================
// Parallax Effect on Hero Video
// ===========================================================================

const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVideo = heroSection.querySelector('.hero-video');
        
        if (heroVideo && scrolled < heroSection.offsetHeight) {
            heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ===========================================================================
// Back to Top Button (Optional)
// ===========================================================================

// You can add a back-to-top button if needed
function createBackToTopButton() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Uncomment if you want the back-to-top button
// createBackToTopButton();

// ===========================================================================
// Portfolio Carousel Controls
// ===========================================================================

function initPortfolioCarousels() {
    const carousels = document.querySelectorAll('.cv-portfolio-grid-visual');
    
    carousels.forEach((carousel) => {
        // Create navigation wrapper
        const navWrapper = document.createElement('div');
        navWrapper.className = 'carousel-nav';
        
        // Create prev button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-nav__btn carousel-nav__btn--prev';
        prevBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>';
        prevBtn.setAttribute('aria-label', 'Previous');
        
        // Create next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-nav__btn carousel-nav__btn--next';
        nextBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>';
        nextBtn.setAttribute('aria-label', 'Next');
        
        navWrapper.appendChild(prevBtn);
        navWrapper.appendChild(nextBtn);
        
        // Insert navigation before the carousel
        carousel.parentElement.insertBefore(navWrapper, carousel);
        
        // Calculate scroll amount (width of one card + gap)
        const getScrollAmount = () => {
            const card = carousel.querySelector('.cv-portfolio-card');
            if (!card) return 300;
            const cardWidth = card.offsetWidth;
            const style = window.getComputedStyle(carousel);
            const gap = parseInt(style.gap) || 24;
            return cardWidth + gap;
        };
        
        // Smooth scroll function
        const smoothScroll = (element, target, duration = 400) => {
            const start = element.scrollLeft;
            const distance = target - start;
            const startTime = performance.now();
            
            const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
            
            const scroll = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeOutCubic(progress);
                
                element.scrollLeft = start + distance * eased;
                
                if (progress < 1) {
                    requestAnimationFrame(scroll);
                }
            };
            
            requestAnimationFrame(scroll);
        };
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            const scrollAmount = getScrollAmount();
            const targetScroll = Math.max(0, carousel.scrollLeft - scrollAmount);
            smoothScroll(carousel, targetScroll);
        });
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            const scrollAmount = getScrollAmount();
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            const targetScroll = Math.min(maxScroll, carousel.scrollLeft + scrollAmount);
            smoothScroll(carousel, targetScroll);
        });
        
        // Update button states based on scroll position
        const updateButtons = () => {
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            
            if (carousel.scrollLeft <= 0) {
                prevBtn.classList.add('disabled');
            } else {
                prevBtn.classList.remove('disabled');
            }
            
            if (carousel.scrollLeft >= maxScroll - 1) {
                nextBtn.classList.add('disabled');
            } else {
                nextBtn.classList.remove('disabled');
            }
        };
        
        // Initial button state
        updateButtons();
        
        // Update on scroll
        carousel.addEventListener('scroll', updateButtons);
        
        // Update on resize
        window.addEventListener('resize', updateButtons);
        
        // Auto-hide scrollbar on desktop
        carousel.addEventListener('mouseenter', () => {
            carousel.style.scrollbarWidth = 'auto';
        });
        
        carousel.addEventListener('mouseleave', () => {
            carousel.style.scrollbarWidth = 'thin';
        });
    });
}

// Initialize carousels when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioCarousels);
} else {
    initPortfolioCarousels();
}

// ===========================================================================
// Portfolio Parallax Effect
// ===========================================================================

function initPortfolioParallax() {
    const parallaxImage = document.querySelector('.portfolio-parallax-image');
    
    if (!parallaxImage) return;
    
    const parallaxWindow = parallaxImage.parentElement;
    
    function updateParallax() {
        const windowRect = parallaxWindow.getBoundingClientRect();
        const windowTop = windowRect.top;
        const windowHeight = windowRect.height;
        const windowBottom = windowTop + windowHeight;
        
        // Check if window is in viewport
        if (windowBottom > 0 && windowTop < window.innerHeight) {
            // Calculate parallax offset with stronger effect
            const scrollProgress = (window.innerHeight - windowTop) / (window.innerHeight + windowHeight);
            const translateY = (scrollProgress - 0.5) * 50; // Increased from 20 to 50 for stronger effect
            
            parallaxImage.style.transform = `translateY(${translateY}%)`;
        }
    }
    
    // Update on scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial update
    updateParallax();
}

// Initialize parallax when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioParallax);
} else {
    initPortfolioParallax();
}

// ===========================================================================
// Marquee Text Fix for Seamless Loop
// ===========================================================================

function initMarquee() {
    // Handle name carousel with JavaScript animation
    const marquees = document.querySelectorAll('.ms-tt');
    
    marquees.forEach(marquee => {
        const items = marquee.querySelectorAll('.ms-tt__text');
        
        if (items.length > 0) {
            // Clear any previous inline styles
            items.forEach(item => {
                item.style.width = '';
                item.style.minWidth = '';
                item.style.maxWidth = '';
                item.style.flexBasis = '';
            });
            
            // Force reflow
            void marquee.offsetWidth;
            
            // Measure all items
            const widths = Array.from(items).map(item => item.getBoundingClientRect().width);
            const maxWidth = Math.max(...widths);
            const roundedWidth = Math.ceil(maxWidth);
            
            // Force all items to have the exact same width
            items.forEach(item => {
                item.style.width = `${roundedWidth}px`;
                item.style.minWidth = `${roundedWidth}px`;
                item.style.maxWidth = `${roundedWidth}px`;
                item.style.flexBasis = `${roundedWidth}px`;
            });
            
            // Calculate exact distance for one complete cycle
            // With 4 duplicate sets, we move exactly 1/4 of total width
            const totalWidth = marquee.scrollWidth;
            const cycleDistance = totalWidth / 4;
            
            // Determine duration based on viewport width
            let duration = 40000; // Default 40s
            if (window.innerWidth <= 480) {
                duration = 16000;
            } else if (window.innerWidth <= 768) {
                duration = 24000;
            } else if (window.innerWidth <= 1024) {
                duration = 32000;
            }
            
            // Cancel any existing animation
            if (marquee.animationId) {
                cancelAnimationFrame(marquee.animationId);
            }
            
            // Start JavaScript animation
            let startTime = null;
            const isMobile = window.innerWidth <= 768;
            
            function animate(currentTime) {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = (elapsed % duration) / duration;
                let translateX = -(progress * cycleDistance);
                
                // Round to whole pixels on mobile to prevent sub-pixel jitter
                if (isMobile) {
                    translateX = Math.round(translateX);
                }
                
                marquee.style.transform = `translate3d(${translateX}px, 0, 0)`;
                
                marquee.animationId = requestAnimationFrame(animate);
            }
            
            marquee.animationId = requestAnimationFrame(animate);
            
            // Store pause/resume functions for hover
            marquee.isPaused = false;
            marquee.pauseAnimation = function() {
                if (!this.isPaused && this.animationId) {
                    cancelAnimationFrame(this.animationId);
                    this.isPaused = true;
                }
            };
            marquee.resumeAnimation = function() {
                if (this.isPaused) {
                    this.isPaused = false;
                    this.animationId = requestAnimationFrame(animate);
                }
            };
        }
    });
    
    // Handle awards carousel with JavaScript animation
    const awardsTracks = document.querySelectorAll('.awards-track');
    
    awardsTracks.forEach(track => {
        const badges = track.querySelectorAll('.award-badge');
        
        if (badges.length > 0) {
            // Clear any previous inline styles
            badges.forEach(badge => {
                badge.style.width = '';
                badge.style.minWidth = '';
                badge.style.maxWidth = '';
                badge.style.flexBasis = '';
            });
            
            // Force reflow
            void track.offsetWidth;
            
            // Measure all badges (after images have loaded naturally)
            const widths = Array.from(badges).map(badge => badge.getBoundingClientRect().width);
            const maxWidth = Math.max(...widths);
            const roundedWidth = Math.ceil(maxWidth);
            
            // Force all badges to have the exact same width
            badges.forEach(badge => {
                badge.style.width = `${roundedWidth}px`;
                badge.style.minWidth = `${roundedWidth}px`;
                badge.style.maxWidth = `${roundedWidth}px`;
                badge.style.flexBasis = `${roundedWidth}px`;
            });
            
            // Force reflow to apply changes
            void track.offsetWidth;
            
            // Calculate exact distance for one complete cycle
            // With 4 duplicate sets, we move exactly 1/4 of total width
            const totalWidth = track.scrollWidth;
            const cycleDistance = totalWidth / 4;
            
            // Determine duration based on viewport width
            // Slowed down even further
            let duration = 100000; // Default 100s
            if (window.innerWidth <= 768) {
                duration = 50000; // 50s on mobile
            }
            
            // Cancel any existing animation
            if (track.animationId) {
                cancelAnimationFrame(track.animationId);
            }
            
            // Start JavaScript animation
            let startTime = null;
            const isMobile = window.innerWidth <= 768;
            
            function animate(currentTime) {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = (elapsed % duration) / duration;
                let translateX = -(progress * cycleDistance);
                
                // Round to whole pixels on mobile to prevent sub-pixel jitter
                if (isMobile) {
                    translateX = Math.round(translateX);
                }
                
                track.style.transform = `translate3d(${translateX}px, 0, 0)`;
                
                track.animationId = requestAnimationFrame(animate);
            }
            
            track.animationId = requestAnimationFrame(animate);
            
            // Store pause/resume functions for hover
            track.isPaused = false;
            track.pauseAnimation = function() {
                if (!this.isPaused && this.animationId) {
                    cancelAnimationFrame(this.animationId);
                    this.isPaused = true;
                }
            };
            track.resumeAnimation = function() {
                if (this.isPaused) {
                    this.isPaused = false;
                    this.animationId = requestAnimationFrame(animate);
                }
            };
        }
    });
}

// Run immediately and on load
initMarquee();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initMarquee, 100);
    });
} else {
    setTimeout(initMarquee, 100);
}

// Re-run on fonts loaded
if (document.fonts) {
    document.fonts.ready.then(() => {
        setTimeout(initMarquee, 100);
    });
}

window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.marqueeResizeTimer);
    window.marqueeResizeTimer = setTimeout(initMarquee, 250);
});
