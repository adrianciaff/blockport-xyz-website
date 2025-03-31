import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StakeInfo from '@/components/StakeInfo';
import TrustSignals from '@/components/TrustSignals';
import TeamSection from '@/components/TeamSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <StakeInfo />
        <TrustSignals />
        <TeamSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}