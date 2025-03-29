// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // If using pages router
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Standard for App Router
  ],
  theme: {
    extend: {
      // Add custom theme extensions here later if needed
      // e.g., backgroundImage: { 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))', ... }
    },
  },
  plugins: [
    // Add plugins here later if needed
  ],
};
export default config;