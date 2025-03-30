// src/components/TrustSignals.tsx
'use client';

import React, { useState } from 'react';

interface TrustSignalItem {
  id: string;
  title: string;
  description: string;
}

const signals: TrustSignalItem[] = [
  {
    id: 'uptime',
    title: "3+ Years of Uptime",
    description: "With over three years of continuous mainnet operation and a proven 99.9% uptime record, we’ve shown that sustained reliability translates into consistent, compounding yields for our delegators over the long haul."
  },
  {
    id: 'commissions',
    title: "0% Commission Hikes",
    description: "We’ve never raised commissions since inception—no hidden fees or surprise hikes. This sets us apart from other validators, most of which have raised fees at least once."
  },
  {
    id: 'ranking',
    title: "Top Ranking Validator",
    description: "High-performance hardware and optimizations ensure consistently strong performance within the validator set." // Using placeholder description
  },
];

// --- Placeholder Components (Keep these as they are) ---

const UptimeDisplay: React.FC = () => (
  <div className="bg-gray-800 p-8 rounded-lg text-center border border-gray-700">
    <div className="text-5xl font-bold text-orange-500 mb-3">1,234,567</div>
    <div className="text-gray-400 text-sm">Blocks Produced Since Jan 2022 (Example)</div>
    <div className="text-xs text-gray-500 mt-4">// TODO: Integrate live block count in Phase 5</div>
  </div>
);

const CommissionDisplay: React.FC = () => (
   <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 space-y-4">
     <h4 className="text-lg font-semibold text-center mb-4">Historical Commission Adjustments</h4>
     {/* Simplified Bar Comparison */}
     <div className="space-y-3">
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Blockport</span>
                <span className="font-bold text-green-400">0 Increases</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '5%' }}></div>
            </div>
        </div>
        <div>
            <div className="flex justify-between text-sm mb-1">
                 <span className="text-gray-300">Avg. Competitor</span>
                 <span className="font-bold text-yellow-400">~2 Increases</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
            </div>
        </div>
     </div>
     <p className="text-xs text-gray-400 text-center pt-2">
       (~2x less likely to impose sneaky commission adjustments than avg. validators)
     </p>
     <div className="text-xs text-gray-500 text-center pt-2">// TODO: Validate/update competitor data in Phase 5</div>
   </div>
);

const RankingDisplay: React.FC = () => (
  <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
    <h4 className="text-lg font-semibold mb-4">Recent Epoch Vote Ranking (Example)</h4>
    <ul className="space-y-2 text-sm mb-4">
      <li className="flex justify-between"><span className="text-orange-500 font-bold">Blockport:</span> <span>~35</span></li>
      <li className="flex justify-between"><span className="text-gray-400">Coinbase Custody:</span> <span>X</span></li>
      <li className="flex justify-between"><span className="text-gray-400">Ledger by Figment:</span> <span>Y</span></li>
      <li className="flex justify-between"><span className="text-gray-400">Kraken:</span> <span>Z</span></li>
    </ul>
    <p className="text-xs text-gray-400 border-t border-gray-700 pt-3">
        Note: Lower latency & optimized hardware contribute to ranking.
    </p>
     <div className="text-xs text-gray-500 text-center pt-2">// TODO: Integrate live API ranking data in Phase 5</div>
  </div>
);

// --- Removed DefaultDisplay component ---

// --- Main TrustSignals Component ---

const TrustSignals: React.FC = () => {
  // Initialize state with 'uptime' ID to show it by default
  const [hoveredSignalId, setHoveredSignalId] = useState<string>('uptime');

  // Function to render the correct display based on hover state
  const renderDisplayPanel = () => {
    switch (hoveredSignalId) {
      case 'uptime':
        return <UptimeDisplay />;
      case 'commissions':
        return <CommissionDisplay />;
      case 'ranking':
        return <RankingDisplay />;
      default:
        // Fallback to uptime display if state is somehow invalid
        // (or handle differently if needed)
        return <UptimeDisplay />;
    }
  };

  return (
    <section className="bg-gray-900 text-white py-16 md:py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Engineered for Trust & Performance
        </h2>

        {/* Change items-start to items-center for vertical centering */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center"> {/* <--- CHANGE HERE */}

          {/* Left Column: List of Trust Signals */}
          <div className="md:w-1/2 space-y-4">
            {signals.map((signal) => (
              <div
                key={signal.id}
                className={`p-4 rounded-lg border transition-colors duration-200 ease-in-out cursor-default ${hoveredSignalId === signal.id ? 'bg-gray-800 border-orange-500' : 'bg-gray-800/30 border-gray-700 hover:border-gray-500'}`}
                onMouseEnter={() => setHoveredSignalId(signal.id)}
                // Set state back to 'uptime' on mouse leave
                onMouseLeave={() => setHoveredSignalId('uptime')} // <-- CHANGE HERE
              >
                <h3 className="font-semibold text-lg mb-1">{signal.title}</h3>
                <p className="text-gray-400 text-sm">{signal.description}</p>
              </div>
            ))}
          </div>

          {/* Right Column: Dynamic Display Panel */}
          <div className="md:w-1/2 mt-8 md:mt-0 md:sticky md:top-24">
            {renderDisplayPanel()}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustSignals;