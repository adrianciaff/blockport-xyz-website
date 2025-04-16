import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StakeInfo from '@/components/StakeInfo';
import TrustSignals from '@/components/TrustSignals';
import Testimonials from '@/components/Testimonials';
import Insights from  '@/components/Insights';
import VisionSection from '@/components/VisionSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <VisionSection />
        <TrustSignals />
        <Testimonials />
        <StakeInfo />
        <Insights />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}