"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Orb() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;

    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.25) * 0.25 + pointer.y * 0.2;
    mesh.current.rotation.y += 0.003 + pointer.x * 0.0015;

    const scale = 1 + Math.sin(clock.elapsedTime * 1.2) * 0.03;
    mesh.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.35, 24]} />
      <MeshTransmissionMaterial
        thickness={0.8}
        roughness={0.16}
        chromaticAberration={0.05}
        distortion={0.14}
        distortionScale={0.22}
        temporalDistortion={0.08}
        clearcoat={1}
        anisotropy={0.5}
        color="#d6d3d1"
      />
    </mesh>
  );
}

export function HeroOrb() {
  return (
    <div className="relative h-[430px] w-full overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/5 shadow-glow backdrop-blur-xl sm:h-[520px]">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[2, 4, 2]} intensity={3} color="#f7f7f5" />
        <pointLight position={[-2, -1, 2]} intensity={2.2} color="#0f8a6c" />
        <Orb />
        <Environment preset="city" />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.16),transparent_45%),radial-gradient(circle_at_20%_85%,rgba(15,138,108,0.22),transparent_35%)]" />
    </div>
  );
}
