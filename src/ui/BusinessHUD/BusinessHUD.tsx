import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGridStore } from '../../store/useGridStore';

export const BusinessHUD: React.FC = () => {
  const phase = useGridStore((state: any) => state.phase);

  const getPhaseContent = () => {
    switch (phase) {
      case 'intro':
      case 'generation':
        return {
          title: "POWER GENERATION",
          headline: "Engineering Reliable Energy.",
          subtext: "High-efficiency 1000MW Gas Turbines. The foundation of global infrastructure."
        };
      case 'transformer':
        return {
          title: "TRANSFORMATION",
          headline: "Future-Ready Electrical Solutions.",
          subtext: "765kV GIS/AIS switchyards stepping voltage for safe distribution."
        };
      case 'transmission':
        return {
          title: "HIGH VOLTAGE TRANSMISSION",
          headline: "Connecting Industries Through Power.",
          subtext: "Delivering massive energy across continents via resilient HVAC corridors."
        };
      case 'substation':
        return {
          title: "DISTRIBUTION SUBSTATION",
          headline: "Energy Without Limits.",
          subtext: "Stepping down to 132kV load centers. Intelligent switchgear providing absolute reliability."
        };
      case 'application':
      case 'products':
        return {
          title: "INDUSTRIAL AUTOMATION",
          headline: "Building Intelligent Infrastructure.",
          subtext: "Centralized SCADA telemetry providing complete control over industrial facilities."
        };
      case 'projects':
        return {
          title: "SMART GRID",
          headline: "Grid Intelligence.",
          subtext: "AI Grid Monitoring and Digital Twin networks balancing global energy demands."
        };
      case 'innovation':
        return {
          title: "RENEWABLE ENERGY",
          headline: "Powering Tomorrow.",
          subtext: "14MW Offshore Wind and PV Arrays integrating sustainable power into the grid."
        };
      case 'contact':
        return {
          title: "CONTACT",
          headline: "Let's Build the Future Together.",
          subtext: "Initiate communication with our engineering grid."
        };
      default:
        return null;
    }
  };

  const content = getPhaseContent();

  const highlightHeadline = (text: string) => {
    const words = text.split(' ');
    const lastWord = words.pop();
    return (
      <>
        {words.join(' ')} <span className="text-[#00D9FF]">{lastWord}</span>
      </>
    );
  };

  const highlightKeywords = (text: string) => {
    const keywords = ['Power', 'Energy', 'Grid', 'Innovation', 'Engineering', 'Infrastructure', 'Reliable', 'Intelligence', 'Sustainable', 'Gas Turbines', 'GIS/AIS', 'HVAC', 'Switchgear', 'SCADA', 'Digital Twin', 'Offshore Wind', 'PV Arrays'];
    const parts = text.split(new RegExp(`(${keywords.join('|')})`, 'gi'));
    return parts.map((part, i) => {
      const isKeyword = keywords.some(k => k.toLowerCase() === part.toLowerCase());
      return isKeyword ? <span key={i} className="text-[#00D9FF] font-medium">{part}</span> : part;
    });
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-end p-12 lg:p-24 z-50 overflow-hidden">
      
      {/* Permanent Premium Branding */}
      <div className="absolute top-12 left-12 flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm border border-[#00D9FF]/40 flex items-center justify-center">
            <svg width="18" height="24" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 10.5H6.5V18L14 7.5H7.5V0L0 10.5Z" fill="#00D9FF"/>
            </svg>
          </div>
          <span className="text-white font-sans font-bold tracking-[8px] text-[34px] drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">MAXIMO</span>
        </div>
        <span className="text-[#00D9FF] font-mono text-[10px] tracking-widest pl-14 opacity-70 font-medium uppercase">Power Infrastructure</span>
      </div>

      {/* Main Narrative Display */}
      <AnimatePresence mode="wait">
        {content && (
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl p-8 bg-transparent"
          >
            <h3 className="text-[#00D9FF] text-sm md:text-base tracking-[0.3em] font-mono mb-4 uppercase font-bold bg-transparent border-none shadow-none">
              {content.title}
            </h3>
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              {highlightHeadline(content.headline)}
            </h1>
            <p className="text-[rgba(255,255,255,0.82)] text-xl md:text-2xl font-medium max-w-2xl leading-[1.7] drop-shadow-none">
              {highlightKeywords(content.subtext)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Right Coordinate Radar Accent */}
      <div className="absolute top-12 right-12 flex flex-col items-end opacity-50 font-mono text-[10px] text-[#A6ADB8] tracking-widest text-right">
        <span>PHASE_SHIFT_ACTIVE</span>
        <span className="mt-1">{phase.toUpperCase()}</span>
      </div>
      
      {/* Scroll indicator */}
      {phase === 'intro' && (
        <motion.div 
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 right-12 text-[#00D9FF] font-mono text-xs tracking-widest uppercase opacity-80"
        >
          [ Scroll To Travel Timeline ]
        </motion.div>
      )}
    </div>
  );
};
