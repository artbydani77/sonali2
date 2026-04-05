import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        party: {
          red:    '#FF3B3B',
          orange: '#FF7A00',
          yellow: '#FFD600',
          green:  '#00C96B',
          teal:   '#00B8D4',
          blue:   '#2979FF',
          purple: '#7C3AED',
          pink:   '#FF3CAC',
        },
        cream: '#FFFBF5',
        ink:   '#1A1A2E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        brand:   ['var(--font-brand)',   'cursive'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'confetti-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF3B3B' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'party':     '0 8px 30px -4px rgba(255,59,59,0.25)',
        'party-lg':  '0 20px 60px -8px rgba(255,59,59,0.3)',
        'card':      '0 4px 24px -2px rgba(26,26,46,0.10)',
        'card-hover':'0 12px 40px -4px rgba(26,26,46,0.18)',
        'btn':       '0 4px 14px 0 rgba(0,0,0,0.15)',
      },
      animation: {
        'float-slow':  'float 5s ease-in-out infinite',
        'float-med':   'float 3.5s ease-in-out infinite',
        'float-fast':  'float 2.5s ease-in-out infinite',
        'spin-slow':   'spin 8s linear infinite',
        'wiggle':      'wiggle 0.6s ease-in-out infinite',
        'pop-in':      'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        'slide-up':    'slideUp 0.5s cubic-bezier(0.34,1.2,0.64,1)',
        'confetti-fall':'confettiFall 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':     { transform: 'translateY(-18px) rotate(3deg)' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(-5deg)' },
          '50%':     { transform: 'rotate(5deg)' },
        },
        popIn: {
          '0%':   { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)',   opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        confettiFall: {
          '0%':   { transform: 'translateY(-20px) rotate(0deg)',   opacity: '1' },
          '100%': { transform: 'translateY(120vh) rotate(720deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
