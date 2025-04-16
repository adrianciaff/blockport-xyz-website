// src/components/Testimonials.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Sample testimonial data - replace with your actual data
interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string; // Optional avatar image path
}

const testimonials: TestimonialItem[] = [
  {
    id: "1",
    author: "Alex Thompson",
    role: "CTO",
    company: "FutureTech Capital",
    quote: "Blockport's zero-fee Solana staking has been a game-changer for our portfolio. Their uptime and performance metrics are unmatched in the industry.",
    avatar: "/avatars/alex.jpg" // Replace with actual path
  },
  {
    id: "2",
    author: "Sophia Chen",
    role: "VP of Blockchain",
    company: "Nexus Ventures",
    quote: "We've been staking with Blockport for over 2 years. Their specialized focus on Solana gives us confidence that our assets are in capable hands.",
    avatar: "/avatars/sophia.jpg"
  },
  {
    id: "3",
    author: "Marcus Williams",
    role: "Investment Director",
    company: "Distributed Capital",
    quote: "The transparency and reliability of Blockport's infrastructure have made them our preferred validator. The zero-fee model means better returns without sacrificing security.",
    avatar: "/avatars/marcus.jpg"
  },
  {
    id: "4",
    author: "Elena Kowalski",
    role: "Crypto Asset Manager",
    company: "Horizon Fund",
    quote: "Blockport's technical expertise and commitment to Solana have been evident in their consistent performance. Our staking rewards have never been better.",
    avatar: "/avatars/elena.jpg"
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialRef = useRef<HTMLDivElement>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextTestimonial();
      }
    }, 8000); // Change testimonial every 8 seconds
    
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToTestimonial = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className="bg-rich-black text-white py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-tangerine/20 to-transparent rounded-full blur-3xl transform translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-aero/20 to-transparent rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/2"></div>
      </div>
      
      {/* Dotted pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
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
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-30 max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-title text-3xl md:text-4xl font-bold text-white inline-block relative">
            What Our Delegators Say
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-3 w-12 h-1 bg-gradient-to-r from-tangerine to-tangerine/30 rounded-full"></span>
          </h2>
        </div>
        
        {/* Testimonial carousel */}
        <div 
          className="relative max-w-4xl mx-auto"
          ref={testimonialRef}
        >
          {/* Decorative quotation mark */}
          <div className="absolute -top-10 -left-4 text-tangerine opacity-20 text-8xl font-serif">
            "
          </div>
          
          {/* Testimonial content */}
          <div className="relative bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 p-8 md:p-10 overflow-hidden">
            <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              <p className="text-lg md:text-xl font-light leading-relaxed mb-8 text-azure">
                {testimonials[activeIndex].quote}
              </p>
              
              <div className="flex items-center">
                {testimonials[activeIndex].avatar ? (
                  <div className="mr-4 w-12 h-12 rounded-full overflow-hidden border-2 border-tangerine/30">
                    <div className="w-full h-full bg-gradient-to-br from-tangerine/30 to-aero/30 flex items-center justify-center text-xl font-bold text-white">
                      {testimonials[activeIndex].author.charAt(0)}
                    </div>
                    {/* Uncomment when you have actual images */}
                    {/* <Image 
                      src={testimonials[activeIndex].avatar}
                      alt={testimonials[activeIndex].author}
                      width={48}
                      height={48}
                      className="object-cover"
                    /> */}
                  </div>
                ) : (
                  <div className="mr-4 w-12 h-12 rounded-full overflow-hidden border-2 border-tangerine/30 bg-gradient-to-br from-tangerine/30 to-aero/30 flex items-center justify-center text-xl font-bold text-white">
                    {testimonials[activeIndex].author.charAt(0)}
                  </div>
                )}
                
                <div>
                  <h4 className="font-title text-lg font-semibold text-white">
                    {testimonials[activeIndex].author}
                  </h4>
                  <p className="text-sm text-azure opacity-80">
                    {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation arrows */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200 border border-white/10"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-tangerine w-6' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200 border border-white/10"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          
          {/* Clients logo display (optional) */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="h-8 flex items-center justify-center">
              <div className="text-lg font-bold text-white/50">Raydium</div>
              {/* Replace with actual logo when available */}
              {/* <Image src="/logos/futuretech.svg" alt="FutureTech Capital" width={120} height={40} /> */}
            </div>
            <div className="h-8 flex items-center justify-center">
              <div className="text-lg font-bold text-white/50">Bullet</div>
              {/* <Image src="/logos/nexus.svg" alt="Nexus Ventures" width={120} height={40} /> */}
            </div>
            <div className="h-8 flex items-center justify-center">
              <div className="text-lg font-bold text-white/50">SolanaANZ</div>
              {/* <Image src="/logos/distributed.svg" alt="Distributed Capital" width={120} height={40} /> */}
            </div>
            <div className="h-8 flex items-center justify-center">
              <div className="text-lg font-bold text-white/50">Upside</div>
              {/* <Image src="/logos/horizon.svg" alt="Horizon Fund" width={120} height={40} /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;