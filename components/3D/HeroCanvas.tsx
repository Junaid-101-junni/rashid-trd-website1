// @ts-nocheck
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

/* ──────────────────────────────────────────────────────────────────
   MATERIALS
────────────────────────────────────────────────────────────────── */
function GoldMat({ emissive = 0 }) {
  return (
    <meshStandardMaterial
      color="#d4af37"
      metalness={0.95}
      roughness={0.1}
      emissive="#c8940a"
      emissiveIntensity={emissive}
    />
  );
}
function ConcreteMat() {
  return <meshStandardMaterial color="#1c1c1e" metalness={0.3} roughness={0.85} />;
}
function GlassMat() {
  return (
    <meshStandardMaterial
      color="#3a6ea5"
      metalness={0.9}
      roughness={0.05}
      transparent
      opacity={0.45}
    />
  );
}
function TealMat({ glow = 0.6 }) {
  return (
    <meshStandardMaterial
      color="#00f0ff"
      emissive="#00d4e6"
      emissiveIntensity={glow}
      metalness={0.8}
      roughness={0.1}
    />
  );
}

/* ──────────────────────────────────────────────────────────────────
   GOLDEN PARTICLE FIELD
────────────────────────────────────────────────────────────────── */
function ParticleField({ count = 400 }) {
  const mesh = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      spd[i] = Math.random() * 0.004 + 0.001;
    }
    return { positions: pos, speeds: spd };
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i];
      if (pos[i * 3 + 1] > 15) pos[i * 3 + 1] = -15;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} count={count} />
      </bufferGeometry>
      <pointsMaterial color="#d4af37" size={0.03} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}

/* ──────────────────────────────────────────────────────────────────
   FLOATING STEEL BEAM
────────────────────────────────────────────────────────────────── */
function FloatingBeam({ position, rotation = [0, 0, 0], delay = 0 }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() + delay;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.4;
    ref.current.rotation.z = rotation[2] + Math.sin(t * 0.4) * 0.04;
  });
  return (
    <group ref={ref} position={position} rotation={rotation}>
      {/* I-beam cross section */}
      <mesh>
        <boxGeometry args={[2.5, 0.08, 0.25]} />
        <GoldMat emissive={0.1} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[2.5, 0.06, 0.08]} />
        <GoldMat emissive={0.15} />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[2.5, 0.06, 0.08]} />
        <GoldMat emissive={0.15} />
      </mesh>
      {/* Glow lines on edges */}
      <mesh position={[1.2, 0, 0]}>
        <boxGeometry args={[0.05, 0.08, 0.26]} />
        <TealMat glow={0.8} />
      </mesh>
      <mesh position={[-1.2, 0, 0]}>
        <boxGeometry args={[0.05, 0.08, 0.26]} />
        <TealMat glow={0.8} />
      </mesh>
    </group>
  );
}

/* ──────────────────────────────────────────────────────────────────
   CRANE STRUCTURE
────────────────────────────────────────────────────────────────── */
function Crane({ position = [3.5, 0, -2] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.15) * 0.12;
  });

  return (
    <group ref={ref} position={position}>
      {/* Mast */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[0.12, 7, 0.12]} />
        <ConcreteMat />
      </mesh>
      {/* Jib (horizontal arm) */}
      <mesh position={[-1.5, 6.2, 0]}>
        <boxGeometry args={[3.5, 0.1, 0.1]} />
        <GoldMat />
      </mesh>
      {/* Counter jib */}
      <mesh position={[1.1, 6.0, 0]}>
        <boxGeometry args={[1.2, 0.08, 0.08]} />
        <meshStandardMaterial color="#555" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Hook cable */}
      <mesh position={[-2.5, 4.8, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 2.8, 6]} />
        <TealMat glow={0.5} />
      </mesh>
      {/* Hook ball */}
      <mesh position={[-2.5, 3.3, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <GoldMat emissive={0.3} />
      </mesh>
      {/* Diagonal support cables */}
      {[-0.8, 0.2, 1.2].map((x, i) => (
        <mesh key={i} position={[x - 1.5, 6.0, 0]} rotation={[0, 0, -0.5 + i * 0.2]}>
          <cylinderGeometry args={[0.008, 0.008, 2.2, 4]} />
          <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SKYSCRAPER
────────────────────────────────────────────────────────────────── */
function Skyscraper({ position = [0, -1, 0] }) {
  const ref = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    // Slow gentle float
    ref.current.position.y = position[1] + Math.sin(t * 0.4) * 0.15;
    // Mouse parallax
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouse.x * 0.2, 0.04);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -mouse.y * 0.08, 0.04);
  });

  // Floor levels for the skyscraper
  const floors = [
    { y: 0,    w: 1.4, h: 0.8,  d: 1.4 },
    { y: 0.9,  w: 1.3, h: 1.2,  d: 1.3 },
    { y: 2.2,  w: 1.2, h: 1.8,  d: 1.2 },
    { y: 4.1,  w: 1.1, h: 2.0,  d: 1.1 },
    { y: 6.2,  w: 0.9, h: 1.6,  d: 0.9 },
    { y: 7.9,  w: 0.7, h: 1.2,  d: 0.7 },
    { y: 9.2,  w: 0.5, h: 0.8,  d: 0.5 },
    { y: 10.1, w: 0.3, h: 1.4,  d: 0.3 },
  ];

  return (
    <group ref={ref} position={position}>
      {/* Base platform */}
      <mesh position={[0, -0.55, 0]} receiveShadow>
        <boxGeometry args={[3.5, 0.1, 3.5]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.7} />
      </mesh>

      {/* Tower floors — alternating concrete + glass */}
      {floors.map((f, i) => (
        <group key={i} position={[0, f.y, 0]}>
          {/* Core */}
          <mesh castShadow>
            <boxGeometry args={[f.w, f.h, f.d]} />
            {i % 3 === 1 ? <GlassMat /> : <ConcreteMat />}
          </mesh>
          {/* Wireframe overlay (blueprint feel) */}
          {i % 2 === 0 && (
            <mesh>
              <boxGeometry args={[f.w + 0.01, f.h + 0.01, f.d + 0.01]} />
              <meshStandardMaterial color="#00f0ff" wireframe transparent opacity={0.12} />
            </mesh>
          )}
          {/* Floor accent ring */}
          <mesh position={[0, f.h / 2, 0]}>
            <boxGeometry args={[f.w + 0.04, 0.03, f.d + 0.04]} />
            <GoldMat emissive={0.2} />
          </mesh>
        </group>
      ))}

      {/* Spire */}
      <mesh position={[0, 11.2, 0]} castShadow>
        <coneGeometry args={[0.12, 1.5, 4]} />
        <GoldMat emissive={0.5} />
      </mesh>
      {/* Spire glow ball */}
      <mesh position={[0, 12.0, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
      </mesh>

      {/* Structural scaffolding on upper floors */}
      {[5.5, 7.0, 8.5].map((y, i) => (
        <group key={i}>
          <mesh position={[0.7, y, 0.7]}>
            <cylinderGeometry args={[0.025, 0.025, 1.5, 6]} />
            <GoldMat />
          </mesh>
          <mesh position={[-0.7, y, 0.7]}>
            <cylinderGeometry args={[0.025, 0.025, 1.5, 6]} />
            <GoldMat />
          </mesh>
          <mesh position={[0.7, y, -0.7]}>
            <cylinderGeometry args={[0.025, 0.025, 1.5, 6]} />
            <GoldMat />
          </mesh>
          <mesh position={[-0.7, y, -0.7]}>
            <cylinderGeometry args={[0.025, 0.025, 1.5, 6]} />
            <GoldMat />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ──────────────────────────────────────────────────────────────────
   FLOATING BLUEPRINT FRAME
────────────────────────────────────────────────────────────────── */
function Blueprint() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = -0.5 + Math.sin(t * 0.5 + 2) * 0.35;
    ref.current.rotation.y = t * 0.08;
  });

  return (
    <group ref={ref} position={[-4, 1, -3]} rotation={[0.3, 0.4, 0.1]}>
      {/* Sheet */}
      <mesh>
        <planeGeometry args={[2, 1.4]} />
        <meshStandardMaterial color="#0a1628" transparent opacity={0.85} side={THREE.DoubleSide} />
      </mesh>
      {/* Border */}
      <mesh>
        <planeGeometry args={[2.06, 1.46]} />
        <meshStandardMaterial color="#00f0ff" transparent opacity={0.3} wireframe side={THREE.DoubleSide} />
      </mesh>
      {/* Grid lines */}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.001]}>
          <planeGeometry args={[0.008, 1.3]} />
          <meshStandardMaterial color="#00f0ff" transparent opacity={0.2} />
        </mesh>
      ))}
      {[-0.5, -0.2, 0.1, 0.4].map((y, i) => (
        <mesh key={i} position={[0, y, 0.001]}>
          <planeGeometry args={[1.9, 0.008]} />
          <meshStandardMaterial color="#00f0ff" transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/* ──────────────────────────────────────────────────────────────────
   FLOATING GOLDEN REBAR CLUSTER
────────────────────────────────────────────────────────────────── */
function RebarCluster() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = 2 + Math.sin(t * 0.7 + 1) * 0.5;
    ref.current.rotation.x = t * 0.05;
    ref.current.rotation.z = t * 0.03;
  });

  return (
    <group ref={ref} position={[4.5, 2, -1.5]}>
      {[0, 0.18, 0.36, -0.18, -0.36].map((offset, i) => (
        <mesh key={i} position={[offset, 0, offset * 0.5]} rotation={[0, 0, i % 2 === 0 ? 0 : 0.1]}>
          <cylinderGeometry args={[0.04, 0.04, 2.2, 8]} />
          <GoldMat emissive={0.1} />
        </mesh>
      ))}
      {/* Horizontal ties */}
      {[-0.6, 0, 0.6].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.9, 6]} />
          <TealMat glow={0.4} />
        </mesh>
      ))}
    </group>
  );
}

/* ──────────────────────────────────────────────────────────────────
   LIGHT RAYS (volumetric feel)
────────────────────────────────────────────────────────────────── */
function LightRays() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.06;
  });

  return (
    <group ref={ref} position={[0, 8, -5]}>
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <mesh key={i} position={[Math.cos(rad) * 1.5, -4, Math.sin(rad) * 1.5]} rotation={[0, -rad, 0.15]}>
            <coneGeometry args={[0.08, 10, 4]} />
            <meshStandardMaterial
              color="#d4af37"
              transparent
              opacity={0.04}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ──────────────────────────────────────────────────────────────────
   FLOATING OCTAHEDRA (decorative gems)
────────────────────────────────────────────────────────────────── */
function FloatingGems() {
  const gems = [
    { pos: [-5, 0, -2], delay: 0, scale: 0.3 },
    { pos: [5.5, -1, -3], delay: 1.5, scale: 0.2 },
    { pos: [-4.5, 3, -1.5], delay: 0.8, scale: 0.25 },
    { pos: [5, 4, -2.5], delay: 2, scale: 0.18 },
  ];
  const refs = gems.map(() => useRef<THREE.Mesh>(null));

  useFrame(({ clock }) => {
    gems.forEach((g, i) => {
      if (!refs[i].current) return;
      const t = clock.getElapsedTime() + g.delay;
      refs[i].current.position.y = g.pos[1] + Math.sin(t * 0.8) * 0.4;
      refs[i].current.rotation.x += 0.008;
      refs[i].current.rotation.y += 0.012;
    });
  });

  return (
    <>
      {gems.map((g, i) => (
        <mesh key={i} ref={refs[i]} position={g.pos} scale={g.scale}>
          <octahedronGeometry args={[1, 0]} />
          <GoldMat emissive={0.3} />
        </mesh>
      ))}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   FULL SCENE
────────────────────────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      {/* Environment lighting */}
      <ambientLight intensity={0.25} color="#1a1040" />

      {/* Key light — dramatic top-right */}
      <directionalLight
        position={[8, 15, 5]}
        intensity={2.5}
        color="#fff8e7"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Gold fill light */}
      <pointLight position={[-4, 6, 3]} intensity={3} color="#d4af37" distance={20} decay={2} />

      {/* Teal rim light */}
      <pointLight position={[4, -2, 4]} intensity={2} color="#00f0ff" distance={15} decay={2} />

      {/* Warm underlight for tower base */}
      <pointLight position={[0, -2, 2]} intensity={1.5} color="#ff8c00" distance={10} decay={2} />

      {/* Spire glow */}
      <pointLight position={[0, 13, 0]} intensity={4} color="#fffde7" distance={8} decay={2} />

      {/* Scene elements */}
      <LightRays />
      <ParticleField count={500} />
      <Skyscraper position={[0, -6, 0]} />
      <Crane position={[3.5, -6, -1.5]} />
      <FloatingBeam position={[-2.5, 1.5, 0.5]} rotation={[0, 0.3, 0.05]} delay={0} />
      <FloatingBeam position={[1.5, 3.5, -1]} rotation={[0.1, -0.2, -0.08]} delay={1.2} />
      <FloatingBeam position={[-1, -0.5, 1]} rotation={[0, 0.6, 0.12]} delay={2.5} />
      <Blueprint />
      <RebarCluster />
      <FloatingGems />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   EXPORT
────────────────────────────────────────────────────────────────── */
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 2, 12], fov: 50 }}
      dpr={typeof window !== "undefined" && window.innerWidth < 768 ? [1, 1] : [1, 1.5]}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
