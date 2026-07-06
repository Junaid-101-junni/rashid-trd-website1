// @ts-nocheck
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls, ContactShadows, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";

function AbstractTradeComposition() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t / 4) / 2;
    groupRef.current.rotation.x = Math.cos(t / 4) / 4;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Golden Container */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial 
            color="#d4af37" 
            metalness={0.8} 
            roughness={0.2} 
            envMapIntensity={2} 
          />
        </mesh>

        {/* Orbiting Glass Spheres */}
        <mesh position={[2, 1, 1]} castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={1}
            chromaticAberration={0.025}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            color="#00f0ff"
          />
        </mesh>
        
        <mesh position={[-1.5, -1, 1.5]} castShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial 
            color="#ffffff" 
            metalness={1} 
            roughness={0} 
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#0a0a0a']} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00f0ff" />
        
        <AbstractTradeComposition />
        
        <Environment preset="city" />
        
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.4} 
          scale={20} 
          blur={2} 
          far={4.5} 
        />
        
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
          <Noise opacity={0.03} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
