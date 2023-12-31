/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'body-text': '#636364',
        'light-gray': '#F7F8FA',
        'gray-2': '#E7EAF1',
        'dark-purple': '#AD91CC',
        purple: '#EFE1FF',
        'purple-2': '#E5CDFF',
        'dark-green': '#66B27F',
        green: '#B3F5C9',
        'green-2': '#8BDDA6',
        'dark-blue': '#76C2FF',
        blue: '#CEE9FF',
        'blue-2': '#B2DDFF',
        'icon-gray': '#CCD1DD',
        'neutral-5': '#21272A',
        'neutral-4': '#4D5358',
        'neutral-3': '#878D96',
        'neutral-2': '#919CA9',
        'neutral-1': '#DDE1E6',
        'neutral-0': '#F7F7F7',
        'primary-dark': '#070D19',
        'primary-light': '#3D4656',
        'primary-subtle': '#868C96',
        'error-dark': '#E53535',
        'error-light': '#FF5C5C',
        'error-subtle': '#FF8080',
        'warning-dark': '#E5B800',
        'warning-light': '#FDDD48',
        'warning-subtle': '#FDED72',
        'success-dark': '#05A660',
        'success-light': '#39D98A',
        'success-subtle': '#57EBA1',
        error: '#FF3B3B',
        warning: '#FFCC00',
        success: '#06C270',

        primary: '#0a6ff8',
        secondary: '#FF7E1D',
        tertiary: '#FECE00',
        'blue-lighter': '#5BBBFF',
        'blue-darker': '#0540FF',
        'purple-lighter': '#5330A5',
        'purple-darker': '#281465',
        'off-white': '#F9F4F2',
        'off-black': '#2D2C2B',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
