/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'text-indigo-600',
    'text-green-600',
    'text-blue-600',
    'text-red-600',
    'text-yellow-600',
  ],
};