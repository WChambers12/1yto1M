import React from 'react';
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react';
import LiquidLogo from './LiquidLogo';
import ProgressShowcase from './ProgressShowcase';

interface HeroProps {
  scrollToForm: () => void;
  onGenerateDefault: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToForm, onGenerateDefault }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center md:text-left px-4 pt-24 pb-12 overflow-hidden max-w-7xl mx-auto">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-100/40 rounded-full blur-[100px] -z-10" />

      {/* Navbar Placeholder */}
      <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center w-full z-50">
        <div className="flex items-center gap-2">
          <LiquidLogo />
          <span className="brand-font font-bold text-xl text-slate-800 tracking-tight">1Y-1M</span>
        </div>
        <a 
          href="https://www.youtube.com/@OneYearto1Million" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 text-blue-800 font-semibold hover:text-blue-600 transition-colors bg-white/50 px-4 py-2 rounded-full border border-blue-100/50 backdrop-blur-sm"
        >
          <PlayCircle size={20} />
          Watch the Journey
        </a>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full z-10 mt-8">
        
        {/* Left Column: Copy */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full glass-panel border border-blue-100/50 text-blue-800 text-sm font-semibold tracking-wide uppercase shadow-sm">
            The Balanced Marathon
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
            1 Year to <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">$1 Million</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
            We build wealth so we can live, not live so we can build wealth. 
            Generate your personalized, balanced roadmap to 7 figures today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={scrollToForm}
              className="group relative px-8 py-4 bg-blue-800 text-white text-lg font-bold rounded-full shadow-xl shadow-blue-900/20 hover:bg-blue-900 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Start Your Year</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button 
              onClick={onGenerateDefault}
              className="px-8 py-4 bg-white/60 backdrop-blur-md text-slate-700 text-lg font-bold rounded-full border border-blue-200/50 hover:bg-white hover:text-blue-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2"
            >
              <Sparkles size={20} className="text-yellow-500" />
              <span>Instant Demo Plan</span>
            </button>
            
            <a 
              href="https://www.youtube.com/@OneYearto1Million"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/50 backdrop-blur-sm text-slate-700 text-lg font-semibold rounded-full border border-slate-200 hover:bg-white hover:text-blue-800 transition-all duration-300 flex justify-center items-center sm:hidden"
            >
              Watch on YouTube
            </a>
          </div>
        </div>

        {/* Right Column: Visual replaced by Animated Progress */}
        <div className="hidden lg:block relative group perspective-1000 h-[600px]">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-[2rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 rotate-y-6 hover:rotate-0 transition-transform duration-700 ease-out h-full">
             <ProgressShowcase />
             
             {/* Overlay Card - Kept for context */}
             <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg z-20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                    $1M
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Goal: Financial Freedom</p>
                    <p className="text-blue-200 text-sm">Real Estate • Wealth • Lifestyle</p>
                  </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;