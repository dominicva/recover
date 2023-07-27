/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
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
    },
  },
  plugins: [require('@headlessui/tailwindcss')],
};
