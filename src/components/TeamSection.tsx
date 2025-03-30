// src/components/TeamSection.tsx
import React from 'react';
import Link from 'next/link'; // Using Link for external links

// Define structure for team member data
interface TeamMember {
  id: number;
  name: string; // Use Handle as requested
  role: string;
  bio: string;
  linkedIn?: string; // Optional URL
  twitter?: string; // Optional URL
  github?: string; // Optional URL
}

// --- FINAL TEAM DATA ---
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "@redactedadrian",
    role: "CEO",
    bio: "Economics and finance background with over 12 years of experience in financial services, including key roles in Solana's early ecosystem.",
    linkedIn: "https://www.linkedin.com/in/adrianciaff/",
    twitter: "https://x.com/redactedadrian",
    github: "https://github.com/adrianciaff",
  },
  {
    id: 2,
    name: "@nikhrmn",
    role: "CTO",
    bio: "Computer science background with a decade working in IT on mission-critical projects for healthcare and government agencies.",
    linkedIn: "https://www.linkedin.com/in/nikolaus-herrmann-12090a135/",
    twitter: "https://x.com/nikhrmn",
    // github: undefined, // No GitHub provided for Nik
  },
];
// --- END OF TEAM DATA ---


const TeamSection: React.FC = () => {
  if (teamMembers.length === 0) {
    return null;
  }

  return (
    // Section container: Example light background, padding
    <section className="bg-white py-16 md:py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Meet the Team
        </h2>

        {/* Responsive Grid for Team Members */}
        <div className={`grid grid-cols-1 ${teamMembers.length > 1 ? 'md:grid-cols-2' : ''} gap-8 md:gap-10`}>
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-gray-50 p-6 rounded-lg text-center shadow-sm border border-gray-200 flex flex-col">
              {/* Image Placeholder Div */}
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500">
                <span className="text-xs">Photo</span>
              </div>
              {/* Details */}
              <div className="flex-grow">
                 <h3 className="text-xl font-semibold mb-1 text-gray-900">{member.name}</h3>
                 <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                 <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
              </div>
              {/* Links */}
              <div className="mt-auto pt-4"> {/* Push links to bottom */}
                 <div className="flex justify-center space-x-4">
                    {member.linkedIn && <Link href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700" aria-label={`${member.name} LinkedIn`}>LinkedIn</Link>}
                    {member.twitter && <Link href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sky-500" aria-label={`${member.name} Twitter`}>Twitter</Link>}
                    {member.github && <Link href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900" aria-label={`${member.name} GitHub`}>GitHub</Link>}
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