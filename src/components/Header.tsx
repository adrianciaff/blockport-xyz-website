// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    // Added sticky, top-0, z-50, w-full
    <header className="sticky top-0 z-50 w-full bg-gray-900 text-white shadow-md border-b border-gray-700"> {/* <-- Added classes here */}
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
          Blockport
        </Link>

        <nav>
          <span className="px-3 text-gray-400 text-sm">Nav coming soon...</span>
        </nav>

      </div>
    </header>
  );
};

export default Header;