// src/components/Hero.tsx
import React from 'react';
// Link might not be needed here anymore unless added back
import Image from 'next/image'; // Keep Image if needed elsewhere, or remove if not
import LogoMarquee from '@/components/LogoMarquee'; // <-- Import the new component
import GlobeAnimation from './GlobeAnimation';

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
  // REMOVED heroStyle with background image

  return (
    // Removed style prop, adjusted min-height, main flex container
    <section
      className="bg-rich-black text-white min-h-[95vh] flex flex-col justify-start items-center px-6 relative overflow-hidden" // Adjusted min height slightly
    >
      {/* Overlay (kept for dark background) */}
      <div className="absolute inset-0 bg-rich-black z-0"></div> {/* Removed opacity potentially */}

      {/* Wrapper for text + globe content */}
      {/* Changed to flex-col initially, md:flex-row for side-by-side on medium+ screens */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between mt-10 md:mt-0 flex-grow px-4"> {/* Use max-w-7xl for wider content */}

        {/* Text Content Container */}
        {/* Takes roughly half width on medium+ screens, full width below */}
        <div className="container md:w-1/2 lg:w-3/5 text-center md:text-left mb-16 md:mb-0 md:pr-8 lg:pr-12"> {/* Added padding-right */}
          <h1 className="font-title font-semibold text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Zero Fee <br /> Solana Staking
          </h1>
          <p className="font-title font-light text-lg md:text-xl text-azure opacity-90 mb-10 max-w-2xl mx-auto md:mx-0"> {/* Reduced bottom margin */}
            Reliable, High-Performance Staking. <br /> Zero Fees. Better Long term Returns.
          </p>
          <button
            type="button"
            className="font-title bg-tangerine hover:bg-orange-peel text-rich-black font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105" // Removed self-start, rely on container alignment
          >
            Stake Now
          </button>
        </div>

    {/* Globe Container - Robust Vertical Centering */}
    <div className="
        w-full max-w-[350px] sm:max-w-[450px] h-[350px] sm:h-[450px] {/* Mobile: Base styles */}
        mx-auto mt-0 md:mt-0 {/* Mobile: Centering and margin */}
        md:absolute md:w-[500px] md:h-[500px] {/* Medium+: Absolute positioning, size */}
        lg:w-[600px] lg:h-[600px] {/* Large+: Increase size */}
        md:top-1/2 {/* Desktop: Anchor to vertical middle */}
        md:right-4 {/* Desktop: Align right edge */}
        md:transform md:-translate-y-1/2 {/* Desktop: Center vertically based on own height */}
        md:translate-x-0 {/* Desktop: No horizontal shift from right edge */}
        lg:-ml-10 {/* Example: Optional large screen horizontal nudge */}
        md:translate-y-0.3 {/* <<<< ADD/ADJUST: Optional nudge down (e.g., translate-y-4, translate-y-8) */}
    ">
        <GlobeAnimation />
    </div>

      </div> {/* End text + globe Wrapper */}

      {/* Logo Marquee at the bottom */}
      <div className="relative z-10 w-full mt-16 md:mt-24 pb-20"> {/* Added margin-top */}
        <LogoMarquee logos={logoFiles} title="Trusted By" />
      </div>

    </section>
  );
};

export default Hero;