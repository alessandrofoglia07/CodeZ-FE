/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
const config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                cousine: ['Cousine', ...defaultTheme.fontFamily.mono],
                fira_code: ['Fira Code', ...defaultTheme.fontFamily.mono],
                jetbrains_mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
                noto_sans_mono: ['Noto Sans Mono', ...defaultTheme.fontFamily.mono],
                roboto_mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono],
                courier_prime: ['Courier Prime', ...defaultTheme.fontFamily.mono]
            },
            screens: {
                '-md': { max: '767px' },
                '-sm': { max: '639px' },
                '-lg': { max: '1023px' }
            },
            colors: {
                primary: '#40A2D8',
                secondary: '#141E2A',
                'secondary-bg': '#151b2b'
            },
            padding: {
                18: '4.5rem'
            },
            margin: {
                18: '4.5rem'
            },
            width: {
                18: '4.5rem'
            },
            animation: {
                'opacity-explorer-bar': 'opacity-explorer-bar 0.5s ease-in-out forwards'
            }
        }
    },
    plugins: []
};

export default config;
