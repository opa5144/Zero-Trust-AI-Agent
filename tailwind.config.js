/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Only include the `app` directory if you are using App Router.
    './components/**/*.{js,ts,jsx,tsx}', // Add only essential directories
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};