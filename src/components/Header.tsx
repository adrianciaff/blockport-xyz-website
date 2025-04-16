// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // <-- Import the Image component

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-rich-black text-azure shadow-md border-b border-prussian-blue">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Replace text link with Image component */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/images/blockport-white.svg" // <-- Adjust path if your filename/location is different
            alt="Blockport Logo"    // <-- IMPORTANT: Add descriptive alt text
            width={150}             // <-- REQUIRED: Set desired width in pixels
            height={40}             // <-- REQUIRED: Set desired height in pixels
            priority                // <-- Optional: Add if logo is critical LCP element
          />
        </Link>

        <nav>
          <span className="px-3 text-azure opacity-75 text-sm">Nav coming soon...</span>
        </nav>

      </div>
    </header>
  );
};

export default Header;