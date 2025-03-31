// src/components/TeamSection.tsx
import React from 'react';
import Link from 'next/link';

interface TeamMember { id: number; name: string; role: string; bio: string; linkedIn?: string; twitter?: string; github?: string; }

const teamMembers: TeamMember[] = [
  { id: 1, name: "@redactedadrian", role: "CEO", bio: "Economics and finance background with over 12 years of experience in financial services, including key roles in Solana's early ecosystem. Now applying long-term investment principles to ensure reliability and security for Blockport's validator.", linkedIn: "https://www.linkedin.com/in/adrianciaff/", twitter: "https://x.com/redactedadrian", github: "https://github.com/adrianciaff", },
  { id: 2, name: "@nikhrmn", role: "CTO", bio: "At the helm of our technical operation, Nik spent close to a decade working in IT on mission-critical projects for healthcare and government agencies.", linkedIn: "https://www.linkedin.com/in/nikolaus-herrmann-12090a135/", twitter: "https://x.com/nikhrmn", },
];

const TeamSection: React.FC = () => {
  if (teamMembers.length === 0) { return null; }

  return (
    // Use white background, rich-black/prussian-blue text, tangerine accent
    <section className="bg-white py-16 md:py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-rich-black">
          Meet the Team
        </h2>
        <div className={`grid grid-cols-1 ${teamMembers.length > 1 ? 'md:grid-cols-2' : ''} gap-8 md:gap-10`}>
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-azure/30 p-6 rounded-lg text-center shadow-sm border border-azure flex flex-col">
              {/* Image Placeholder */}
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500"><span className="text-xs">Photo</span></div>
              <div className="flex-grow">
                 <h3 className="text-xl font-semibold mb-1 text-prussian-blue">{member.name}</h3>
                 <p className="text-tangerine font-medium mb-3">{member.role}</p>
                 <p className="text-prussian-blue/80 text-sm mb-4">{member.bio}</p>
              </div>
              {/* Links */}
              <div className="mt-auto pt-4">
                 <div className="flex justify-center space-x-4">
                    {member.linkedIn && <Link href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="text-prussian-blue hover:text-aero" aria-label={`${member.name} LinkedIn`}>LinkedIn</Link>}
                    {member.twitter && <Link href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-prussian-blue hover:text-aero" aria-label={`${member.name} Twitter`}>Twitter</Link>}
                    {member.github && <Link href={member.github} target="_blank" rel="noopener noreferrer" className="text-prussian-blue hover:text-aero" aria-label={`${member.name} GitHub`}>GitHub</Link>}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TeamSection;