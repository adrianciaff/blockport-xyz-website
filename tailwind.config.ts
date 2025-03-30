// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    // Standard paths for App Router with src directory
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {}, // Add theme extensions later if needed
  },
  plugins: [
    require('@tailwindcss/typography'), // Keep for blog styling
  ],
};
export default config;