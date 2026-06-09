"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  IcosahedronGeometry,
  TorusKnotGeometry,
  type BufferGeometry,
  type Mesh,
} from "three";

/* ── single wireframe geometry ── */
function WireframeShape({
  geometry,
  position,
  rotation,
  scale,
  color,
  speed,
}: {
  geometry: BufferGeometry;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}) {
  const ref = useRef<Mesh>(null!);

  useFrame((_state, delta) => {
    ref.current.rotation.x += delta * speed * 0.3;
    ref.current.rotation.y += delta * speed * 0.5;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <primitive object={geometry} attach="geometry" />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
    </mesh>
  );
}

/* ── scene ── */
function Scene() {
  const shapes = useMemo(() => {
    const geoIco = new IcosahedronGeometry(1, 0);
    const geoTorus = new TorusKnotGeometry(0.7, 0.2, 64, 8, 2, 3);

    const items: Array<{
      geometry: BufferGeometry;
      position: [number, number, number];
      rotation: [number, number, number];
      scale: number;
      color: string;
      speed: number;
    }> = [];

    const colors = ["#00ff88", "#00d4ff", "#00cc6a", "#0099cc"];
    for (let i = 0; i < 35; i++) {
      const isIco = Math.random() > 0.4;
      items.push({
        geometry: isIco ? geoIco : geoTorus,
        position: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 4 - 2,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: 0.3 + Math.random() * 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.3 + Math.random() * 1.5,
      });
    }
    return items;
  }, []);

  return (
    <>
      {shapes.map((s, i) => (
        <WireframeShape key={i} {...s} />
      ))}
    </>
  );
}

/* ── exported wrapper ── */
export function ParticleField() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <Scene />
      </Canvas>
    </div>
  );
}