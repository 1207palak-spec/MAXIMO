import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const TransformerChamber: React.FC = () => {
  const fansRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (fansRef.current) {
      fansRef.current.children.forEach((fan) => {
        fan.rotation.y += delta * 4;
      });
    }
  });

  return (
    <group position={[0, -5, -350]}>
      {/* Massive Ground Yard */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#3A3A3A" roughness={0.9} />
      </mesh>

      {/* AIS Switchyard Layout */}
      {[...Array(6)].map((_, i) => (
        <group key={`transformer-${i}`} position={[-60 + i * 24, 0, 0]}>
          {/* Main Power Transformer Body */}
          <mesh position={[0, 6, 0]}>
            <boxGeometry args={[8, 12, 10]} />
            <meshStandardMaterial color="#6E7377" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Cooling Radiators */}
          <group position={[-5, 5, 0]}>
            {[...Array(5)].map((_, j) => (
              <mesh key={`rad-l-${j}`} position={[0, 0, -4 + j * 2]}>
                <boxGeometry args={[2, 8, 0.5]} />
                <meshStandardMaterial color="#555555" />
              </mesh>
            ))}
          </group>
          <group position={[5, 5, 0]}>
            {[...Array(5)].map((_, j) => (
              <mesh key={`rad-r-${j}`} position={[0, 0, -4 + j * 2]}>
                <boxGeometry args={[2, 8, 0.5]} />
                <meshStandardMaterial color="#555555" />
              </mesh>
            ))}
          </group>

          {/* High Voltage Ceramic Bushings (Isolators) */}
          {[...Array(3)].map((_, k) => (
            <group key={`bushing-${k}`} position={[-2 + k * 2, 14, 2]}>
              <mesh>
                <cylinderGeometry args={[0.4, 0.6, 4, 16]} />
                <meshStandardMaterial color="#A0522D" roughness={0.8} />
              </mesh>
              {/* Ceramic ridges */}
              {[...Array(8)].map((_, r) => (
                <mesh key={`ridge-${r}`} position={[0, -1.5 + r * 0.4, 0]}>
                  <cylinderGeometry args={[0.7, 0.7, 0.1, 16]} />
                  <meshStandardMaterial color="#8B4513" roughness={0.9} />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      ))}

      {/* High Voltage Busbars crossing over the yard */}
      <group position={[0, 25, 0]}>
        {[...Array(3)].map((_, i) => (
          <mesh key={`busbar-${i}`} position={[0, i * 2, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 200, 8]} />
            <meshStandardMaterial color="#B0C4DE" metalness={1} roughness={0.1} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
