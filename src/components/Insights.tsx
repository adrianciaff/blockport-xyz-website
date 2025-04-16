// src/components/Insights.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Sample blog post data - replace with actual data from Decap CMS
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  slug: string;
  category: string;
  readTime: string;
}

// Simplified sample post data
const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Solana Staking in Institutional Portfolios",
    excerpt: "How institutional investors are leveraging Solana staking to maximize returns while maintaining liquidity in volatile markets.",
    coverImage: "/blog/solana-institutional.jpg",
    date: "April 10, 2025",
    slug: "future-solana-staking-institutional",
    category: "Staking",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Zero-Fee Structures: Maximizing Validator Returns Without Compromising Security",
    excerpt: "An analysis of how zero-fee models sustainably support high-performance validation while improving staker returns.",
    coverImage: "/blog/zero-fee-analysis.jpg",
    date: "March 28, 2025",
    slug: "zero-fee-structures-returns",
    category: "Economics",
    readTime: "7 min read"
  },
  {
    id: "3",
    title: "Technical Deep Dive: How We Maintain 99.99% Uptime",
    excerpt: "A behind-the-scenes look at our infrastructure, monitoring systems, and redundancy protocols that ensure reliable staking.",
    coverImage: "/blog/uptime-infrastructure.jpg",
    date: "March 15, 2025",
    slug: "technical-deep-dive-uptime",
    category: "Technology",
    readTime: "9 min read"
  }
];

// Categories for filter buttons
const categories = [
  { id: "all", name: "All Posts" },
  { id: "staking", name: "Staking" },
  { id: "economics", name: "Economics" },
  { id: "technology", name: "Technology" }
];

const Insights: React.FC = () => {
  // Keeping useState for compatibility, but we're not using it anymore
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Filter posts based on selected category (keeping for code compatibility)
  const filteredPosts = samplePosts;

  return (
    <section 
      className="bg-[#010D14] py-24 relative overflow-hidden rounded-3xl shadow-2xl"
      id="insights"
      style={{ boxShadow: '0 0 40px rgba(0, 0, 0, 0.5), 0 0 100px rgba(0, 80, 120, 0.2)' }}
    >
      {/* Shipping port SVG background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center min-w-full min-h-full">
          <img 
            src="/images/shipping-port.svg" 
            alt="" 
            className="w-auto min-w-full min-h-full object-cover opacity-5"
            aria-hidden="true" 
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-30 max-w-7xl relative z-10">
        {/* Section header with left alignment and view all button positioned at top right */}
        <div className="mb-16 relative">
          {/* Mobile-friendly adjustments */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div className="text-left max-w-2xl">
              <h2 className="font-title text-3xl md:text-4xl font-bold text-white inline-block">
                Blockchain Insights
              </h2>
              <p className="mt-6 text-azure opacity-80">
                Expert analysis and insights from our team of Solana specialists, covering technical deep-dives, market trends, and staking best practices.
              </p>
            </div>
            
            {/* View more button repositioned to top right */}
            <button 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-all duration-300 border border-white/10 hover:border-white/20 mt-6 md:mt-0"
            >
              View All Articles
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Category filters - Removed */}
        
        {/* Blog post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="group">
              <article className="h-full bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-black/20 flex flex-col">
                {/* Featured image placeholder - Removed category tag */}
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-rich-black/20 to-rich-black/50 z-10"></div>
                  <div className="w-full h-full bg-gradient-to-br from-aero/20 to-tangerine/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-title text-xl font-semibold text-white mb-3 group-hover:text-tangerine transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-azure opacity-80 text-sm mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-azure/60 mt-4 pt-4 border-t border-white/10">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
        
        {/* View more button - removing from bottom of page */}
      </div>
    </section>
  );
};

export default Insights;