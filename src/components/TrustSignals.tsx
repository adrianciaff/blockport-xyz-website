// src/components/TrustSignals.tsx
'use client';

import React, { useState } from 'react';

interface TrustSignalItem {
  id: string;
  title: string;
  description: string;
}

const signals: TrustSignalItem[] = [
  { id: 'uptime', title: "3+ Years of Uptime", description: "With over three years of continuous mainnet operation and a proven 99.9% uptime record, we’ve shown that sustained reliability translates into consistent, compounding yields for our delegators over the long haul." },
  { id: 'commissions', title: "0% Commission Hikes", description: "We’ve never raised commissions since inception—no hidden fees or surprise hikes. This sets us apart from other validators, most of which have raised fees at least once." },
  { id: 'ranking', title: "Top Performance Validator", description: "High-performance hardware and optimizations ensure consistently strong performance within the validator set." },
];

// --- Placeholder Components using Palette ---

const UptimeDisplay: React.FC = () => (
  // Use prussian-blue bg, azure/orange text, aero border accent?
  <div className="bg-prussian-blue p-8 rounded-lg text-center border border-aero/50">
    <div className="text-5xl font-bold text-tangerine mb-3">1,234,567</div>
    <div className="text-azure opacity-80 text-sm">Blocks Produced Since Jan 2022 (Example)</div>
    <div className="text-xs text-azure opacity-50 mt-4">// TODO: Integrate live block count in Phase 5</div>
  </div>
);

const CommissionDisplay: React.FC = () => (
   <div className="bg-prussian-blue p-8 rounded-lg border border-aero/50 space-y-4">
     <h4 className="text-lg font-semibold text-center mb-4 text-white">Historical Commission Adjustments</h4>
     <div className="space-y-3">
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-azure">Blockport</span>
                <span className="font-bold text-aero">0 Increases</span>
            </div>
            <div className="w-full bg-rich-black rounded-full h-2.5">
                <div className="bg-aero h-2.5 rounded-full" style={{ width: '5%' }}></div>
            </div>
        </div>
        <div>
            <div className="flex justify-between text-sm mb-1">
                 <span className="text-azure">Avg. Competitor</span>
                 <span className="font-bold text-orange-peel">~2 Increases</span>
            </div>
            <div className="w-full bg-rich-black rounded-full h-2.5">
                <div className="bg-orange-peel h-2.5 rounded-full" style={{ width: '60%' }}></div>
            </div>
        </div>
     </div>
     <p className="text-xs text-azure opacity-70 text-center pt-2">
       (~2x less likely to impose sneaky commission adjustments than avg. validators)
     </p>
     <div className="text-xs text-azure opacity-50 text-center pt-2">// TODO: Validate/update competitor data in Phase 5</div>
   </div>
);

const RankingDisplay: React.FC = () => (
  <div className="bg-prussian-blue p-8 rounded-lg border border-aero/50">
    <h4 className="text-lg font-semibold mb-4 text-white">Recent Epoch Vote Ranking (Example)</h4>
    <ul className="space-y-2 text-sm mb-4">
      <li className="flex justify-between"><span className="text-tangerine font-bold">Blockport:</span> <span className="text-white">~35</span></li>
      <li className="flex justify-between"><span className="text-azure opacity-75">Coinbase Custody:</span> <span className="text-white">X</span></li>
      <li className="flex justify-between"><span className="text-azure opacity-75">Ledger by Figment:</span> <span className="text-white">Y</span></li>
      <li className="flex justify-between"><span className="text-azure opacity-75">Kraken:</span> <span className="text-white">Z</span></li>
    </ul>
    <p className="text-xs text-azure opacity-70 border-t border-aero/30 pt-3">
        Note: Lower latency & optimized hardware contribute to ranking.
    </p>
     <div className="text-xs text-azure opacity-50 text-center pt-2">// TODO: Integrate live API ranking data in Phase 5</div>
  </div>
);

// --- Main TrustSignals Component ---

const TrustSignals: React.FC = () => {
  const [hoveredSignalId, setHoveredSignalId] = useState<string>('uptime');

  const renderDisplayPanel = () => {
    switch (hoveredSignalId) {
      case 'uptime': return <UptimeDisplay />;
      case 'commissions': return <CommissionDisplay />;
      case 'ranking': return <RankingDisplay />;
      default: return <UptimeDisplay />;
    }
  };

  return (
    // Use rich-black bg, white/azure text
    <section className="bg-rich-black text-white py-16 md:py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-title text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Engineered for Trust & Performance
        </h2>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Left Column */}
          <div className="md:w-1/2 space-y-4">
            {signals.map((signal) => (
              <div
                key={signal.id}
                // Use prussian-blue bg, tangerine border on hover/active
                className={`p-4 rounded-lg border transition-colors duration-200 ease-in-out cursor-default ${hoveredSignalId === signal.id ? 'bg-prussian-blue border-tangerine' : 'bg-prussian-blue/30 border-transparent hover:border-aero/30'}`}
                onMouseEnter={() => setHoveredSignalId(signal.id)}
                onMouseLeave={() => setHoveredSignalId('uptime')}
              >
                <h3 className="font-semibold text-lg mb-1 text-white">{signal.title}</h3>
                <p className="text-azure opacity-80 text-sm">{signal.description}</p>
              </div>
            ))}
          </div>
          {/* Right Column */}
          <div className="md:w-1/2 mt-8 md:mt-0 md:sticky md:top-24">
            {renderDisplayPanel()}
          </div>
        </div>
      </div>
    </section>
  );
};
export default TrustSignals;