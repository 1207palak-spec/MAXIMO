import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SmartGrid: React.FC = () => {
  const ringsRef = useRef<THREE.Group>(null);
  const dataNodesRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.y += delta * 0.1;
      ringsRef.current.rotation.x += delta * 0.05;
    }
    if (dataNodesRef.current) {
      dataNodesRef.current.children.forEach((node, i) => {
        // Floating data nodes
        node.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.01;
      });
    }
  });

  return (
    <group position={[0, 40, -1100]}>
      {/* Massive Holographic Globe representing global energy network */}
      <group ref={ringsRef}>
        <mesh>
          <sphereGeometry args={[20, 32, 32]} />
          <meshBasicMaterial color="#001133" transparent opacity={0.6} wireframe={true} />
        </mesh>
        
        {/* Orbital Energy Rings */}
        {[...Array(3)].map((_, i) => (
          <mesh key={`ring-${i}`} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
            <torusGeometry args={[22 + i * 2, 0.1, 16, 100]} />
            <meshBasicMaterial color="#00D9FF" />
          </mesh>
        ))}
      </group>

      {/* Floating SCADA Data Nodes */}
      <group ref={dataNodesRef}>
        {[...Array(50)].map((_, i) => {
          const radius = 25 + Math.random() * 15;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.sin(phi) * Math.sin(theta);
          const z = radius * Math.cos(phi);

          return (
            <mesh key={`node-${i}`} position={[x, y, z]}>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshBasicMaterial color={Math.random() > 0.8 ? "#FFB800" : "#00F0FF"} />
            </mesh>
          );
        })}
      </group>

      {/* Ground Control Platform */}
      <mesh position={[0, -25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[10, 40, 64]} />
        <meshStandardMaterial color="#111115" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};
