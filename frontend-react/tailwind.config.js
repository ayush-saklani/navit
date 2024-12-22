/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {

    extend: {
      colors: {

        'brand-primary': {
          DEFAULT: '#043a45',
          light: '#043a45',
          dark: '#043a45',
        },
        'brand-primary-light': {
          DEFAULT: '#327174',
          light: '#327174',
          dark: '#327174',
        },
        'brand-primary-dark': {
          DEFAULT: '#032f3a',
          light: '#032f3a',
          dark: '#032f3a',
        },
        'brand-primary-transparent': {
          DEFAULT: '#055160ab',
          light: '#055160ab',
          dark: '#055160ab',
        },
        'red': {
          DEFAULT: '#fb4934',
          light: '#fb4934',
          dark: '#fb4934',
        },
        'green': {
          DEFAULT: '#b8bb26',
          light: '#b8bb26',
          dark: '#b8bb26',
        },
        'yellow': {
          DEFAULT: '#fabd2f',
          light: '#fabd2f',
          dark: '#fabd2f',
        },
        'blue': {
          DEFAULT: '#83a598',
          light: '#83a598',
          dark: '#83a598',
        },
        'purple': {
          DEFAULT: '#d3869b',
          light: '#d3869b',
          dark: '#d3869b',
        },
        'aqua': {
          DEFAULT: '#8ec07c',
          light: '#8ec07c',
          dark: '#8ec07c',
        },
        'orange': {
          DEFAULT: '#fe8019',
          light: '#fe8019',
          dark: '#fe8019',
        },
        'gray': {
          DEFAULT: '#918273',
          light: '#918273',
          dark: '#918273',
        },
        'dim-red': {
          DEFAULT: '#cc2412',
          light: '#cc2412',
          dark: '#cc2412',
        },
        'dim-green': {
          DEFAULT: '#98971a',
          light: '#98971a',
          dark: '#98971a',
        },
        'dim-yellow': {
          DEFAULT: '#d79921',
          light: '#d79921',
          dark: '#d79921',
        },
        'dim-blue': {
          DEFAULT: '#458588',
          light: '#458588',
          dark: '#458588',
        },
        'dim-purple': {
          DEFAULT: '#b16286',
          light: '#b16286',
          dark: '#b16286',
        },
        'dim-aqua': {
          DEFAULT: '#699d6a',
          light: '#699d6a',
          dark: '#699d6a',
        },
        'dim-orange': {
          DEFAULT: '#d65d0e',
          light: '#d65d0e',
          dark: '#d65d0e',
        },
        'dim-gray': {
          DEFAULT: '#a89984',
          light: '#a89984',
          dark: '#a89984',
        },
        'hard-background': {
          DEFAULT: '#1d2021',
          light: '#1d2021',
          dark: '#1d2021',
        },
        'medium-background': {
          DEFAULT: '#282828',
          light: '#282828',
          dark: '#282828',
        },
        'soft-background': {
          DEFAULT: '#323027',
          light: '#323027',
          dark: '#323027',
        },
        'background-1': {
          DEFAULT: '#3c3836',
          light: '#3c3836',
          dark: '#3c3836',
        },
        'background-2': {
          DEFAULT: '#504945',
          light: '#504945',
          dark: '#504945',
        },
        'background-3': {
          DEFAULT: '#665c54',
          light: '#665c54',
          dark: '#665c54',
        },
        'background-4': {
          DEFAULT: '#7c6764',
          light: '#7c6764',
          dark: '#7c6764',
        },
        'foreground': {
          DEFAULT: '#fbf1c7',
          light: '#fbf1c7',
          dark: '#fbf1c7',
        },
        'foreground-1': {
          DEFAULT: '#ebdbb2',
          light: '#ebdbb2',
          dark: '#ebdbb2',
        },
        'foreground-2': {
          DEFAULT: '#d5c4a1',
          light: '#d5c4a1',
          dark: '#d5c4a1',
        },
        'foreground-3': {
          DEFAULT: '#bdae93',
          light: '#bdae93',
          dark: '#bdae93',
        },
        'foreground-4': {
          DEFAULT: '#a89984',
          light: '#a89984',
          dark: '#a89984',
        },
        'bg-blur': {
          DEFAULT: 'rgba(19, 46, 42, 0.45)',
          light: '#72727259',
          dark: '#72727259',
        },
        'pulse-color': {
          DEFAULT: 'var(--Dim-Yellow)',
          light: 'var(--Dim-Yellow)',
          dark: 'var(--Dim-Yellow)',
        },
        'pulse-color2': {
          DEFAULT: 'var(--Dim-Red)',
          light: 'var(--Dim-Red)',
          dark: 'var(--Dim-Red)',
        },
        'bg0': {
          DEFAULT: "#FFFBEF",
          light: "#FFFBEF",
          dark: '#FFFBEF'
        },
        'bg1': {
          DEFAULT: "#F8F5E4",
          light: "#F8F5E4",
          dark: '#F8F5E4'
        },
        'bg2': {
          DEFAULT: "#F2EFDF",
          light: "#F2EFDF",
          dark: '#F2EFDF'
        },
        'bg3': {
          DEFAULT: "#EDEADA",
          light: "#EDEADA",
          dark: '#EDEADA'
        },
        'bg4': {
          DEFAULT: "#E8E5D5",
          light: "#E8E5D5",
          dark: '#E8E5D5'
        },
        'bg5': {
          DEFAULT: "#BEC5B2",
          light: "#BEC5B2",
          dark: '#BEC5B2'
        },
        'gray1': {
          DEFAULT: "#A6B0A0",
          light: "#A6B0A0",
          dark: '#A6B0A0'
        },
        'gray2': {
          DEFAULT: "#939F91",
          light: "#939F91",
          dark: '#939F91'
        },
        'gray3': {
          DEFAULT: "#829181",
          light: "#829181",
          dark: '#829181'
        },
      }
    },
  },
variants: {
  extend: { },
},
plugins: [],
}

