// src/components/TrustedByLogos.tsx
import React from 'react';
import Image from 'next/image';

// List of logo filenames provided by user
const logoFiles = [
  { src: 'bullet.svg', alt: 'Bullet Logo' },
  { src: 'dedicated-nodes.svg', alt: 'Dedicated Nodes Logo' },
  { src: 'edgevana.png', alt: 'Edgevana Logo' },
  { src: 'jito.png', alt: 'Jito Logo' },
  { src: 'latitudesh-logo.png', alt: 'Latitudesh Logo' },
  { src: 'raydium.png', alt: 'Raydium Logo' },
  { src: 'solanaLogo.svg', alt: 'Solana Logo' },
  { src: 'zeta-markets.svg', alt: 'Zeta Markets Logo' },
];

const TrustedByLogos: React.FC = () => {
  return (
    // Section container: Match Hero background or choose another, adjust padding
    <div className="bg-rich-black py-8 md:py-12 px-6"> {/* Reduced padding compared to Hero */}
      <div className="container mx-auto max-w-5xl">
        {/* Optional Title */}
        <h3 className="text-center text-sm font-semibold text-azure opacity-60 uppercase tracking-wider mb-8">
          Trusted By / Featured In {/* Adjust title as needed */}
        </h3>

        {/* Flex container for logos */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12">
          {logoFiles.map((logo) => (
            <div key={logo.src} className="flex justify-center items-center">
              <Image
                src={`/images/${logo.src}`} // Path relative to public folder
                alt={logo.alt}
                // --- ADJUST WIDTH/HEIGHT PER LOGO FOR BEST LOOK ---
                width={120} // Example width - ADJUST AS NEEDED
                height={35} // Example height - ADJUST AS NEEDED
                // --- END ADJUST ---
                className="opacity-75 hover:opacity-100 transition-opacity" // Subtle effect
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedByLogos;