// src/components/CallToAction.tsx
import React from 'react';
import Link from 'next/link';

const CallToAction: React.FC = () => {
  const schedulingLink = "#"; // Keep placeholder link for now

  return (
    // Use gradient with palette oranges, white text
    <section className="bg-gradient-to-r from-tangerine to-orange-peel text-white py-16 md:py-20 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Optimize Your Staking?
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Have questions or want to discuss your specific staking needs? Schedule a brief call with our team.
        </p>
        <Link
          href={schedulingLink}
          target="_blank"
          rel="noopener noreferrer"
          // Use white button, tangerine text
          className="inline-block bg-white hover:bg-azure text-tangerine font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          Schedule a Call
        </Link>
      </div>
    </section>
  );
};
export default CallToAction;