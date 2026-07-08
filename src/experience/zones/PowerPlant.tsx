import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const PowerPlant: React.FC = () => {
  const turbinesRef = useRef<THREE.Group>(null);
  const fansRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    // Heavy industrial turbines rotating slowly
    if (turbinesRef.current) {
      turbinesRef.current.children.forEach((turbine) => {
        turbine.rotation.x += delta * 2; // Fast spinning internal blades
      });
    }
    // Cooling fans rotating
    if (fansRef.current) {
      fansRef.current.children.forEach((fan) => {
        fan.rotation.y += delta * 5;
      });
    }
  });

  return (
    <group position={[0, 0, -50]}>
      {/* Massive Concrete Floor */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#4A4A4A" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Array of Gas Turbines (Siemens SGT-9000HL style) */}
      {[...Array(4)].map((_, i) => (
        <group key={`turbine-${i}`} position={[-30 + i * 20, 5, 0]}>
          {/* Main Turbine Housing */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[5, 5, 15, 32]} />
            <meshStandardMaterial color="#888C8D" metalness={0.8} roughness={0.3} />
          </mesh>
          
          {/* Intake Pipes */}
          <mesh position={[0, 8, 0]}>
            <boxGeometry args={[4, 10, 4]} />
            <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.7} />
          </mesh>

          {/* Yellow Safety Catwalks */}
          <mesh position={[0, -2, 8]}>
            <boxGeometry args={[18, 0.5, 4]} />
            <meshStandardMaterial color="#FFB800" roughness={0.8} />
          </mesh>

          {/* Safety Railings */}
          <mesh position={[0, 0, 9.8]}>
            <boxGeometry args={[18, 4, 0.1]} />
            <meshStandardMaterial color="#FFB800" wireframe={true} />
          </mesh>
        </group>
      ))}

      {/* Internal Rotating Turbine Blades (Visible from front) */}
      <group ref={turbinesRef}>
        {[...Array(4)].map((_, i) => (
          <mesh key={`blade-${i}`} position={[-30 + i * 20, 5, 5.1]}>
            <cylinderGeometry args={[4, 4, 0.5, 16]} />
            <meshStandardMaterial color="#222222" metalness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Massive Cooling Infrastructure */}
      <group position={[0, 15, -40]}>
        <mesh>
          <boxGeometry args={[100, 20, 10]} />
          <meshStandardMaterial color="#555555" metalness={0.4} roughness={0.8} />
        </mesh>
        {/* Cooling Fans array */}
        <group ref={fansRef}>
          {[-40, -20, 0, 20, 40].map((x, i) => (
            <mesh key={`fan-${i}`} position={[x, 0, 5.1]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[4, 4, 1, 8]} />
              <meshStandardMaterial color="#111111" />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
};
