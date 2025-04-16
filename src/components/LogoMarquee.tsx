// src/components/LogoMarquee.tsx
import React from 'react';
import Image from 'next/image';

interface Logo { src: string; alt: string; }
interface LogoMarqueeProps { logos: Logo[]; title?: string; }

const LogoMarquee: React.FC<LogoMarqueeProps> = ({
  logos = [],
  title = "Trusted By",
}) => {
  if (logos.length === 0) { return null; }

  return (
    <div className="w-full pb-5 md:pb-5">
       <div className="max-w-5xl mx-auto px-6 mb-10">
           <h3 className="text-center text-sm font-semibold text-azure opacity-60 uppercase tracking-wider">
             {title}
           </h3>
       </div>
       <div className="overflow-x-hidden">
         <div className="w-max flex flex-nowrap items-center gap-x-8 md:gap-x-12 px-6 animate-marqueeScroll hover:[animation-play-state:paused]">
           {/* Render logos the FIRST time */}
           {logos.map((logo) => {
              const baseClasses = "opacity-75 w-auto";
              let heightClass = "h-[35px]"; // Default height - ADJUST LATER
              // Add conditions here later to resize specific logos
              if (logo.src === 'caleb&Brown.svg') {
                heightClass = "h-[25px]"; // Set smaller height for Caleb & Brown (e.g., 25px - adjust as needed)
              }
              if (logo.src === 'upside.svg') {
                heightClass = "h-[30px]"; // Set smaller height for Caleb & Brown (e.g., 25px - adjust as needed)
              }
              // if (logo.src === 'jito.svg') { heightClass = "h-[30px]"; }
              return (
               <div key={logo.src + '-1'} className={`flex-shrink-0 flex items-center ${heightClass}`}>
                 <Image
                   src={`/images/${logo.src}`}
                   alt={logo.alt}
                   width={120} // <-- ADDED BACK (Adjust base width if needed)
                   height={35} // <-- ADDED BACK (Adjust base height if needed)
                   className={`${baseClasses} ${heightClass}`}
                   unoptimized={logo.src.endsWith('.svg')}
                 />
               </div>
              );
            })}
           {/* Render logos the SECOND time */}
           {logos.map((logo) => {
              const baseClasses = "opacity-75 w-auto";
              let heightClass = "h-[35px]";
              // Add IDENTICAL conditions here later
              // if (logo.src === 'jito.svg') { heightClass = "h-[30px]"; }
              return (
               <div key={logo.src + '-2'} className={`flex-shrink-0 flex items-center ${heightClass}`}>
                 <Image
                   src={`/images/${logo.src}`}
                   alt={logo.alt}
                   width={120} // <-- ADDED BACK (Adjust base width if needed)
                   height={35} // <-- ADDED BACK (Adjust base height if needed)
                   className={`${baseClasses} ${heightClass}`}
                   unoptimized={logo.src.endsWith('.svg')}
                 />
               </div>
              );
            })}
         </div>
       </div>
    </div>
  );
};

export default LogoMarquee;