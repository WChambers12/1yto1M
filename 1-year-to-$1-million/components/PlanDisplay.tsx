import React from 'react';
import { PlanData } from '../types';
import { CheckCircle2, Clock, Calendar, Heart, Share2, Download, Mountain } from 'lucide-react';
import ProgressShowcase, { ProgressItem } from './ProgressShowcase';

interface PlanDisplayProps {
  plan: PlanData;
  userName: string;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, userName }) => {
  
  const phaseItems: ProgressItem[] = [
    { label: "Phase 1: Foundation", value: 25, color: "bg-blue-500", delay: "delay-0" },
    { label: "Phase 2: Momentum", value: 50, color: "bg-cyan-500", delay: "delay-200" },
    { label: "Phase 3: Leverage", value: 75, color: "bg-blue-600", delay: "delay-400" },
    { label: "Phase 4: Mastery", value: 100, color: "bg-indigo-600", delay: "delay-600" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in-up">
      
      {/* Progress Showcase Header (Replacing Image) */}
      <div className="relative w-full h-80 rounded-3xl overflow-hidden mb-10 shadow-2xl border-4 border-white">
        <ProgressShowcase 
            items={phaseItems} 
            title="Your Year in Motion" 
            className="h-full"
        />
        <div className="absolute bottom-0 left-0 p-8 md:p-10 text-white z-20 pointer-events-none">
           <p className="text-blue-200 font-bold uppercase tracking-wider text-sm mb-2 drop-shadow-md">The Roadmap</p>
           <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">{userName}'s Blueprint</h2>
        </div>
      </div>

      <div className="text-center mb-10">
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
          <span className="text-5xl float-left mr-3 text-blue-200 font-serif leading-[0.8]">"</span>
          {plan.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Left Column: Daily Routine & Wellness */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border-l-4 border-blue-600 shadow-md">
            <div className="flex items-center gap-2 mb-4 text-blue-800">
              <Clock size={24} />
              <h3 className="font-bold text-xl">Daily Ritual</h3>
            </div>
            <ul className="space-y-3">
              {plan.dailyRoutine.map((item, idx) => (
                <li key={idx} className="text-slate-700 text-sm flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-l-4 border-cyan-500 bg-gradient-to-br from-white to-cyan-50/50 shadow-md">
            <div className="flex items-center gap-2 mb-4 text-cyan-800">
              <Heart size={24} />
              <h3 className="font-bold text-xl">Wellness & Balance</h3>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed italic">
              "{plan.wellnessTip}"
            </p>
            <div className="mt-4 flex items-center gap-2 text-cyan-600/60 text-xs">
              <Mountain size={14} />
              <span>Marathon Mindset</span>
            </div>
          </div>
        </div>

        {/* Right Column: Quarterly Phases (Spans 2 cols) */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-slate-800 mb-2 px-2">Execution Phases</h3>
          {plan.phases.map((phase, idx) => (
            <div key={idx} className="glass-panel p-4 sm:p-6 rounded-2xl relative overflow-hidden group hover:shadow-xl transition-all duration-300 border border-white/60">
              {/* Subtle background number */}
              <div className="absolute -right-4 -top-6 text-8xl sm:text-9xl font-black text-slate-100 z-0 select-none group-hover:text-blue-50 transition-colors">
                {idx + 1}
              </div>

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2 sm:gap-0">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-6 sm:w-2 sm:h-8 bg-blue-600 rounded-full" />
                    {phase.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wider w-fit">
                    {phase.duration}
                  </span>
                </div>
                
                <p className="text-slate-600 text-sm sm:text-base mb-4 sm:mb-5 font-medium pl-3 sm:pl-4 border-l-2 border-slate-200">
                  <span className="font-bold text-slate-800 mr-1">Focus:</span> {phase.focus}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  {phase.habits.map((habit, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 p-3 rounded-xl bg-white/60 border border-white hover:bg-white transition-colors shadow-sm">
                      <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-xs text-slate-700 leading-snug font-medium">{habit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8 pb-10">
        <button 
          onClick={() => window.print()} 
          className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-full font-semibold border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <Download size={18} />
          Print / PDF
        </button>
        <button 
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'My 1Y-1M Roadmap',
                text: `Check out my personalized roadmap to $1M generated by 1y-to-1m.com!`,
                url: window.location.href
              }).catch(console.error);
            } else {
              alert("Link copied to clipboard!");
              navigator.clipboard.writeText(window.location.href);
            }
          }}
          className="flex items-center gap-2 px-6 py-3 bg-blue-800 text-white rounded-full font-semibold hover:bg-blue-900 transition-colors shadow-md"
        >
          <Share2 size={18} />
          Share Commitment
        </button>
      </div>
    </div>
  );
};

export default PlanDisplay;