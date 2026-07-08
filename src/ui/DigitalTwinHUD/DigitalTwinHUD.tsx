import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGridStore } from '../../store/useGridStore';

export const DigitalTwinHUD: React.FC = () => {
  const phase = useGridStore((state: any) => state.phase);
  const [telemetry, setTelemetry] = useState({ v: 0, a: 0, f: 50.0 });

  // Simulate real-time fluctuating telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        v: 400 + Math.random() * 5 - 2.5,
        a: 1200 + Math.random() * 50 - 25,
        f: 50.0 + Math.random() * 0.04 - 0.02
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-40 overflow-hidden">
      {/* Telemetry Box - Always visible but data changes based on phase */}
      <div className="absolute top-1/2 right-12 transform -translate-y-1/2 flex flex-col gap-6">
        <AnimatePresence mode="wait">
          <motion.div 
            key={phase}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-4 font-mono text-xs text-[#A6ADB8] p-4 bg-transparent"
          >
            <div className="text-white font-medium tracking-widest border-b border-[rgba(255,255,255,0.08)] pb-2 mb-2">
              REAL-TIME SENSORS
            </div>
            
            {phase === 'generation' && (
              <>
                <div className="flex justify-between w-48"><span>RPM:</span> <span className="text-[#00D9FF]">{Math.round(3000 + Math.random()*10)}</span></div>
                <div className="flex justify-between"><span>VIB (mm/s):</span> <span className="text-[#00D9FF]">{(Math.random()*2).toFixed(2)}</span></div>
                <div className="flex justify-between"><span>TEMP EXH:</span> <span className="text-white">{Math.round(600 + Math.random()*20)}°C</span></div>
              </>
            )}
            
            {(phase === 'transformer' || phase === 'transmission') && (
              <>
                <div className="flex justify-between w-48"><span>SYS_VOLT:</span> <span className="text-[#00D9FF]">{telemetry.v.toFixed(1)} kV</span></div>
                <div className="flex justify-between"><span>LINE_CURR:</span> <span className="text-[#00D9FF]">{Math.round(telemetry.a)} A</span></div>
                <div className="flex justify-between"><span>SYS_FREQ:</span> <span className="text-[#00D9FF]">{telemetry.f.toFixed(3)} Hz</span></div>
                <div className="flex justify-between"><span>OIL_TEMP:</span> <span className="text-[#FFB800]">68°C</span></div>
              </>
            )}

            {(phase === 'application' || phase === 'products' || phase === 'substation') && (
              <>
                <div className="flex justify-between w-48"><span>BUS_VOLT:</span> <span className="text-[#00D9FF]">11.0 kV</span></div>
                <div className="flex justify-between"><span>LOAD:</span> <span className="text-white">84%</span></div>
                <div className="flex justify-between"><span>POWER_FACT:</span> <span className="text-white">0.98</span></div>
                <div className="flex justify-between"><span>BREAKER:</span> <span className="text-[#00FF00]">CLOSED</span></div>
              </>
            )}
            
            {(phase === 'projects' || phase === 'innovation') && (
              <>
                <div className="flex justify-between w-48"><span>WIND_SPD:</span> <span className="text-white">12.4 m/s</span></div>
                <div className="flex justify-between"><span>PV_IRRAD:</span> <span className="text-white">850 W/m²</span></div>
                <div className="flex justify-between"><span>INVERTER:</span> <span className="text-[#00D9FF]">SYNC</span></div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Target Reticle (Center screen) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
        <div className="w-16 h-16 border border-white/20 rounded-full relative">
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#00D9FF] transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="absolute top-0 left-1/2 w-[1px] h-2 bg-white/20 -translate-x-1/2 -translate-y-full"></div>
          <div className="absolute bottom-0 left-1/2 w-[1px] h-2 bg-white/20 -translate-x-1/2 translate-y-full"></div>
          <div className="absolute top-1/2 left-0 w-2 h-[1px] bg-white/20 -translate-y-1/2 -translate-x-full"></div>
          <div className="absolute top-1/2 right-0 w-2 h-[1px] bg-white/20 -translate-y-1/2 translate-x-full"></div>
        </div>
      </div>
    </div>
  );
};
