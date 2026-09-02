/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FAF9F6',
          100: '#F5F6F5',
          200: '#EBECE9',
          300: '#D8D6CD',
          400: '#C5C3B8',
        },
        ink: {
          DEFAULT: '#1C1E1B',
          light: '#3C403B',
          muted: '#5F635C',
          faint: '#8D9188',
        },
        navy: {
          DEFAULT: '#1F2A44',
          dark: '#141C2E',
          light: '#2D3D61',
        },
        brass: {
          DEFAULT: '#C08A2E',
          light: '#DBA54A',
          dark: '#9A6C20',
          hover: '#AE7A24',
        },
        status: {
          pending: '#C97C1F',
          review: '#3E6E9E',
          resolved: '#4C7A4A',
          escalated: '#B3452F',
        },
        ticket: {
          equipment: '#1D5A6E',
          power: '#942B23',
          water: '#DF693E',
          sanitation: '#8F3D68',
          housing: '#8A5994',
          network: '#7A8C54',
          security: '#22345C',
          admin: '#C88D27',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        ticket: ['"Impact"', '"Bebas Neue"', '"Trebuchet MS"', 'sans-serif'],
        stamp: ['"Courier New"', 'Courier', 'monospace'],
      },
      boxShadow: {
        'ticket': '0 8px 24px -6px rgba(28, 30, 27, 0.12), 0 2px 6px -1px rgba(28, 30, 27, 0.08)',
        'ticket-hover': '0 14px 32px -4px rgba(28, 30, 27, 0.18), 0 4px 10px -2px rgba(28, 30, 27, 0.12)',
        'stamp': 'inset 0 0 0 2px currentColor, 0 2px 4px rgba(0,0,0,0.1)',
        'ledger': '0 1px 3px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)',
      },
      backgroundImage: {
        'paper-pattern': "radial-gradient(#d8d6cd 0.75px, transparent 0.75px)",
        'ticket-perforated': "repeating-linear-gradient(to bottom, #d8d6cd, #d8d6cd 6px, transparent 6px, transparent 12px)",
      }
    },
  },
  plugins: [],
}
