module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // animation: {
      //   'loading': 'wiggle 1s ease-in-out infinite'
      // },
      colors: {
        nkayellow: '#f7f700',
        nkayellowdarker: '#abab00'
      },
      fontFamily: {
        'montserrat': ['Montserrat'],
        'lato': ['Lato'],
        'garamond': ['Garamond']
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled']
    }
  },
  plugins: [require('@tailwindcss/forms')]
};