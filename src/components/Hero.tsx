// src/components/Hero.tsx
import React from 'react';
// Link might not be needed here anymore unless added back
import Image from 'next/image'; // Keep Image if needed elsewhere, or remove if not
import LogoMarquee from '@/components/LogoMarquee'; // <-- Import the new component

// Keep logo data here for now, pass as prop
const logoFiles = [
  { src: 'bullet.svg', alt: 'Bullet Logo' },
  { src: 'dedicated-nodes.svg', alt: 'Dedicated Nodes Logo' },
  { src: 'edgevana.svg', alt: 'Edgevana Logo' },
  { src: 'jito.svg', alt: 'Jito Logo' },
  { src: 'latitudesh-logo.svg', alt: 'Latitudesh Logo' },
  { src: 'raydium.svg', alt: 'Raydium Logo' },
  { src: 'solanaFoundationLogo.svg', alt: 'Solana Logo' },
  { src: 'Zeta-markets.svg', alt: 'Zeta Markets Logo' },
  { src: 'upside.svg', alt: 'Upside Logo' },
  { src: 'caleb&Brown.svg', alt: 'Caleb & Brown Logo' },
];

const Hero: React.FC = () => {
  const heroStyle: React.CSSProperties = {
    backgroundImage: 'url(/images/shipping-port.svg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  };

  return ( 
        <section
          // REMOVE py-XX, ADD min-h-[XXvh]
          className="bg-rich-black text-white min-h-[90vh] flex flex-col justify-center items-center px-6 relative overflow-hidden" // <-- ADJUST HEIGHT HERE
          style={heroStyle}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-rich-black/90 z-0"></div>

      {/* Wrapper for ALL content (text + logos) */}
      <div className="relative z-10 w-full flex flex-col items-center">

        {/* Main Text Content Container */}
        {/* Adjust mb-XX here to control space ABOVE logos */}
        <div className="container max-w-6xl text-left mb-24 md:mb-40">
        <h1 className="font-title font-semibold text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight"> {/* Corrected font weight class */}
              Zero Fee <br /> Solana Staking
            </h1>
            <p className="font-title font-light text-lg md:text-xl text-azure opacity-90 mb-20 max-w-2xl">
              Reliable, High-Performance Staking. <br /> Zero Fees. Better Loing term Returns.
            </p>
            <button
              type="button"
              className="font-title bg-tangerine hover:bg-orange-peel text-rich-black font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 self-start"
            >
              Stake Now
            </button>
        </div>

        {/* Render the LogoMarquee component, passing the logos */}
        {/* Adjust padding-bottom (pb-XX) on this component via its internal div if needed */}
        <LogoMarquee logos={logoFiles} title="Trusted By" /> {/* <-- Use the new component */}

      </div>{/* End Wrapper for ALL content */}
    </section>
  );
};

export default Hero;