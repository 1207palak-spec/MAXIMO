import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { CameraDirector } from '../CameraDirector/CameraDirector';
import { LightingDirector } from '../LightingDirector/LightingDirector';
import { WorldDirector } from '../WorldDirector/WorldDirector';

export const Engine: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ 
        antialias: true,
        powerPreference: "high-performance",
        alpha: false
      }}
      className="absolute top-0 left-0 w-full h-full z-0"
    >
      <color attach="background" args={['#050505']} />
      
      <Suspense fallback={null}>
        <ScrollControls pages={10} damping={0.1} distance={2}>
          <LightingDirector />
          <CameraDirector />
          
          {/* Zones */}
          <WorldDirector />
        </ScrollControls>
      </Suspense>
      
    </Canvas>
  );
};
