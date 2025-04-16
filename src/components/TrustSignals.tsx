// src/components/TrustSignals.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

// Interface and signals data
interface TrustSignalItem { id: string; title: string; description: string; }
const signals: TrustSignalItem[] = [ /* ... Your signals data ... */ ];

// Define common glass style with enhanced styling
const glassPaneClasses = "bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 p-8 flex flex-col h-full min-h-[350px] relative transition-all duration-300 group hover:border-white/20 hover:shadow-lg hover:shadow-white/5"; 

// Animated counter hook
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = React.useState(0);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      if (isMounted) {
        setCount(Math.floor(progress * end));
      }
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    // Use Intersection Observer to start animation when element is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.requestAnimationFrame(step);
          if (countRef.current) observer.unobserve(countRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) observer.observe(countRef.current);
    
    return () => {
      isMounted = false;
      if (countRef.current) observer.unobserve(countRef.current);
    };
  }, [end, duration]);

  return { count, countRef };
};

// Icon components
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-tangerine" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const DollarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-tangerine" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20"></path>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-tangerine" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
  </svg>
);

// --- Main TrustSignals Component ---
const TrustSignals: React.FC = () => {
  const { count, countRef } = useCounter(1234567);
  
  return (
    <section
      className={
        `relative z-9 pt-24 pb-16 md:pt-32 md:pb-20 rounded-tl-2xl rounded-tr-2xl flex flex-col overflow-hidden ` +
        `px-4 sm:px-6 md:px-12 lg:px-24 xl:px-30 ` + 
        `bg-rich-black text-white`
      }
      
    >
      {/* Top glow effect */}
            <div 
        className="absolute top-0 left-0 w-full h-64 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(97, 218, 251, 0.2) 0%, rgba(97, 218, 251, 0.05) 40%, rgba(0, 0, 0, 0) 80%)',
          transform: 'translateY(-40%)'
        }}
      ></div>
      {/* Subtle animated dots background */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Optional subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-20 pointer-events-none" 
           style={{ backgroundPosition: '70% 30%' }}></div>

      {/* Content Container */}
      <div className="w-full flex flex-col flex-grow justify-center relative z-10">
        {/* Enhanced Title with subtle line */}
        <div className="text-center mb-16">
          <h2 className="font-title text-3xl md:text-4xl font-bold text-white inline-block relative">
            Performance You Can Trust
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-3 w-12 h-1 bg-gradient-to-r from-tangerine to-tangerine/30 rounded-full"></span>
          </h2>
        </div>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Card 1: Years of History */}
          <div className={glassPaneClasses}>
            {/* Accent top bar that appears on hover */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-tangerine to-tangerine/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 rounded-md bg-tangerine/10">
                <ClockIcon />
              </div>
              <h3 className="font-title font-semibold text-xl text-white">3+ Years of History</h3>
            </div>
            
            <div ref={countRef} className="font-title text-5xl font-bold text-tangerine my-4 flex-grow flex items-center justify-center relative overflow-hidden">
              {count.toLocaleString()}
              {/* Optional subtle animation */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-tangerine/30 to-transparent animate-pulse"></div>
            </div>
            
            <p className="font-sans text-azure opacity-90 text-sm">Blocks Produced Since Jan 2022</p>
            
            <div className="mt-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
              <p className="font-sans text-sm text-azure opacity-80">
                <span className="text-tangerine font-medium">99.99%</span> verifiable uptime record for 3+ years
              </p>
            </div>
          </div>
          
          {/* Card 2: Zero Fees */}
          <div className={glassPaneClasses}>
            {/* Accent top bar that appears on hover */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-tangerine to-tangerine/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 rounded-md bg-tangerine/10">
                <DollarIcon />
              </div>
              <h3 className="font-title font-semibold text-xl text-white">No sneaky fee hikes</h3>
            </div>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-azure flex items-center">
                    <span className="mr-1.5 font-medium">Blockport</span>
                  </span>
                  <span className="font-bold text-aero px-2 py-0.5 rounded-full bg-aero/10 text-xs">0 Fee Increases</span>
                </div>
                <div className="w-full bg-rich-black/50 rounded-lg h-5 overflow-hidden flex">
                  {/* Three empty segments for Blockport (0 increases) */}
                  <div className="h-full bg-rich-black/25 border-r border-rich-black/75 w-1/3"></div>
                  <div className="h-full bg-rich-black/25 border-r border-rich-black/75 w-1/3"></div>
                  <div className="h-full bg-rich-black/25 w-1/3"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-azure flex items-center">
                    <span className="mr-1.5 font-medium">Avg. Competitor</span>
                  </span>
                  <span className="font-bold text-orange-peel px-2 py-0.5 rounded-full bg-orange-peel/10 text-xs">~2 Fee Increases</span>
                </div>
                <div className="w-full bg-rich-black/50 rounded-lg h-5 overflow-hidden flex">
                  {/* Two segments for competitor (2 increases) */}
                  <div className="h-full bg-orange-peel border-r border-rich-black/75 w-1/3 flex justify-center items-center">
                    <span className="text-white text-xs font-medium">1</span>
                  </div>
                  <div className="h-full bg-orange-peel w-1/3 flex justify-center items-center">
                    <span className="text-white text-xs font-medium">2</span>
                  </div>
                  <div className="h-full bg-rich-black/25 w-1/3"></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-auto text-azure/80 text-sm pt-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <div className="text-sm">3+ Years without raising our fees.</div>
            </div>
          </div>
          
          {/* Card 3: Solana Focus */}
          <div className={glassPaneClasses}>
            {/* Accent top bar that appears on hover */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-tangerine to-tangerine/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 rounded-md bg-tangerine/10">
                <ChartIcon />
              </div>
              <h3 className="font-title font-semibold text-xl text-white">Best Peformance Guaranteed</h3>
            </div>
            
            <ul className="space-y-4 text-sm my-auto">
              <li className="flex justify-between items-center p-2 rounded bg-white/5 border border-white/5">
                <span className="text-tangerine font-medium flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-tangerine"></div>
                  Blockport APY:
                </span> 
                <span className="text-white font-bold">X.XX%</span>
              </li>
              <li className="flex justify-between items-center p-2 rounded hover:bg-white/5 transition-colors duration-200">
                <span className="text-azure opacity-85 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-azure/50"></div>
                  Coinbase APY:
                </span> 
                <span className="text-white">Y.YY%</span>
              </li>
              <li className="flex justify-between items-center p-2 rounded hover:bg-white/5 transition-colors duration-200">
                <span className="text-azure opacity-85 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-azure/50"></div>
                  Crypto.com APY:
                </span> 
                <span className="text-white">Z.ZZ%</span>
              </li>
            </ul>
            
            <div className="mt-auto pt-6">
              <p className="text-xs text-azure opacity-80 text-center">(Illustrative APY - Subject to Change)</p>
              <div className="text-xs text-azure opacity-70 text-center pt-2">// TODO: Integrate live data</div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;