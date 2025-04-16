// src/components/StakeInfo.tsx
import React from 'react';
import Link from 'next/link';

const StakeInfo: React.FC = () => {
  // --- Define React style objects from the embed code ---
  const iframeWrapperStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    position: 'relative',
    width: '100%',
    paddingTop: '40%', // Reduced from 63.56% for less vertical height
    borderRadius: '14px',
    overflow: 'hidden',
  };

  const iframeStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
  };
  // --- End style objects ---

  return (
    // Section: Reduced min-height from min-h-screen to make it shorter
    <section className={
        `relative z-8 pt-16 pb-16 md:pt-20 md:pb-32 px-6 rounded-2xl flex flex-col ` +
        `bg-rich-black text-white overflow-hidden`
      }>
      
      {/* Bottom glow effect that will get overlapped */}
      <div 
        className="absolute bottom-0 left-0 w-full h-64 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(97, 218, 251, 0.2) 0%, rgba(97, 218, 251, 0.05) 40%, rgba(0, 0, 0, 0) 80%)',
          transform: 'translateY(40%)'
        }}
      ></div>
 
      {/* Container */}
      <div className="container mx-auto max-w-6xl flex flex-col flex-grow relative z-10">

        {/* Inner Content Box (Glass Effect) */}
        <div className={
            `relative flex-grow p-6 md:p-10 rounded-2xl flex flex-col ` + // Reduced padding
            `bg-white/10 backdrop-blur-sm ` +
            `border border-white/10`
            }>

            {/* Text Content Area - Reduced margin bottom */}
            <div className="mb-6 md:mb-8 text-left">
              <h2 className="text-3xl md:text-4xl font-bold font-title mb-4 text-white">
                Stake Your SOL
              </h2>
              <div className="text-lg max-w-5xl">
                <p className="text-azure opacity-100">
                  We put delegators first by charging 0% commissions on staking yields.
                </p>
              </div>
            </div>

            {/* Chart Area Wrapper */}
            <div className="flex-grow flex flex-col">
               {/* --- REPLACE PLACEHOLDER WITH IFRAME --- */}
               {/* Apply the responsive iframe wrapper */}
               <div style={iframeWrapperStyle}>
                  <iframe
                     src="https://visualize.graphy.app/view/8255f92c-4a70-403e-bf16-0a3fbd61f0d1"
                     loading="lazy"
                     allowFullScreen
                     style={iframeStyle}
                     title="Historical Performance APY Chart"
                   ></iframe>
                </div>
               {/* --- END IFRAME --- */}
            </div>

        </div> {/* End Inner Content Box */}

      </div> {/* End container div */}
    </section>
  );
};

export default StakeInfo;