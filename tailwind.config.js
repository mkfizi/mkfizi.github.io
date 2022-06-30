const defaultTheme = require('tailwindcss/defaultTheme');
const test = defaultTheme.height
// console.log(defaultTheme.minHeight)
console.log(test)

module.exports = {
    mode: 'jit',
    darkMode: 'class',
    content: [
        "./*.html",
        "./src/**/*.{html,js}"
    ],
    theme: {	
        extend: {
            minHeight: {
                "screen": ["100vh", "calc(var(--vh, 1vh) * 100)"],
            },
            height: {
				"screen": ["100vh", "calc(var(--vh, 1vh) * 100)"],
            },
        },
    },
    plugins: [],
}
