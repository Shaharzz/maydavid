/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(167, 139, 250, 0.35), 0 12px 40px rgba(124, 58, 237, 0.25)',
      },
    },
  },
  plugins: [],
}

