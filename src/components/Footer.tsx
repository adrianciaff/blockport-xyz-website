// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

// Social media icon components
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M18 9a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5a5 5 0 0 0 5 5h4"></path>
    <circle cx="12" cy="8" r="1"></circle>
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="12" cy="16" r="1"></circle>
  </svg>
);

const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="m22 2-7 20-4-9-9-4Z"></path>
    <path d="M22 2 11 13"></path>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"></path>
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Sample links for footer - replace with actual links
  const footerLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Validator Info", href: "/validator" },
    { name: "SLA", href: "/sla" },
  ];

  // Social media links - replace with actual links
  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com/blockport", icon: <TwitterIcon /> },
    { name: "Discord", href: "https://discord.gg/blockport", icon: <DiscordIcon /> },
    { name: "Telegram", href: "https://t.me/blockport", icon: <TelegramIcon /> },
    { name: "GitHub", href: "https://github.com/blockport", icon: <GithubIcon /> },
  ];

  return (
    <footer className="bg-rich-black relative overflow-hidden">
      {/* Subtle gradient top border instead of a solid line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-prussian-blue to-transparent"></div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-radial from-aero/20 to-transparent blur-3xl"></div>
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-gradient-radial from-tangerine/10 to-transparent blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo and tagline */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center mb-4">
              <span className="text-white font-title text-2xl font-bold">blockport</span>
            </div>
            <p className="text-azure/70 text-sm">
              Zero Fee Solana Staking.<br />
              High-Performance. Better Long-term Returns.
            </p>
            
            {/* Social media links */}
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-azure/70 hover:text-aero transition-colors duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-azure/70 hover:text-aero transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/blog"
                  className="text-azure/70 hover:text-aero transition-colors duration-300 text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq"
                  className="text-azure/70 hover:text-aero transition-colors duration-300 text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  href="/docs"
                  className="text-azure/70 hover:text-aero transition-colors duration-300 text-sm"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <a 
                  href="https://solanabeach.io/"
                  className="text-azure/70 hover:text-aero transition-colors duration-300 text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solana Explorer
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-medium mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <p className="text-azure/70">Need help with staking?</p>
              <a 
                href="mailto:support@blockport.xyz" 
                className="text-aero hover:text-white transition-colors duration-300 flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>support@blockport.xyz</span>
              </a>
              
              <div className="pt-4">
                <a 
                  href="https://calendly.com/blockport/meeting"
                  className="inline-block px-4 py-2 bg-white/5 hover:bg-white/10 text-azure hover:text-white rounded-lg transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule a Call
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px w-full bg-white/5 my-6"></div>
        
        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-azure/50">
          <div>
            &copy; {currentYear} Blockport. All rights reserved.
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            <span>
              <Link href="/validator" className="hover:text-aero transition-colors">
                Validator: <span className="text-azure/70">blockport.xyz</span>
              </Link>
            </span>
            <span className="hidden md:inline">•</span>
            <span>
              <Link href="/identity" className="hover:text-aero transition-colors">
                Identity: <span className="text-azure/70">HezJ...r7ua</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;