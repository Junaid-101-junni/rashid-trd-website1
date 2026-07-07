"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uHover;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Slight wave on Z axis based on hover
  pos.z += sin(pos.x * 5.0 + uTime * 2.0) * 0.05 * uHover;
  pos.z += cos(pos.y * 5.0 + uTime * 2.0) * 0.05 * uHover;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTex;
uniform float uTime;
uniform float uHover;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Liquid distortion effect
  uv.x += sin(uv.y * 10.0 + uTime * 2.0) * 0.02 * uHover;
  uv.y += cos(uv.x * 10.0 + uTime * 2.0) * 0.02 * uHover;
  
  vec4 tex = texture2D(uTex, uv);
  
  // Subtle color shift on hover
  vec3 rgb = tex.rgb;
  rgb.r += sin(uTime * 3.0) * 0.05 * uHover;
  rgb.b += cos(uTime * 2.0) * 0.05 * uHover;

  gl_FragColor = vec4(rgb, tex.a);
}
`;

function Scene({ img, hover }: { img: string, hover: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(img);

  // Smooth hover transition
  const targetHover = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTex: { value: texture },
      uTime: { value: 0 },
      uHover: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Lerp hover state
      targetHover.current = THREE.MathUtils.lerp(
        targetHover.current,
        hover ? 1 : 0,
        0.05
      );
      materialRef.current.uniforms.uHover.value = targetHover.current;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function LiquidImage({ img, className }: { img: string, className?: string }) {
  const [hover, setHover] = useState(false);

  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className || ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Canvas 
        camera={{ position: [0, 0, 1.2], fov: 45 }} // Use orthographic or perspective
        className="w-full h-full block pointer-events-none"
      >
        <Scene img={img} hover={hover} />
      </Canvas>
    </div>
  );
}
