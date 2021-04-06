module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      fontFamily: {
        'open-sans': '"Open Sans", Helvetica, Arial, sans-serif',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
