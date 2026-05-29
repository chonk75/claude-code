"use client";

import { Component, Suspense, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Inner scene contents (rendered inside Canvas) ─── */
function OrbInner() {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.12;
      outerRef.current.rotation.x = Math.sin(t * 0.08) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.18;
      innerRef.current.rotation.z = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <>
      {/* Ambient light — warm blue tint */}
      <ambientLight intensity={0.35} color="#6366f1" />

      {/* Key light — cyan from upper-left */}
      <pointLight
        position={[-3, 3, 3]}
        intensity={4}
        color="#22d3ee"
        distance={12}
      />

      {/* Fill light — violet from lower-right */}
      <pointLight
        position={[3, -2, 2]}
        intensity={3}
        color="#8b5cf6"
        distance={10}
      />

      {/* Rim light behind */}
      <pointLight
        position={[0, 0, -4]}
        intensity={2}
        color="#4f46e5"
        distance={8}
      />

      <Float
        speed={1.4}
        rotationIntensity={0.3}
        floatIntensity={0.6}
        floatingRange={[-0.12, 0.12]}
      >
        {/* Core distorted orb */}
        <Sphere ref={innerRef} args={[1, 96, 96]}>
          <MeshDistortMaterial
            distort={0.45}
            speed={1.6}
            roughness={0.25}
            metalness={0.35}
            color="#5b50f0"
            emissive="#4f46e5"
            emissiveIntensity={0.35}
          />
        </Sphere>

        {/* Outer semi-transparent shell */}
        <Sphere ref={outerRef} args={[1.3, 64, 64]}>
          <meshPhysicalMaterial
            color="#8b5cf6"
            transparent
            opacity={0.07}
            roughness={0.0}
            metalness={0.1}
            wireframe={false}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Wireframe cage */}
        <Sphere args={[1.45, 24, 24]}>
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.06}
            wireframe
          />
        </Sphere>
      </Float>
    </>
  );
}

/* ─── Error boundary so a WebGL failure never takes down the page ─── */
class CanvasBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null; // fall back to the glow halo only
    return this.props.children;
  }
}

/* ─── Exported component ─── */
export default function HeroScene() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ isolation: "isolate" }}
    >
      {/* Glow halo behind the orb */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 0 }}
      >
        <div
          className="w-[340px] h-[340px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.32) 0%, rgba(139,92,246,0.18) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Three.js canvas */}
      <CanvasBoundary>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 4], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Suspense fallback={null}>
            <OrbInner />
          </Suspense>
        </Canvas>
      </CanvasBoundary>
    </div>
  );
}
