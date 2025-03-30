// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Experimental block might not be needed/valid in v14 for transpilePackages
    // Let's remove it for now unless we specifically need it later.
    // experimental: {
    //   // transpilePackages: [] // Option might differ or not exist in v14
    // },
    // Keep other standard v14 options if you have them
  };
  
  export default nextConfig;