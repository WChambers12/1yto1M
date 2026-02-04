import React from 'react';

const LiquidLogo: React.FC = () => {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      {/* SVG Filters for Gooey Effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Animated Blobs */}
      <div className="absolute inset-0 filter url(#goo)">
        <div className="absolute top-0 left-0 w-10 h-10 bg-blue-600 rounded-full mix-blend-multiply opacity-80 animate-[blob-bounce_4s_infinite_ease-in-out]"></div>
        <div className="absolute top-0 right-0 w-10 h-10 bg-blue-400 rounded-full mix-blend-multiply opacity-80 animate-[blob-bounce_4s_infinite_ease-in-out_1s]"></div>
        <div className="absolute bottom-0 left-2 w-10 h-10 bg-cyan-300 rounded-full mix-blend-multiply opacity-80 animate-[blob-bounce_4s_infinite_ease-in-out_2s]"></div>
      </div>
      
      {/* Text/Icon overlay */}
      <div className="relative z-10 text-white font-bold text-xl drop-shadow-md">
        1Y
      </div>
    </div>
  );
};

export default LiquidLogo;