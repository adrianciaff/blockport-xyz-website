// src/app/team/page.tsx
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TeamSection from '@/components/TeamSection'; // Import existing component

export default function TeamPage() {
  return (
    <div>
      <Header />
      <main>
        {/* Render the existing TeamSection component here */}
        <TeamSection />
        {/* You could add more team-specific content here later if needed */}
      </main>
      <Footer />
    </div>
  );
}