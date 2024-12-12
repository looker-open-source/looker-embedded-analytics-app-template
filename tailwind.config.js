/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'true',
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'main-bg': '#353535',
        'primary-blue': '#2092FD',
        green: {
          500: '#1DCB70'
        },
        red: {
          500: '#F6271A'
        }
      },
      gridTemplateColumns: {
        24: 'repeat(24, minmax(0, 1fr))',
        25: 'repeat(25, minmax(0, 1fr))',
        32: 'repeat(32, minmax(0, 1fr))'
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
        'span-21': 'span 21 / span 21',
        'span-22': 'span 22 / span 22',
        'span-23': 'span 23 / span 23',
        'span-24': 'span 24 / span 24',
        'span-32': 'span 32 / span 32'
      },
      fontFamily: {
        primary: ['Noto Sans', 'Arial', 'sans-serif'],
        secondary: ['Montserrat', 'Arial', 'sans-serif']
      },
      boxShadow: {
        'inner-bottom': 'inset 0 -2px 4px 0 rgb(0 0 0 / 0.05)'
      }
    }
  }
}
