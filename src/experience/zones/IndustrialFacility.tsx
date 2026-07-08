import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const IndustrialFacility: React.FC = () => {
  const dialsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (dialsRef.current) {
      dialsRef.current.children.forEach((dial, i) => {
        // Simulate minor fluctuations in analog dials
        dial.rotation.z = Math.sin(state.clock.elapsedTime * (2 + i)) * 0.1;
      });
    }
  });

  return (
    <group position={[0, -5, -900]}>
      {/* Interior Control Room Floor */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#111115" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Massive Industrial Control Panels */}
      <group position={[0, 6, -30]}>
        {/* Main Panel Wall */}
        <mesh>
          <boxGeometry args={[60, 12, 2]} />
          <meshStandardMaterial color="#2F4F4F" metalness={0.3} roughness={0.7} />
        </mesh>
        
        {/* Digital SCADA Screens */}
        {[-15, 0, 15].map((x, i) => (
          <mesh key={`screen-${i}`} position={[x, 1, 1.1]}>
            <planeGeometry args={[10, 6]} />
            <meshBasicMaterial color={i === 1 ? "#00FF00" : "#00D9FF"} />
          </mesh>
        ))}

        {/* Physical Dials and Buttons */}
        <group ref={dialsRef} position={[0, -3, 1.1]}>
          {[...Array(12)].map((_, i) => (
            <mesh key={`dial-${i}`} position={[-20 + i * 3.5, 0, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 0.2, 16]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
          ))}
        </group>
      </group>

      {/* Industrial Motor Testing Bay */}
      <group position={[-20, 4, 10]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[3, 3, 8, 32]} />
          <meshStandardMaterial color="#708090" metalness={0.9} roughness={0.4} />
        </mesh>
        {/* Copper Coils (Exposed section) */}
        <mesh position={[0, 0, -1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.8, 2.8, 4, 32]} />
          <meshStandardMaterial color="#B87333" metalness={1} roughness={0.3} wireframe={true} />
        </mesh>
      </group>

      {/* Smart Meter Array Display */}
      <group position={[25, 5, 10]}>
        <mesh>
          <boxGeometry args={[10, 10, 2]} />
          <meshStandardMaterial color="#808080" />
        </mesh>
        {[...Array(9)].map((_, i) => (
          <mesh key={`meter-${i}`} position={[-3 + (i % 3) * 3, 3 - Math.floor(i / 3) * 3, 1.1]}>
            <boxGeometry args={[1.5, 2, 0.2]} />
            <meshStandardMaterial color="#D3D3D3" />
          </mesh>
        ))}
      </group>
    </group>
  );
};
