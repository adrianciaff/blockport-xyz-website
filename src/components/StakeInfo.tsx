// src/components/StakeInfo.tsx
import React from 'react';

const StakeInfo: React.FC = () => {
  return (
    // Ensure relative, z-index, negative margin for overlap, rounding
   <section className="relative z-10 -mt-20 bg-white text-prussian-blue pt-16 pb-16 md:pt-20 md:pb-20 px-6 rounded-2xl min-h-screen flex flex-col"> {/* Increased overlap margin -mt-20 */}

        {/* Arrow Indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-aero/50 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>

        {/* Container */}
        <div className="container mx-auto max-w-6xl flex flex-col flex-grow mt-4">

          {/* Main Combined Content Box (Gradient, Padding, Rounded - applied earlier) */}
          {/* Using flex-col, letting text block define its height, chart area grows */}
          <div className="flex-grow bg-gradient-to-br from-azure to-aero p-8 rounded-lg flex flex-col">

            {/* Text Content Area (margin below controls gap) */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-title mb-6 text-rich-black">
                Stake Your SOL
              </h2>
              <div className="space-y-4 text-lg max-w-3xl">
                <p>Our regulated Australian business puts delegators at the core of everything we do.</p>
                <p>With 0% commissions on staking yields, our operation specialises only on Solana’s high networking demands.</p>
              </div>
            </div>

            {/* Chart Placeholder Area (Flex grow pushes it down/expands) */}
            <div className="flex-grow flex flex-col justify-center items-center">
               <div className="text-center w-full min-h-[300px] md:min-h-[400px] flex flex-col justify-center items-center p-4">
                  <h3 className="text-xl font-semibold text-prussian-blue/80 mb-4">Historical Performance (APY)</h3>
                  <p className="text-prussian-blue/60">Interactive chart (6m, 1y, 3y) coming in Phase 5.</p>
                  <span className="text-2xl font-mono text-prussian-blue/40 mt-4">[ Chart Area ]</span>
                  <div className="text-xs text-prussian-blue/40 mt-8">// TODO: Implement Chart & Data Fetching in Phase 5</div>
               </div>
            </div>

          </div> {/* End Main Content Box */}

        </div> {/* End container div */}
    </section>
  );
};

export default StakeInfo;