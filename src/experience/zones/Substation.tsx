import React from 'react';


export const Substation: React.FC = () => {
  return (
    <group position={[0, -5, -700]}>
      {/* Concrete Ground */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[150, 150]} />
        <meshStandardMaterial color="#555555" roughness={0.9} />
      </mesh>

      {/* Control Building */}
      <mesh position={[40, 5, -20]}>
        <boxGeometry args={[20, 10, 15]} />
        <meshStandardMaterial color="#A9A9A9" />
      </mesh>

      {/* Distribution Transformers */}
      {[-30, -10, 10].map((x, i) => (
        <group key={`dist-transformer-${i}`} position={[x, 3, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[4, 6, 4]} />
            <meshStandardMaterial color="#708090" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[0, 4, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 2, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        </group>
      ))}

      {/* Low Voltage Switchgear Array */}
      <group position={[-20, 2.5, 30]}>
        {[...Array(6)].map((_, i) => (
          <mesh key={`switchgear-${i}`} position={[i * 4, 0, 0]}>
            <boxGeometry args={[3.5, 5, 2]} />
            <meshStandardMaterial color="#D3D3D3" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Chainlink Fence Border */}
      <mesh position={[0, 2, 50]}>
        <boxGeometry args={[100, 4, 0.1]} />
        <meshStandardMaterial color="#888888" wireframe={true} />
      </mesh>
    </group>
  );
};
