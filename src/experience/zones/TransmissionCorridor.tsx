import React from 'react';
import * as THREE from 'three';

export const TransmissionCorridor: React.FC = () => {
  return (
    <group position={[0, -5, -500]}>
      {/* Ground Plane */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial color="#2B3A25" roughness={1} />
      </mesh>

      {/* Sequence of Lattice Towers */}
      {[-200, -100, 0, 100, 200].map((z, i) => (
        <group key={`tower-${i}`} position={[0, 0, z]}>
          {/* Main Tower Structure (Simplified Lattice) */}
          <mesh position={[0, 25, 0]}>
            <cylinderGeometry args={[2, 6, 50, 4]} />
            <meshStandardMaterial color="#888888" metalness={0.6} roughness={0.4} wireframe={true} />
          </mesh>
          <mesh position={[0, 25, 0]}>
             <cylinderGeometry args={[1.9, 5.9, 50, 4]} />
             <meshStandardMaterial color="#555555" metalness={0.6} roughness={0.8} />
          </mesh>

          {/* Crossarms */}
          <mesh position={[0, 45, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.5, 0.5, 30, 4]} />
            <meshStandardMaterial color="#888888" metalness={0.6} roughness={0.4} wireframe={true} />
          </mesh>
          <mesh position={[0, 35, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.5, 0.5, 40, 4]} />
            <meshStandardMaterial color="#888888" metalness={0.6} roughness={0.4} wireframe={true} />
          </mesh>

          {/* Ceramic Insulator Strings hanging from crossarms */}
          {[-15, 0, 15].map((x, j) => (
            <group key={`insulator-${j}`} position={[x, 45, 0]}>
              <mesh position={[0, -2, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 4, 8]} />
                <meshStandardMaterial color="#8B4513" roughness={0.9} />
              </mesh>
            </group>
          ))}
          {[-20, 20].map((x, j) => (
            <group key={`insulator-lower-${j}`} position={[x, 35, 0]}>
              <mesh position={[0, -2, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 4, 8]} />
                <meshStandardMaterial color="#8B4513" roughness={0.9} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Sagging High Voltage Cables between towers */}
      {[-200, -100, 0, 100].map((startZ, i) => (
        <group key={`span-${i}`}>
          {[-15, 0, 15].map((x, j) => {
            const curve = new THREE.CatmullRomCurve3([
              new THREE.Vector3(x, 41, startZ),
              new THREE.Vector3(x, 25, startZ + 50),
              new THREE.Vector3(x, 41, startZ + 100)
            ]);
            return (
              <mesh key={`cable-${j}`}>
                <tubeGeometry args={[curve, 20, 0.1, 8, false]} />
                <meshStandardMaterial color="#111111" roughness={0.8} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
};
