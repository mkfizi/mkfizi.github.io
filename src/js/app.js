/**
 * --------------------------------------------------------------------------
 * mkfizi.dev: app.js
 * Licensed under MIT (https://github.com/mkfizi/mkfizi.github.io/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

'use strict';

let app = {
    name: 'Khafizi Noh',
};

app.elements = {
    darkModeToggle: document.getElementById('dark-mode-toggle'),
    footerCurrentYear: document.getElementById('footer-current-year'),
    footerAppName: document.getElementById('footer-app-name'),
};

app.config = {
    isMenuActive: false
}

app.init = () => {
    app.view.init();
    app.event.init();
};

app.event = {
    init: () => {
        document.addEventListener('click', app.event.handleClick);
        window.addEventListener('resize', app.view.updateViewportHeight);
    },

    handleClick: event => {
        const target = event.target;

        if (target.closest('[id="dark-mode-toggle"]')) {
            app.view.updateDarkMode();
        }
    },
};

app.view = {
    init: () => {
        app.view.updateViewportHeight();
        app.view.updateAppInfo();
    },

    // Update the height of the viewport. This is a workaround fix for [viewport height issue on mobile browsers](https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser) 
    updateViewportHeight: () => {
        document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
    },

    // Update navbar appearance based on window scroll position
    updateNavbar: () => {
        if (!app.elements.navbar && !app.elements.navbarContent) return;

        const isNavbarScrolled = window.pageYOffset > app.elements.navbar.offsetHeight;

        app.elements.navbar.classList.toggle('lg:h-32', !isNavbarScrolled);
        app.elements.navbar.classList.toggle('lg:border-transparent', !isNavbarScrolled);
        app.elements.navbar.classList.toggle('lg:dark:border-transparent', !isNavbarScrolled);
        app.elements.navbar.classList.toggle('lg:border-neutral-100', isNavbarScrolled);
        app.elements.navbar.classList.toggle('lg:dark:border-neutral-800', isNavbarScrolled);
        app.elements.navbarImage.classList.toggle('lg:w-24', !isNavbarScrolled);
        app.elements.navbarImage.classList.toggle('lg:h-24', !isNavbarScrolled);
        app.elements.navbarImage.classList.toggle('lg:-left-28', !isNavbarScrolled);
        app.elements.navbarImage.classList.toggle('lg:-left-20', isNavbarScrolled);
    },

    // Update dark mode based on value in 'localStorage.theme'
    updateDarkMode: () => {
        app.util.toggleTransition();

        const isLightMode = localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches);
        localStorage.theme = isLightMode ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', isLightMode);
    },

    // Update the footer with current year, app name, and version
    updateAppInfo: () => {
        if (app.elements.footerCurrentYear) {
            app.elements.footerCurrentYear.innerHTML = new Date().getFullYear();
        }

        if (app.elements.footerAppName) {
            app.elements.footerAppName.innerHTML = app.name;
        }
    }
};

app.util = {
    // Toggle CSS transitions for smoother element transitions
    toggleTransition: () => {
        const transitions = document.querySelectorAll('.transition, .transition-all, .transition-colors, .transition-opacity, .transition-shadow, .transition-transform');
        for (const transition of transitions) {
            transition.classList.add('transition-none');
            setTimeout(() => {
                transition.classList.remove('transition-none');
            }, 100);
        }
    }
};

app.init();