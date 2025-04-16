// src/components/CallToAction.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import GlobeAnimation from './GlobeAnimation';

const CallToAction: React.FC = () => {
  const schedulingLink = "#";

  return (
    <section className={
        `relative z-7 pt-20 pb-16 md:pt-28 md:pb-20 px-6 ` +
        `rounded-tl-2xl rounded-tr-2xl ` +
        `flex flex-col justify-center overflow-hidden min-h-[60vh] bg-white`
      }>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-100 to-transparent opacity-60 z-[7]"></div>
        
        <div className="absolute bottom-8 left-8 w-32 h-32 rounded-full bg-tangerine/5 blur-xl z-[7]"></div>
        <div className="absolute top-20 left-1/4 w-16 h-16 rounded-full bg-aero/10 blur-lg z-[7]"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 z-[7] opacity-5" 
             style={{ 
               backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>

        {/* Globe Animation Block - Absolute Background, Shifted Right */}
        <div className="absolute inset-0 z-[8] transform translate-x-1/3 md:translate-x-1/4 lg:translate-x-1/3">
            <GlobeAnimation mapLineColor={0x000000} initialCameraZ={1.2} rotationSpeed={0.0003} enableBeamAnimation={false} />
        </div>

        {/* Content Container (z-10) - Relative, with offset */}
        <div className="container max-w-7xl relative z-10 py-10 text-left md:text-left md:pl-8 lg:pl-16">
            
            {/* Text & Interaction Block - moved more to the right */}
            <div className="w-full md:w-1/2 lg:w-2/5 md:pl-16 lg:pl-24 xl:pl-32">
                <div className="relative">
                    {/* Subtle highlight for heading */}
                    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-12 bg-tangerine rounded-full opacity-80"></div>
                    
                    <h2 className="font-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-rich-black leading-tight">
                        Start Staking with us Today
                    </h2>
                </div>
                
                <p className="font-sans text-lg md:text-xl text-rich-black opacity-80 mb-8 max-w-md">
                    Earn better yields on your SOL. Keep Solana Secure.
                </p>

                {/* Card with CTA */}
                <div className="mt-8 relative">
                    {/* Card */}
                    <div className={
                      `p-6 md:p-8 rounded-xl border border-rich-black/10 ` +
                      `bg-gradient-to-br from-white to-rich-black/5 backdrop-blur-sm ` +
                      `shadow-lg hover:shadow-xl transition-all duration-300 ` +
                      `relative z-10 overflow-hidden`
                    }>
                        {/* Subtle corner accent */}
                        <div className="absolute -top-10 -right-10 w-20 h-20 bg-tangerine/10 rounded-full blur-md"></div>
                        
                        <div className="flex flex-col space-y-6">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-tangerine rounded-full"></div>
                                    <span className="text-sm text-rich-black/70 font-medium">For Institutions</span>
                                </div>
                                
                                <p className="font-medium text-rich-black opacity-90 text-lg">
                                    Talk to us about our offerings for larger delegators and Solana team treasuries.
                                </p>
                            </div>
                            
                            <Link
                                href={schedulingLink}
                                className="font-sans inline-block bg-tangerine hover:bg-orange-peel text-rich-black font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md w-full md:w-auto text-center"
                            >
                                Schedule a Call
                                <span className="ml-2 inline-block">→</span>
                            </Link>
                        </div>
                    </div>
                    
                    {/* Decorative elements behind the card */}
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border border-rich-black/10 z-[1]"></div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full border border-rich-black/10 z-[1]"></div>
                </div>
                
                {/* Subtle badge or trust indicator */}
                <div className="mt-8 flex items-center space-x-2 text-rich-black/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span className="text-sm">Secure, non-custodial staking</span>
                </div>
            </div>
        </div>
    </section>
  );
};

export default CallToAction;