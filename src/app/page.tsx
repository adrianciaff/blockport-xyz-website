// src/app/page.tsx
import React from 'react';
import Header from '@/components/Header'; // Use path alias @/
import Hero from '../components/Hero';
import TrustSignals from '@/components/TrustSignals';
import TeamSection from '@/components/TeamSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div > {/* Use a simple div or React.Fragment as the top-level wrapper */}
      <Header />
      <main> {/* Wrap main content sections */}
       <Hero /> 
       <TrustSignals />
       <TeamSection />
       <CallToAction />
      </main> {/* Closing main tag */}
      <Footer />
    </div>
  );
}