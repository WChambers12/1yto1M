import React, { useEffect, useState } from 'react';
import LiquidLogo from './LiquidLogo';

const messages = [
  "Analyzing your profile...",
  "Calibrating financial targets...",
  "Structuring your 1Y-1M timeline...",
  "Balancing hustle with wellness...",
  "Finalizing your personalized roadmap..."
];

const LoadingScreen: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progressStyle, setProgressStyle] = useState<React.CSSProperties>({
    animationDuration: '2s',
    animationDirection: 'normal'
  });

  useEffect(() => {
    const updateProgress = () => {
      // Randomize speed (1.5s to 3s) and direction (normal flow or ping-pong)
      // to make the loading feel "alive" and processing different data complexities.
      const randomDuration = 1.5 + Math.random() * 1.5; 
      const randomDirection = Math.random() > 0.6 ? 'alternate' : 'normal';
      
      setProgressStyle({
        animationDuration: `${randomDuration}s`,
        animationDirection: randomDirection
      });
    };

    // Initial random state
    updateProgress();

    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
      updateProgress();
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 animate-fade-in-up text-center">
      
      {/* Animated Logo Container */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-blue-400/30 blur-3xl rounded-full animate-pulse" />
        <div className="scale-[1.5] sm:scale-[2.0] transform transition-transform duration-700">
           <LiquidLogo />
        </div>
      </div>

      {/* Main Status Text */}
      <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 tracking-tight">
        Designing Your Year
      </h3>

      {/* Cycling Subtext */}
      <div className="h-8 mb-10 relative w-full flex justify-center items-center">
        {messages.map((msg, idx) => (
            <p 
                key={idx} 
                className={`absolute w-full px-4 text-slate-500 font-medium text-base sm:text-lg transition-all duration-700 ease-in-out ${
                    idx === currentMessage 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-4 scale-95'
                }`}
            >
                {msg}
            </p>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-64 sm:w-80 h-1.5 bg-slate-200/60 rounded-full overflow-hidden shadow-inner backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 w-full animate-loading-progress origin-left" 
          style={progressStyle}
        />
      </div>
      
    </div>
  );
};

export default LoadingScreen;