module.exports = {
  darkMode: 'class', // Explicitly enable class-based dark mode
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        neon: '0 0 10px rgba(236, 72, 153, 0.7), 0 0 20px rgba(103, 232, 249, 0.5)'
      }
    }
  },
  plugins: []
};