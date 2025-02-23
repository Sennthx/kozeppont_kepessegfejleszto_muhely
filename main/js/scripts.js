class App {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    // Initializes all methods
    init() {
        this.setupNavbar();
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.setupLightbox();
        this.setupCounterAnimation();
        this.setupParallaxEffect();
        this.setupScrollAnimations();
    }

    //  Utility Functions
    static throttle(fn, time) {
        let timeoutId;
        return (...args) => {
            if (!timeoutId) {
                fn(...args);
                timeoutId = setTimeout(() => timeoutId = null, time);
            }
        };
    }

    // Navbar Shrinking Effect
    setupNavbar() {
        const navbar = document.querySelector('#mainNav');
        if (!navbar) return;

        const shrinkNavbar = () => {
            navbar.classList.toggle('navbar-shrink', window.scrollY > 0);
        };

        shrinkNavbar();
        document.addEventListener('scroll', shrinkNavbar);

        // Close the responsive navbar on item click
        const navbarToggler = document.querySelector('.navbar-toggler');
        document.querySelectorAll('#navbarResponsive .nav-link').forEach(item => {
            item.addEventListener('click', () => {
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    navbarToggler.click();
                }
            });
        });
    }

    // Smooth Scrolling 
    setupSmoothScrolling() {
        document.querySelector("nav").addEventListener("click", (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                document.querySelector(e.target.hash)?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Scroll Effects (Navbar & Progress Bar)
    setupScrollEffects() {
        const navbar = document.querySelector("nav");
        const progressBar = document.querySelector(".loading");

        window.addEventListener('scroll', App.throttle(() => {
            navbar.classList.toggle('navbar-scrolled', window.scrollY > 200);

            // Progress bar update
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (progressBar) progressBar.style.width = `${scrollPercent}%`;
        }, 10));
    }

    // Portfolio Lightbox
    setupLightbox() {
        new SimpleLightbox({ elements: '#portfolio a.portfolio-box' });
    }

    // Counter Animation
    setupCounterAnimation() {
        document.querySelectorAll('.counter').forEach(counter => {
            let started = false;
            const target = Number(counter.dataset.target);
            const duration = Number(counter.dataset.duration);
            const increment = target / (duration / 10);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current >= target) {
                    counter.innerText = target;
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.floor(current);
                }
            };

            const startCounter = () => {
                if (started) return;
                started = true;
                const timer = setInterval(updateCounter, 10);
            };

            new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) startCounter();
            }).observe(counter);
        });
    }

    // Parallax Effect on Portfolio Images
    setupParallaxEffect() {
        document.querySelectorAll('.portfolio-box img').forEach(img => {
            img.parentElement.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = img.parentElement.getBoundingClientRect();
                const x = ((e.clientX - left) / width) * 100;
                const y = ((e.clientY - top) / height) * 100;
                img.style.transformOrigin = `${x}% ${y}%`;
            });
        });
    }

    // Animate.css Observer (Scroll-triggered animations)
    setupScrollAnimations() {
        const animationObserver = new IntersectionObserver(entries => {
            entries
                .filter(entry => entry.isIntersecting)
                .forEach(entry => {
                    const element = entry.target;
                    element.classList.add('animate__animated');
                    element.classList.add('animate__' + element.getAttribute('data-scroll-animation'));
                });
        });

        document.querySelectorAll("[data-scroll]").forEach(element => {
            animationObserver.observe(element);
        });
    }
}

// Initialize the app
new App();
