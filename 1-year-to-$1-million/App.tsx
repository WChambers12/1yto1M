import React, { useState, useRef } from 'react';
import Hero from './components/Hero';
import LeadForm from './components/LeadForm';
import PlanDisplay from './components/PlanDisplay';
import LoadingScreen from './components/LoadingScreen';
import { UserProfile, PlanData } from './types';
import { generatePersonalizedPlan } from './services/geminiService';

const App: React.FC = () => {
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (data: UserProfile) => {
    setLoading(true);
    setUserProfile(data);
    
    // Smooth scroll to top to prepare for loading screen
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const generatedPlan = await generatePersonalizedPlan(data);
      // Artificial minimum delay to ensure user sees the loading animations
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setPlan(generatedPlan);
      // Small delay to smooth the transition visually
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error("Failed to generate plan", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDefault = () => {
    const defaultProfile: UserProfile = {
      name: "Guest User",
      email: "guest@example.com",
      goal: "$500,000 GCI",
      dailyCommitment: "4 Hours"
    };
    handleFormSubmit(defaultProfile);
  };

  return (
    <div className="min-h-screen relative selection:bg-blue-200 selection:text-blue-900">
      {/* Global Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-slate-50 opacity-90" />
        <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-cyan-100/30 rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10">
        {loading ? (
          <div className="min-h-[80vh] flex items-center justify-center px-4">
            <LoadingScreen />
          </div>
        ) : !plan ? (
          <>
            <Hero scrollToForm={scrollToForm} onGenerateDefault={handleGenerateDefault} />
            <div ref={formRef} className="py-20 px-4">
              <LeadForm onSubmit={handleFormSubmit} isLoading={loading} />
            </div>
          </>
        ) : (
          <div className="py-20 px-4 md:px-8">
            <PlanDisplay plan={plan} userName={userProfile?.name || 'Future Millionaire'} />
            
            <div className="text-center mt-12">
               <button 
                onClick={() => setPlan(null)}
                className="text-slate-400 hover:text-blue-600 text-sm font-medium transition-colors"
               >
                 Start Over
               </button>
            </div>
          </div>
        )}
      </main>

      <footer className="relative z-10 py-8 text-center text-slate-400 text-sm bg-slate-50/80 backdrop-blur-sm border-t border-slate-200">
        <p>© {new Date().getFullYear()} 1 Year to $1 Million. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
          <a href="https://www.youtube.com/@OneYearto1Million" className="hover:text-blue-600 transition-colors">YouTube Channel</a>
        </div>
      </footer>
    </div>
  );
};

export default App;