// src/components/Hero.tsx
import React from 'react';
import Link from 'next/link'; // Import Link for potential future use, though not used in this specific example yet

const Hero: React.FC = () => {
  return (
    // Section container: dark background, padding, text alignment
    <section className="bg-gray-900 text-white py-24 md:py-32 px-6">
      <div className="container mx-auto max-w-4xl text-center">

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Zero Fee Solana Staking
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
        Reliable, High-Performance Staking, Zero Fees. Maximum Yield. 
          {/* Placeholder text - refine this */}
        </p>

        {/* Call to Action Button (Example: simple styled button) */}
        {/* In V1, this might link to a signup form section or modal later */}
        {/* For now, just a placeholder button appearance */}
        <button
          type="button"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
          // TODO: Add onClick handler later for newsletter signup modal/form
        >
          Learn More
        </button>

      </div>
    </section>
  );
};

export default Hero;