// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Use rich-black bg, azure text, prussian-blue border
    <footer className="bg-rich-black text-azure/70 border-t border-prussian-blue">
      <div className="container mx-auto px-6 py-8 text-sm">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} Blockport. All rights reserved.
          </div>
          {/* Footer Links Placeholder */}
          <nav className="flex space-x-4">
             <span className="text-azure opacity-50">Legal links TBD...</span>
             {/* Example structure for later: */}
             {/* <Link href="/privacy" className="hover:text-aero transition-colors">Privacy</Link> */}
             {/* <Link href="/terms" className="hover:text-aero transition-colors">Terms</Link> */}
          </nav>
        </div>
      </div>
    </footer>
  );
};
export default Footer;