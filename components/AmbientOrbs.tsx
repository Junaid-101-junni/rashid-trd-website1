// @ts-nocheck
"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    
    // Subtle parallax effect with mouse
    vec2 mouseOffset = (uMouse - 0.5) * 0.15;
    uv += mouseOffset;
    
    float t = uTime * 0.15;
    
    // Organic fluid waves (Simulating an Aurora / Silk)
    float wave1 = sin(uv.x * 3.0 + t) * cos(uv.y * 2.0 + t);
    float wave2 = sin(uv.x * 2.0 - t * 0.8) * cos(uv.y * 4.0 - t * 1.2);
    float wave3 = sin((uv.x + uv.y) * 2.5 + t * 1.5);
    
    float v = wave1 + wave2 + wave3;
    
    // Colors
    vec3 baseColor = vec3(0.0, 0.0, 0.0); // Pitch black
    vec3 accent1 = vec3(0.76, 0.63, 0.39); // #C4A265 (Gold)
    vec3 accent2 = vec3(0.54, 0.43, 0.24); // #8B6F3E (Dark Gold)
    
    // Create ribbons of light
    float intensity1 = smoothstep(0.5, 2.5, v);
    float intensity2 = smoothstep(-0.5, 1.5, v * 0.8);
    
    // Mouse Glow
    float dist = distance(vUv, uMouse);
    float mouseGlow = smoothstep(0.6, 0.0, dist) * 0.2;
    
    vec3 finalColor = baseColor;
    finalColor = mix(finalColor, accent2, intensity2 * 0.15);
    finalColor = mix(finalColor, accent1, intensity1 * 0.25 + mouseGlow);
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

function FluidShader() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, pointer } = useThree();
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smoothly interpolate mouse position
      const targetX = pointer.x * 0.5 + 0.5;
      const targetY = pointer.y * 0.5 + 0.5;
      material.uniforms.uMouse.value.x += (targetX - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (targetY - material.uniforms.uMouse.value.y) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function AmbientOrbs() {
  // Using an id or specific class if needed, but absolute inset-0 works well.
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ alpha: false, antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <FluidShader />
      </Canvas>
    </div>
  );
}
