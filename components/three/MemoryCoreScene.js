"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Environment,
  MeshDistortMaterial,
  Icosahedron,
  Html,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CHANNELS = ["SMS", "Voice", "Email", "Chat"];
const ACCENT = "#c6f24e";

function Core() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.18;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
  });

  return (
    <group ref={ref}>
      {/* solid distorted core */}
      <Icosahedron args={[1.15, 6]}>
        <MeshDistortMaterial
          color="#16161c"
          roughness={0.35}
          metalness={0.55}
          distort={0.32}
          speed={1.4}
          emissive={ACCENT}
          emissiveIntensity={0.06}
        />
      </Icosahedron>

      {/* wireframe shell */}
      <Icosahedron args={[1.45, 2]}>
        <meshBasicMaterial
          color={ACCENT}
          wireframe
          transparent
          opacity={0.16}
        />
      </Icosahedron>
    </group>
  );
}

function ChannelNode({ index, count }) {
  const ref = useRef();
  const radius = 2.6;
  const phase = (index / count) * Math.PI * 2;
  const tilt = index % 2 === 0 ? 0.35 : -0.35;

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.35 + phase;
    if (!ref.current) return;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 1.0) * radius * tilt,
      Math.sin(t) * radius
    );
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>
      <Html center distanceFactor={9} zIndexRange={[10, 0]}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 13,
            letterSpacing: "0.04em",
            color: "#f5f3ee",
            background: "rgba(11,11,15,0.7)",
            padding: "2px 8px",
            borderRadius: 999,
            border: "1px solid #232329",
            whiteSpace: "nowrap",
            transform: "translateY(-22px)",
            pointerEvents: "none",
          }}
        >
          {CHANNELS[index]}
        </span>
      </Html>
    </group>
  );
}

function OrbitLines() {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * 2.6, 0, Math.sin(a) * 2.6));
    }
    return pts;
  }, []);

  const geo = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  );

  return (
    <lineLoop geometry={geo}>
      <lineBasicMaterial color={ACCENT} transparent opacity={0.12} />
    </lineLoop>
  );
}

function PointerRig({ children }) {
  const ref = useRef();
  const { viewport } = useThree();
  useFrame((state) => {
    if (!ref.current) return;
    const x = (state.pointer.x * viewport.width) / 18;
    const y = (state.pointer.y * viewport.height) / 18;
    ref.current.rotation.y += (x - ref.current.rotation.y) * 0.04;
    ref.current.rotation.x += (-y - ref.current.rotation.x) * 0.04;
  });
  return <group ref={ref}>{children}</group>;
}

export default function MemoryCoreScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 5]} intensity={1.1} />
      <pointLight position={[-5, -3, -4]} intensity={30} color={ACCENT} />

      <PointerRig>
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
          <Core />
        </Float>
        <OrbitLines />
        {CHANNELS.map((_, i) => (
          <ChannelNode key={i} index={i} count={CHANNELS.length} />
        ))}
      </PointerRig>

      <Environment preset="city" />
    </Canvas>
  );
}
