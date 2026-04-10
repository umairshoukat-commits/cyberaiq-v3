import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import NetworkGraph from "./NetworkGraph";
import DataFlow from "./DataFlow";
import Effects from "./Effects";

function DustParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 250;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 12;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01 * delta;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.15} />
    </points>
  );
}

export default function HeroScene() {
  const dpr = typeof window !== "undefined" ? Math.min(1.5, window.devicePixelRatio) : 1;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0.3, 10], fov: 42 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          toneMapping: THREE.NoToneMapping,
        }}
        frameloop="always"
      >
        {/* No background — canvas is transparent so hero-bg.jpg shows through */}
        <fog attach="fog" args={["#0A0A0F", 12, 35]} />
        <Suspense fallback={null}>
          <NetworkGraph />
          <DataFlow />
          <DustParticles />
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
}
