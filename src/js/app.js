/**
 * --------------------------------------------------------------------------
 * mkfizi.dev (1.0.0): app.js
 * Licensed under MIT (https://github.com/mkfizi/mkfizi.github.io/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

'use strict';

let app = {
    name: 'Khafizi Noh',
};

app.elements = {
    navbar: document.getElementById('navbar'),
    navbarImage: document.getElementById('navbarImage'),
    menu: document.getElementById('menu'),
    menuToggle: document.getElementById('menuToggle'),
    menuToggleEnable: document.getElementById('menuToggleEnable'),
    menuToggleDisable: document.getElementById('menuToggleDisable'),
    darkModeToggle: document.getElementById('darkModeToggle'),
    footerCurrentYear: document.getElementById('footerCurrentYear'),
    footerAppName: document.getElementById('footerAppName'),
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
        window.addEventListener('scroll', app.view.updateNavbar);
    },

    handleClick: event => {
        const target = event.target;

        if (target.closest('[id="darkModeToggle"]')) {
            app.view.updateDarkMode();
        } else if (target.closest('[id="menuToggle"]')) {
            app.view.toggleMenu();
        }
    },
};

app.view = {
    init: () => {
        app.view.updateViewportHeight();
        app.view.updateNavbar();
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

        if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
        } else if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
        }
    },

    // Update the footer with current year, app name, and version
    updateAppInfo: () => {
        if (app.elements.footerCurrentYear) {
            app.elements.footerCurrentYear.innerHTML = new Date().getFullYear();
        }

        if (app.elements.footerAppName) {
            app.elements.footerAppName.innerHTML = app.name;
        }
    },

    // Toggle the menu visibility and update related elements
    toggleMenu: () => {
        if (!app.elements.menu 
            && !app.elements.menuToggle
            && !app.elements.menuToggleEnable
            && !app.elements.menuToggleDisable) return;
            
        app.util.toggleTransitionAll(app.elements.menu);

        app.elements.menu.classList.toggle('-translate-y-full', app.config.isMenuActive);
        app.elements.menuToggleDisable.classList.toggle('hidden', app.config.isMenuActive);
        app.elements.menuToggleEnable.classList.toggle('hidden', !app.config.isMenuActive);
        app.util.focusable[app.config.isMenuActive ? 'disable' : 'enable'](app.elements.menu);
      
        app.elements.menuToggle.setAttribute('aria-expanded', !app.config.isMenuActive);
        app.config.isMenuActive = !app.config.isMenuActive;
    }
};

app.util = {
    focusable: {
        selector: `a, button, input, textarea, select, details, [contenteditable="true"]`,

        // Enable focus on the specified element and its focusable child elements
        enable(element) {
            for (const focusableElement of element.querySelectorAll(this.selector)) {
                focusableElement.classList.remove("invisible");
            }
        },

        // Disable focus on the specified element and its focusable child elements
        disable(element) {
            for (const focusableElement of element.querySelectorAll(this.selector)) {
                focusableElement.classList.add("invisible");
            }
        },
    },

    // Toggle CSS transitions for smoother element transitions
    toggleTransition: () => {
        const transitions = document.querySelectorAll('.transition, .transition-all, .transition-colors, .transition-opacity, .transition-shadow, .transition-transform');
        for (const transition of transitions) {
            transition.classList.add('transition-none');
            setTimeout(() => {
                transition.classList.remove('transition-none');
            }, 100);
        }
    },

    // Toggle CSS transition on the specified element
    toggleTransitionAll: (element) => {
        element.classList.add('transition-all');
        setTimeout(() => {
            element.classList.remove('transition-all'); 
        }, 100);
    }
};

app.init();