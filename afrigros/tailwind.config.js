/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFCC00', // Jaune principal
          light: '#FFE066',
          dark: '#E6B800',
        },
        secondary: {
          DEFAULT: '#333333', // Gris foncé/noir
          light: '#666666',
          dark: '#1A1A1A',
        },
        accent: {
          DEFAULT: '#FF6B35', // Orange pour accent
        },
        success: {
          DEFAULT: '#4CAF50', // Vert pour succès
        },
        warning: {
          DEFAULT: '#FF9800', // Orange pour avertissement
        },
        danger: {
          DEFAULT: '#F44336', // Rouge pour erreur
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
