"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, RoundedBox, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function SceneCore() {
  const rig = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, pointer.x * 0.35, 0.06);
      rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -pointer.y * 0.25, 0.06);
      rig.current.position.y = Math.sin(clock.elapsedTime * 0.65) * 0.08;
    }

    if (ring.current) {
      ring.current.rotation.z += 0.0032;
      ring.current.rotation.x = Math.sin(clock.elapsedTime * 0.4) * 0.25;
    }
  });

  return (
    <group ref={rig}>
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.8}>
        <RoundedBox args={[2.4, 1.5, 0.12]} radius={0.08} smoothness={6} position={[0, 0, 0]}>
          <MeshTransmissionMaterial
            thickness={0.82}
            roughness={0.08}
            anisotropy={0.9}
            clearcoat={1}
            chromaticAberration={0.03}
            distortion={0.1}
            distortionScale={0.22}
            color="#f1efea"
          />
        </RoundedBox>
      </Float>

      <Float speed={1.6} rotationIntensity={0.35} floatIntensity={1.2}>
        <mesh ref={ring} position={[0.65, 0.1, 0.2]}>
          <torusKnotGeometry args={[0.48, 0.14, 180, 24]} />
          <meshPhysicalMaterial
            color="#0f8a6c"
            metalness={0.94}
            roughness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.12}
            reflectivity={1}
          />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.22} floatIntensity={0.9}>
        <mesh position={[-0.78, -0.28, 0.3]}>
          <octahedronGeometry args={[0.33, 1]} />
          <meshStandardMaterial color="#d6d3d1" metalness={0.55} roughness={0.28} />
        </mesh>
      </Float>

      <Sparkles count={80} scale={[5.2, 3.6, 3.6]} size={2.2} speed={0.45} color="#0f8a6c" />
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-[2.1rem] border border-white/20 bg-black/35 shadow-glow backdrop-blur-2xl sm:h-[520px]">
      <Canvas camera={{ position: [0, 0, 4.4], fov: 42 }} dpr={[1, 1.6]} shadows>
        <color attach="background" args={["#0a0b0d"]} />
        <fog attach="fog" args={["#0a0b0d", 6, 10]} />
        <ambientLight intensity={0.45} />
        <spotLight position={[2.8, 3.2, 2.4]} intensity={3.4} angle={0.45} penumbra={1} color="#f7f7f4" castShadow />
        <pointLight position={[-2.2, -1.2, 2]} intensity={2.8} color="#0f8a6c" />
        <SceneCore />
        <Environment preset="city" />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(255,255,255,0.2),transparent_34%),radial-gradient(circle_at_80%_82%,rgba(15,138,108,0.27),transparent_44%)]" />
    </div>
  );
}
