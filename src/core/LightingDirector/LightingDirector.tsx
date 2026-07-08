import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGridStore } from '../../store/useGridStore';
import * as THREE from 'three';

export const LightingDirector: React.FC = () => {
  const phase = useGridStore((state: any) => state.phase);
  const { scene } = useThree();
  
  const targetColor = useMemo(() => new THREE.Color(), []);
  const targetBgColor = useMemo(() => new THREE.Color(), []);
  
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);

  // Initialize scene background and fog
  React.useEffect(() => {
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.FogExp2(0x050505, 0.002);
  }, [scene]);

  useFrame((_state, delta) => {
    switch (phase) {
      case 'intro':
      case 'generation': // Power Plant / Generator Hall
        targetColor.setHex(0xFFA500); // Warm Orange Halogen
        targetBgColor.setHex(0x1a1510); // Dusty industrial
        break;
      case 'substation': // Switchyard
      case 'transformer':
        targetColor.setHex(0xFFE4B5); // Morning Sunlight
        targetBgColor.setHex(0x87CEEB); // Sky Blue (Morning)
        break;
      case 'transmission': // Transmission towers
        targetColor.setHex(0xFFD700); // Golden Hour
        targetBgColor.setHex(0x4A2511); // Stormy/Sunset
        break;
      case 'application':
      case 'products': // Industrial / Control Room
        targetColor.setHex(0xFFFFFF); // Cool LED White
        targetBgColor.setHex(0x0A0A0C); // Dark Facility
        break;
      case 'projects': // Smart Grid
        targetColor.setHex(0x00D9FF); // Electric Blue Holograms
        targetBgColor.setHex(0x020813); // Deep blue-black
        break;
      case 'innovation': // Renewables
        targetColor.setHex(0xFFE4B5); // Sunrise Gold
        targetBgColor.setHex(0x40B5AD); // Crisp morning sky
        break;
      default:
        targetColor.setHex(0xFFFFFF);
        targetBgColor.setHex(0x0A0A0C);
    }

    if (lightRef.current) {
      lightRef.current.color.lerp(targetColor, delta * 2);
    }
    
    // Smoothly transition the background and fog color
    if (scene.background instanceof THREE.Color) {
      scene.background.lerp(targetBgColor, delta * 1.5);
    }
    if (scene.fog) {
      scene.fog.color.lerp(targetBgColor, delta * 1.5);
    }
  });

  return (
    <group>
      <ambientLight ref={ambientRef} intensity={0.4} color="#ffffff" />
      <directionalLight 
        ref={lightRef}
        position={[10, 50, 20]} 
        intensity={2.5} 
        castShadow 
      />
    </group>
  );
};
