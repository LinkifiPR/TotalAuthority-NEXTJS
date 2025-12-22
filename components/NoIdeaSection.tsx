"use client";

import Image from 'next/image';

interface NoIdeaSectionProps {
  onOpenForm?: () => void;
}

export const NoIdeaSection: React.FC<NoIdeaSectionProps> = ({ onOpenForm }) => {
  return (
    <section className="py-20 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-white to-blue-50 relative">
      <div className="max-w-7xl mx-auto relative">
        {/* Main Content Section with Organic Blob */}
        <div className="relative">
          
          <div className="relative bg-blue-50 rounded-3xl p-12 md:p-16 lg:p-20" style={{ zIndex: 1 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Most Businesses Have No Idea Where They Stand
              </h2>
              
              <p className="text-lg text-slate-700 leading-relaxed">
                You can't build an AI strategy without knowing where you stand today. And right now, you're flying blind.
              </p>
              
              <p className="text-lg text-slate-700 leading-relaxed">
                Our audit reveals your current AI visibility, competitive gaps, and the exact sources driving recommendations in your market.
              </p>
              
              <p className="text-lg text-slate-900 font-semibold leading-relaxed">
                No fluff. No theory. Just the specific actions that will get you recommended.
              </p>
            </div>

            {/* Right: Illustration */}
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/bonus-images/confusion_to_clarity.png"
                alt="From confusion to clarity - AI visibility audit illustration"
                width={500}
                height={400}
                className="w-full max-w-xl h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};
