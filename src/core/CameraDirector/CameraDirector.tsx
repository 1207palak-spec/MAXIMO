import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { useGridStore } from '../../store/useGridStore';

export const CameraDirector: React.FC = () => {
  const scroll = useScroll();
  const setPhase = useGridStore((state: any) => state.setPhase);
  
  // Cinematic Inertia States
  const currentOffset = useRef(0);
  
  // High-frequency noise for drone hovering / wind
  const noiseTime = useRef(0);

  // CAMERA POSITION SPLINE
  // Orchestrates complex sweeping, diving, and orbiting motions
  const cameraPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      // Power Plant (0.0 -> 0.1)
      new THREE.Vector3(0, 30, 150),    // 0.0 - Wide establishing shot of Power Plant
      new THREE.Vector3(20, 15, 50),    // 0.03 - Drone orbits down towards turbines
      new THREE.Vector3(10, 5, -20),    // 0.06 - Pushing close past rotating blades
      new THREE.Vector3(0, 5, -50),     // 0.08 - Diving into the exhaust pipe

      // Transformer Switchyard (0.15 -> 0.3)
      new THREE.Vector3(-40, 20, -150), // 0.15 - Emerge from pipe, bank left over switchyard
      new THREE.Vector3(-60, 10, -250), // 0.20 - Low angle orbit around massive transformer
      new THREE.Vector3(-60, 25, -350), // 0.25 - Rise up vertically past ceramic bushings
      new THREE.Vector3(0, 45, -450),   // 0.30 - Bank towards the transmission cables

      // Transmission Corridor (0.35 -> 0.5)
      new THREE.Vector3(0, 41, -500),   // 0.35 - Attach to sagging cable
      new THREE.Vector3(0, 25, -550),   // 0.40 - Ride the sag of the cable
      new THREE.Vector3(0, 41, -600),   // 0.45 - Rise up to the next tower
      new THREE.Vector3(0, 50, -650),   // 0.50 - Lightning flash! High aerial overview

      // Substation (0.55 -> 0.65)
      new THREE.Vector3(0, -2, -680),   // 0.55 - Dramatic freefall drop into substation
      new THREE.Vector3(20, 5, -720),   // 0.60 - Fly between distribution transformers
      new THREE.Vector3(0, 2, -750),    // 0.65 - Push through the control building vent

      // Industrial Control Room (0.7 -> 0.8)
      new THREE.Vector3(0, 5, -880),    // 0.70 - Dark entry
      new THREE.Vector3(0, 6, -910),    // 0.75 - Slow push into the massive SCADA panels
      new THREE.Vector3(15, 5, -900),   // 0.80 - Orbit the motor testing bay

      // Smart Grid (0.85 -> 0.90)
      new THREE.Vector3(30, 60, -1050), // 0.85 - Bank high above globe
      new THREE.Vector3(0, 30, -1100),  // 0.90 - Dive through data nodes

      // Renewables (0.95 -> 1.0)
      new THREE.Vector3(-40, 5, -1250), // 0.95 - Low sweep over solar panels
      new THREE.Vector3(20, 70, -1350)  // 1.00 - Rise high above wind turbines
    ], false, 'catmullrom', 0.5);
  }, []);

  // CAMERA FOCUS (LOOK AT) SPLINE
  // Allows the camera to orbit and track objects independently of its flight path
  const focusPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      // Power Plant
      new THREE.Vector3(0, 10, -50),    // 0.0 - Looking at the turbines from far away
      new THREE.Vector3(-10, 5, -50),   // 0.05 - Tracking a specific turbine while flying past
      new THREE.Vector3(0, 5, -150),    // 0.1 - Looking through the exhaust pipe

      // Transformer Switchyard
      new THREE.Vector3(-60, 5, -250),  // 0.2 - Tracking the massive transformer base
      new THREE.Vector3(-60, 30, -350), // 0.25 - Tracking up to the busbars
      
      // Transmission Corridor
      new THREE.Vector3(0, 30, -600),   // 0.4 - Looking down the cable path
      new THREE.Vector3(0, -5, -700),   // 0.5 - Looking straight down at substation

      // Substation
      new THREE.Vector3(0, 2, -750),    // 0.6 - Looking at the control room vent

      // Industrial Control Room
      new THREE.Vector3(0, 6, -930),    // 0.75 - Looking at the massive SCADA wall
      new THREE.Vector3(-20, 4, -890),  // 0.80 - Tracking the motor bay

      // Smart Grid
      new THREE.Vector3(0, 40, -1100),  // 0.85 - Track globe center
      new THREE.Vector3(0, 40, -1100),  // 0.90 - Track globe center while diving
      
      // Renewables
      new THREE.Vector3(-10, 0, -1300), // 0.95 - Look at solar array
      new THREE.Vector3(50, 80, -1350)  // 1.00 - Look directly at turbine nacelle
    ], false, 'catmullrom', 0.5);
  }, []);

  useFrame((state, delta) => {
    // 1. Calculate heavy cinematic inertia
    // The target offset is driven by scroll, but the current offset lags heavily
    const targetOffset = scroll.offset;
    currentOffset.current = THREE.MathUtils.damp(currentOffset.current, targetOffset, 1.5, delta);
    
    // Safety clamp
    const safeOffset = THREE.MathUtils.clamp(currentOffset.current, 0.001, 0.999);

    // 2. Sample the dual splines
    const cameraPos = cameraPath.getPointAt(safeOffset);
    const focusPos = focusPath.getPointAt(safeOffset);

    // 3. Add drone micro-movements (breathing/wind)
    noiseTime.current += delta * 0.5;
    const hoverX = Math.sin(noiseTime.current * 1.5) * 0.2;
    const hoverY = Math.cos(noiseTime.current * 1.2) * 0.2;
    
    // Apply position
    state.camera.position.copy(cameraPos);
    state.camera.position.x += hoverX;
    state.camera.position.y += hoverY;

    // Apply look at
    state.camera.lookAt(focusPos);

    // 4. Update the global phase for UI/Lighting (using the immediate targetOffset so UI reacts instantly)
    if (targetOffset < 0.1) setPhase('generation'); // 0 - 10%
    else if (targetOffset < 0.3) setPhase('transformer'); // 10% - 30%
    else if (targetOffset < 0.5) setPhase('transmission'); // 30% - 50%
    else if (targetOffset < 0.6) setPhase('substation'); // 50% - 60%
    else if (targetOffset < 0.7) setPhase('application'); // 60% - 70%
    else if (targetOffset < 0.8) setPhase('products'); // 70% - 80%
    else if (targetOffset < 0.9) setPhase('projects'); // 80% - 90%
    else setPhase('innovation'); // 90% - 100%
  });

  return (
    <group>
      {/* Optional: Add debug lines to visualize the camera paths in dev mode */}
    </group>
  );
};
