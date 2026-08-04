/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './oferta/*.html'],
  theme: {
    extend: {
      colors: {
        greige: '#7B7A78',
        taupe:  '#9A938B',
        mist:   '#C9C3BB',
        sand:   '#E8E3DC',
        cream:  '#F5F2ED',
        ink:    '#2D2B29',
        rose:   '#B79A8E',
        'rose-deep': '#A07E70',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.35em',
        wide2: '0.18em',
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        ken: { from: { transform: 'scale(1) translateY(0)' }, to: { transform: 'scale(1.12) translateY(-2%)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        ken: 'ken 22s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
