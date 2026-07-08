import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WindTurbine = ({ position }: { position: [number, number, number] }) => {
  const bladeRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (bladeRef.current) {
      // Realistic, slow, majestic rotation for a 14MW offshore turbine
      bladeRef.current.rotation.z -= delta * 0.4;
    }
  });

  return (
    <group position={position}>
      {/* Tower */}
      <mesh position={[0, 40, 0]}>
        <cylinderGeometry args={[1, 2, 80, 16]} />
        <meshStandardMaterial color="#EAEAEA" />
      </mesh>
      {/* Nacelle */}
      <mesh position={[0, 80, 2]}>
        <boxGeometry args={[3, 3, 8]} />
        <meshStandardMaterial color="#EAEAEA" />
      </mesh>
      {/* Rotor Blades */}
      <group ref={bladeRef} position={[0, 80, 6]}>
        {[0, 1, 2].map((blade) => (
          <mesh key={`blade-${blade}`} rotation={[0, 0, blade * ((Math.PI * 2) / 3)]} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.5, 40, 8]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        ))}
        {/* Hub */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 2, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>
    </group>
  );
};

export const RenewablePark: React.FC = () => {
  return (
    <group position={[0, 0, -1300]}>
      {/* Massive Green Field */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color="#2E3A23" roughness={0.9} />
      </mesh>

      {/* Solar Panel Farm */}
      <group position={[-50, 0, 0]}>
        {[...Array(10)].map((_, row) => (
          <group key={`row-${row}`} position={[0, 0, -40 + row * 8]}>
            {[...Array(15)].map((_, col) => (
              <mesh key={`panel-${row}-${col}`} position={[col * 6, 2, 0]} rotation={[-Math.PI / 6, 0, 0]}>
                <boxGeometry args={[5, 3, 0.2]} />
                <meshStandardMaterial color="#001a33" metalness={0.9} roughness={0.1} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* Wind Turbines */}
      <group position={[50, 0, -50]}>
        {[-30, 0, 30].map((z, i) => (
          <WindTurbine key={`wind-${i}`} position={[i * 40, 0, z]} />
        ))}
      </group>
    </group>
  );
};
