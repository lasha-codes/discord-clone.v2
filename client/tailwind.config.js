/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sidebar_color: '#242426',
        bg_color: '#36393E',
        discord_color: '#5D6CFF',
        second_bar_color: '#2f3136',
      },
    },
  },
  plugins: [],
}
