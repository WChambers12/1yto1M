import React, { useEffect, useState, useRef } from 'react';

export interface ProgressItem {
  label: string;
  value: number;
  color: string;
  delay: string;
}

interface ProgressShowcaseProps {
  items?: ProgressItem[];
  title?: string;
  className?: string;
}

const defaultItems: ProgressItem[] = [
  { label: "Lead Gen Consistency", value: 85, color: "bg-blue-500", delay: "delay-0" },
  { label: "Market Authority", value: 72, color: "bg-cyan-500", delay: "delay-150" },
  { label: "Client Conversion", value: 94, color: "bg-blue-600", delay: "delay-300" },
  { label: "Revenue Growth", value: 100, color: "bg-gradient-to-r from-blue-600 to-cyan-400", delay: "delay-500" }
];

const ProgressShowcase: React.FC<ProgressShowcaseProps> = ({ items = defaultItems, title = "Growth Trajectory", className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden ${className}`}>
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3" />

      {title && <h3 className="text-2xl font-bold mb-10 relative z-10 tracking-tight">{title}</h3>}

      <div className="space-y-8 relative z-10 w-full">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between text-slate-300 font-medium text-sm tracking-wide">
              <span>{item.label}</span>
              <span className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {item.value}%
              </span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-[1500ms] ease-out ${item.color} ${item.delay}`}
                style={{ 
                    width: isVisible ? `${item.value}%` : '0%',
                    transitionDelay: `${idx * 150}ms`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressShowcase;