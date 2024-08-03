/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sidebar_color: '#2C2F33',
        bg_color: '#424549',
        discord_color: '#5D6CFF',
      },
    },
  },
  plugins: [],
}
