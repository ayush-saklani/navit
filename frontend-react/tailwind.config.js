/** @type {import('tailwindcss').Config} */
export default {
  purge: [ './src/**/*.{js,jsx,ts,tsx}', './public/index.html' ],
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {
      colors: {
        'brand-primary': '#043a45',
        'brand-primary-light': '#327174',
        'brand-primary-dark': '#032f3a',
        'brand-primary-transparent': '#055160ab',
        'red': '#fb4934',
        'green': '#b8bb26',
        'yellow': '#fabd2f',
        'blue': '#83a598',
        'purple': '#d3869b',
        'aqua': '#8ec07c',
        'orange': '#fe8019',
        'gray': 'rgb(145, 130, 115)',
        'dim-red': '#cc2412',
        'dim-green': '#98971a',
        'dim-yellow': '#d79921',
        'dim-blue': '#458588',
        'dim-purple': '#b16286',
        'dim-aqua': '#699d6a',
        'dim-orange': '#d65d0e',
        'dim-gray': '#a89984',
        'hard-background': '#1d2021',
        'medium-background': '#282828',
        'soft-background': '#323027',
        'background-1': '#3c3836',
        'background-2': '#504945',
        'background-3': '#665c54',
        'background-4': '#7c6764',
        'foreground': '#fbf1c7',
        'foreground-1': '#ebdbb2',
        'foreground-2': '#d5c4a1',
        'foreground-3': '#bdae93',
        'foreground-4': '#a89984',
        'pulse-color': 'var(--Dim-Yellow)',
        'pulse-color2': 'var(--Dim-Red)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

