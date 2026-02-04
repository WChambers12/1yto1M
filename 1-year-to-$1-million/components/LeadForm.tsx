import React, { useState } from 'react';
import { UserProfile, FORMSPREE_ENDPOINT } from '../types';
import { Loader2, Send, ChevronDown } from 'lucide-react';

interface LeadFormProps {
  onSubmit: (data: UserProfile) => void;
  isLoading: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    email: '',
    goal: '',
    dailyCommitment: '2 Hours'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fire-and-forget Formspree submission for lead gen tracking
    try {
        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        }).catch(err => console.error("Formspree error (non-blocking):", err));
    } catch (e) {
        // Ignore network errors for the demo flow, focus on the AI generation
    }

    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl relative overflow-hidden transition-all">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Create Your Roadmap</h2>
          <p className="text-slate-500 mb-6 sm:mb-8 text-sm sm:text-base">Tell us your targets. We'll build the plan.</p>
          
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-5 py-3.5 sm:py-3 text-base rounded-xl bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-slate-400 text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-5 py-3.5 sm:py-3 text-base rounded-xl bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-slate-400 text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="goal" className="text-sm font-semibold text-slate-700 ml-1">Financial Goal (12 Months)</label>
              <input
                type="text"
                id="goal"
                name="goal"
                required
                value={formData.goal}
                onChange={handleChange}
                placeholder="e.g. $500,000 GCI"
                className="w-full px-5 py-3.5 sm:py-3 text-base rounded-xl bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-slate-400 text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="dailyCommitment" className="text-sm font-semibold text-slate-700 ml-1">Daily Time Commitment</label>
              <div className="relative">
                <select
                  id="dailyCommitment"
                  name="dailyCommitment"
                  value={formData.dailyCommitment}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 sm:py-3 text-base rounded-xl bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 cursor-pointer appearance-none"
                >
                  <option value="1 Hour">1 Hour (Side Hustle)</option>
                  <option value="2 Hours">2 Hours (Steady Growth)</option>
                  <option value="4 Hours">4 Hours (Part-Time Pro)</option>
                  <option value="8+ Hours">8+ Hours (All In)</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-2 bg-blue-800 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-900/20 hover:bg-blue-900 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  <span>Generating Plan...</span>
                </>
              ) : (
                <>
                  <span>Generate Roadmap</span>
                  <Send size={20} />
                </>
              )}
            </button>
            
            <p className="text-xs text-center text-slate-400 mt-4 leading-relaxed px-2">
              By joining, you agree to receive updates. <br className="hidden sm:block" /> Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;