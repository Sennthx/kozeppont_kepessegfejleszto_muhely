/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2025 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
//

function throttle(fn, time) {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            return;
        }
        fn(...args);
        timeoutId = setTimeout(() => {
            timeoutId = null;
        }, time);
    };
}



window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

    // Smooth scrolling

    const nav = document.querySelector("nav");
    nav.addEventListener("click", smoothScrooling);

    function smoothScrooling(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const idSelector = e.target.hash
            const anchorTarget = document.querySelector(idSelector);
            anchorTarget.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /* // Navbar scrolled
    window.addEventListener('scroll', throttle(() => {
        const currentScroll = window.scrollY;
        if (currentScroll > 200) {
            nav.classList.add('navbar-scrolled');
        } else {
            nav.classList.remove('navbar-scrolled');
        }
    }, 25)); */

    // Animate css using observer
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

    // progress bar
    window.addEventListener('scroll', () => {
        const winScroll = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (winScroll / height) * 100;
        document.querySelector(".loading").style.width = scrolled + "%";
    });

    // Numbers pending
    document.querySelectorAll('.counter').forEach(counter => {
        let started = false;

        function startCounter() {
            if (started) return; // Prevent multiple triggers
            started = true;

            const target = Number(counter.getAttribute('data-target'));
            const duration = Number(counter.getAttribute('data-duration'));
            const interval = 10;
            const increment = target / (duration / interval);
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

            const timer = setInterval(updateCounter, interval);
        }

        const counterObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) startCounter();
        });
        counterObserver.observe(counter)

    });

    // Parallex effect
    document.querySelectorAll('.portfolio-box').forEach(box => {
        const img = box.querySelector('img');

        box.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = box.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;

            img.style.transformOrigin = `${x}% ${y}%`;
        });
    });

});
