/**
 * Add and remove 'transition-none' classes to elements that have any 
 * 'transition' and 'transition-*' classes to avoid any animations effect
 * when toggling dark mode.
 */
const toggleTransitions = () => {
    let elements = document.querySelectorAll(".transition, .transition-all, .transition-colors, .transition-opacity, .transition-shadow, .transition-transform");

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        element.classList.add("transition-none");
        setTimeout(() => { element.classList.remove("transition-none"); }, 1000);
    }
}

/**
 *  Toggles dark mode. 
 */
const toggleDarkMode = () => {
    toggleTransitions();

    if (localStorage.theme === "light" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: light)").matches)) {
        localStorage.theme = "dark";
        document.documentElement.classList.add("dark");
    } else if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        localStorage.theme = "light";
        document.documentElement.classList.remove("dark")
    }; 
}

/**
 *  Toggles navbar. 
 */
const navbarToggle = () => {
    const navbar = document.getElementById("navbar");
    window.pageYOffset > (navbar.offsetHeight - navbar.clientHeight)
        ? navbar.classList.add('bg-white', 'dark:bg-gray-800', 'shadow')
        : navbar.classList.remove('bg-white', 'dark:bg-gray-800', 'shadow');
}

/**
 *  Add event listener for dark mode toggle to button and window. This code
 *  executes when window is loaded. 
 */
window.onload = () => {
    document.getElementById("darkModeToggle").addEventListener("click", () => toggleDarkMode());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => toggleDarkMode());
    window.onscroll = () => {navbarToggle()};
    navbarToggle();
}
