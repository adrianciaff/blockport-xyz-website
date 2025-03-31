import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rich-black': '#010D14',
        'prussian-blue': '#02263C',
        'aero': '#28B6E2',
        'azure': '#DEF0F7', // Corrected hex
        'orange-peel': '#FD9E02',
        'tangerine': '#FB8500',
        'white': '#FFFFFF', // Explicitly adding white
      },
      animation: {
        marqueeScroll: 'marqueeScroll 40s linear infinite', // Adjust duration as needed
      },
      keyframes: {
        marqueeScroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      fontFamily: {
        sans: ['quicksand', ...defaultTheme.fontFamily.sans],
        title: ['neulis-sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;