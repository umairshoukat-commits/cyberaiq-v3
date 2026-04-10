import { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

extend({ MeshLineGeometry, MeshLineMaterial });

const NODE_COUNT = 24;
const SPHERE_RADIUS = 3.0;
const EDGE_THRESHOLD = 2.8;
const PHI = Math.PI * (3 - Math.sqrt(5));
const ACCENT_INDICES = new Set<number>();
const X_STRETCH = 1.5;
const Z_STRETCH = 1.3;

function generateNodePositions(): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = PHI * i;
    positions.push(
      new THREE.Vector3(
        Math.cos(theta) * radius * SPHERE_RADIUS * X_STRETCH,
        y * SPHERE_RADIUS - 1.5,
        Math.sin(theta) * radius * SPHERE_RADIUS * Z_STRETCH
      )
    );
  }
  return positions;
}

function generateEdges(positions: THREE.Vector3[]): [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      if (positions[i].distanceTo(positions[j]) < EDGE_THRESHOLD) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
}

function EdgeLine({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const points = useMemo(() => [from.x, from.y, from.z, to.x, to.y, to.z], [from, to]);
  const resolution = useMemo(() => new THREE.Vector2(window.innerWidth, window.innerHeight), []);
  return (
    <mesh>
      {/* @ts-expect-error meshline R3F extend */}
      <meshLineGeometry points={points} />
      {/* @ts-expect-error meshline R3F extend */}
      <meshLineMaterial
        lineWidth={0.008}
        color={new THREE.Color(0.15, 0.4, 0.8)}
        opacity={0.25}
        transparent
        depthTest={false}
        toneMapped={false}
        resolution={resolution}
      />
    </mesh>
  );
}

export default function NetworkGraph() {
  const groupRef = useRef<THREE.Group>(null);

  const { positions, edges } = useMemo(() => {
    const pos = generateNodePositions();
    const edg = generateEdges(pos);
    return { positions: pos, edges: edg };
  }, []);

  const geo = useMemo(() => new THREE.IcosahedronGeometry(0.06, 1), []);
  const hubGeo = useMemo(() => new THREE.IcosahedronGeometry(0.09, 1), []);
  const hubIndices = new Set([3, 11, 19]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.1;
    }
    const cam = state.camera;
    cam.position.set(cam.position.x, 0.3 + Math.sin(t * 0.25) * 0.15, 9.5 + Math.sin(t * 0.15) * 0.4);
    cam.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      {/* Nodes — MeshBasicMaterial + HDR color for clean bloom */}
      {positions.map((pos, i) => {
        const isHub = hubIndices.has(i);
        return (
          <mesh key={i} position={pos} geometry={isHub ? hubGeo : geo}>
            <meshBasicMaterial
              color={isHub ? [0.8, 1.2, 2.0] : [0.5, 0.8, 1.5]}
              toneMapped={false}
            />
          </mesh>
        );
      })}

      {/* MeshLine edges */}
      {edges.map(([a, b], i) => (
        <EdgeLine key={i} from={positions[a]} to={positions[b]} />
      ))}
    </group>
  );
}

export { generateNodePositions, generateEdges };
