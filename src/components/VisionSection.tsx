// src/components/VisionSection.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component for optimization

const VisionSection: React.FC = () => {
  // --- Assuming Tailwind is configured with your custom colors ---
  // tailwind.config.js might have:
  // theme: {
  //   extend: {
  //     colors: {
  //       'rich-black': '#010D14',
  //       'prussian-blue': '#02263C',
  //       'aero': '#28B6E2',
  //       'azure': '#DEFOF7',
  //       'orange-peel': '#FD9E02',
  //       'tangerine': '#FB8500',
  //       'white': '#FFFFFF',
  //     }
  //   }
  // }
  // ---

  return (
    // Section: ADD rounded-2xl back. REMOVE mb-2. Keep positioning, overlap, height etc.
    <section className={
        `relative z-10 -mt-16 py-24 md:py-44 px-8 flex flex-col justify-center overflow-hidden ` +
        `rounded-2xl` // <-- ADDED rounding for ALL corners back
      }>

        {/* Arrow Indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-aero/50 animate-bounce">
          {/* ... (arrow svg) ... */}
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>

        {/* Layer 1: Solid Azure Background (z-0) - Keep rounded */}
        <div className="absolute inset-0 bg-white z-0 rounded-2xl"></div>

        {/* Layer 2: Frosted Glass Pane (z-5) - Keep rounded */}
        <div className={
            `absolute inset-0 z-[5] ` +
            `bg-white/15 backdrop-blur-md ` + // Existing blur
            `rounded-2xl border border-white/10`
        }></div>

        {/* Layer 3: Dotted Map SVG Background (z-8) - Keep rounded */}
        <div
          className={
            `absolute inset-0 z-[8] ` +
            `bg-[url('/images/dotted_world_map.svg')] bg-bottom bg-no-repeat ` +
            `bg-[length:100%_auto] ` +
            `opacity-30 rounded-2xl`
          }
        ></div>

        {/* Layer 4: Content Container (z-10) */}
        <div className="container mx-auto max-w-5xl text-left relative z-10">

          {/* Headline: Light text */}
          <h2 className="text-4xl md:text-5xl font-bold font-title mb-8 text-rich-black">
            We provide institutional Solana staking services that outperform.
          </h2>

          {/* Paragraph: Light text */}
          <p className="text-xl md:text-2xl text-rich-black opacity-95 mb-12 max-w-3xl">
            As hardware and networking continue to improve, technologies like Solana demonstrate the promise of a unified, hyperconnected financial system, designed to make the world go faster.
          </p>

          {/* Link */}
          <Link
            href="https://docs.blockport.xyz/docs/team"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-tangerine hover:bg-orange-peel text-rich-black font-semibold py-2 px-6 rounded-lg text-base transition duration-300 ease-in-out transform hover:scale-105"
          >
            View Stats
          </Link>

          {/* --- NEW Tiles Section --- */}
          <div className="mt-16 flex flex-col md:flex-row gap-6 md:gap-8 justify-left">

            {/* Tile 1: Solana Focused */}
            <div className={
              `p-8 max-w-xs rounded-xl border border-rich-black/20 ` +
              `bg-rich-black/5 backdrop-blur-sm ` + // Aero background with transparency + blur
              `flex flex-col items-center justify-center` +
              `min-h-[150px]` + // Flex layout for logo + text
              `text-rich-black` // Set default text color for this tile
            }>
              <Image
                src="/images/solanaLogo1.svg"
                alt="Solana Logo"
                width={40} // Adjust size as needed
                height={40}
                className="h-10 w-auto mb-2" // Control size and prevent shrinking
              />
              <span className="text-xs font-medium opacity-90 font-title max-w-[150px]">Solana Focused Validator</span>
            </div>

            {/* Tile 2: Ranking */}
            <div className={
              `p-4 max-w-xs rounded-xl border border-prussian-blue/20 ` +
              `bg-azure/95 backdrop-blur-sm ` + // Aero background with transparency + blur
              `flex flex-col justify-center items-center text-center` + // Center content vertically and horizontally
              `text-rich-black` // Set default text color for this tile
            }>
              {/* Number + Suffix */}
              <div className="flex items-baseline mb-1">
                <span className="text-5xl lg:text-6xl font-bold font-title leading-none">
                  217
                </span>
                <span className="text-base font-medium font-title opacity-80 ml-1">
                  /1600
                </span>
              </div>
              {/* Description Text */}
              <p className="text-xs font-medium opacity-90 font-title text-center max-w-[150px]"> {/* Small text below */}
                Current Epoch Vote Ranking
              </p>
            </div>

          </div>
          {/* --- End NEW Tiles Section --- */}

        </div> {/* End Content Container div */}
    </section>
  );
};

export default VisionSection;