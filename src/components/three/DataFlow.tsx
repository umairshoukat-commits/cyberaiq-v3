import { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { generateNodePositions, generateEdges } from "./NetworkGraph";

extend({ MeshLineGeometry, MeshLineMaterial });

const SPARK_COUNT = 7;

function SparkLine({
  from,
  to,
  speed,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  speed: number;
}) {
  const matRef = useRef<InstanceType<typeof MeshLineMaterial>>(null);
  const points = useMemo(
    () => [from.x, from.y, from.z, to.x, to.y, to.z],
    [from, to]
  );
  const resolution = useMemo(
    () => new THREE.Vector2(window.innerWidth, window.innerHeight),
    []
  );

  useFrame(() => {
    if (matRef.current) {
      matRef.current.dashOffset -= speed;
    }
  });

  return (
    <mesh>
      {/* @ts-expect-error meshline R3F extend */}
      <meshLineGeometry points={points} />
      {/* @ts-expect-error meshline R3F extend */}
      <meshLineMaterial
        ref={matRef}
        lineWidth={0.012}
        color={new THREE.Color(0, 0.8, 1.4)}
        transparent
        depthTest={false}
        toneMapped={false}
        dashArray={0.05}
        dashRatio={0.92}
        dashOffset={0}
        resolution={resolution}
      />
    </mesh>
  );
}

export default function DataFlow() {
  const { sparkEdges } = useMemo(() => {
    const positions = generateNodePositions();
    const edges = generateEdges(positions);

    // Pick random edges for sparklines
    const shuffled = [...edges].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, SPARK_COUNT);

    return {
      sparkEdges: selected.map(([a, b]) => ({
        from: positions[a],
        to: positions[b],
        speed: 0.002 + Math.random() * 0.003,
      })),
    };
  }, []);

  return (
    <group>
      {sparkEdges.map((spark, i) => (
        <SparkLine key={i} from={spark.from} to={spark.to} speed={spark.speed} />
      ))}
    </group>
  );
}
