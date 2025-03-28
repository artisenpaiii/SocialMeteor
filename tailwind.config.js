/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './imports/**/*.{js,ts,jsx,tsx}',
      './client/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [require('tailwind-scrollbar')],
  };
  