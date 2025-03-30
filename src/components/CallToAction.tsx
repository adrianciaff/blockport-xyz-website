// src/components/CallToAction.tsx
import React from 'react';
import Link from 'next/link'; // Use Link for external URL

const CallToAction: React.FC = () => {
  // --- REPLACE '#' WITH YOUR ACTUAL SCHEDULING LINK ---
  const schedulingLink = "#";
  // --- e.g., const schedulingLink = "https://calendly.com/your-link"; ---

  return (
    // Section container: Keep distinct background
    <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 md:py-20 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Join a coalition and support independant validators.
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">
        A high-performance validator that represents your interests in governance and provides you with the most reliable staking yields.
        </p>
        {/* Link styled as a button */}
        <Link
          href={schedulingLink}
          target="_blank" // Open in new tab
          rel="noopener noreferrer" // Security best practice
          className="inline-block bg-white hover:bg-gray-100 text-orange-600 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          Schedule a Call
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;