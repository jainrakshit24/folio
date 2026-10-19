/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { ContactShadows, RoundedBox, Text } from "@react-three/drei";
import { CuboidCollider, Physics, RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { forwardRef, Suspense, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { PALETTE, pop } from "@/lib/toy";

export const SKILLS = [
  "PYTHON", "SQL", "ETL", "PANDAS", "NUMPY", "POWER BI", "POSTGRESQL", "MYSQL", "XGBOOST", "SCIKIT-LEARN",
  "OPTUNA", "SHAP", "LIME", "STREAMLIT", "PLAYWRIGHT", "PYTEST", "POSTMAN", "JENKINS", "GITHUB ACTIONS", "JIRA",
  "GIT", "MATPLOTLIB", "SEABORN", "EXCEL", "C++", "JAVASCRIPT", "DATA QUALITY", "INDEXING", "PARTITIONING", "EDA",
];
export const CUBE_COLORS = [PALETTE.coral, PALETTE.sunny, PALETTE.mint, PALETTE.sky, PALETTE.grape];

const W = 11, D = 6, H = 9, S = 1.05;

export type SandboxHandle = { shake: () => void };
type Props = {
  count: number;
  lowEnd: boolean;
  gravityOff: boolean;
  active: boolean;
  onThrow: () => void;
  setCursor: (label: string) => void;
};

type CubeProps = {
  i: number; label: string; color: string;
  bodies: React.MutableRefObject<(RapierRigidBody | null)[]>;
  drag: React.MutableRefObject<{ i: number; target: THREE.Vector3 } | null>;
  onGrab: (i: number, e: ThreeEvent<PointerEvent>) => void;
  setCursor: (l: string) => void;
};

function Cube({ i, label, color, bodies, drag, onGrab, setCursor }: CubeProps) {
  const mesh = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const [hover, setHover] = useState(false);
  const squash = useRef(0);
  const lastPop = useRef(0);
  const base = useMemo(() => new THREE.Color(color), [color]);
  const bright = useMemo(() => new THREE.Color(color).lerp(new THREE.Color("#ffffff"), 0.25), [color]);
  const start = useMemo(
    () => [(Math.random() - 0.5) * (W - 3), 5 + i * 0.35, (Math.random() - 0.5) * (D - 2)] as [number, number, number],
    [i],
  );
  const rot = useMemo(() => [Math.random() * 3, Math.random() * 3, Math.random() * 3] as [number, number, number], []);

  useFrame((_, dt) => {
    squash.current = Math.max(0, squash.current - dt * 6);
    const s = squash.current;
    const lift = hover && drag.current?.i !== i ? 0.08 : 0;
    if (mesh.current) {
      mesh.current.scale.set(1 + s * 0.15, 1 - s * 0.15, 1 + s * 0.15);
      mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, lift, 0.2);
    }
    mat.current?.color.lerp(hover ? bright : base, 0.2);
    const d = drag.current;
    const b = bodies.current[i];
    if (d && d.i === i && b) {
      const p = b.translation();
      const v = new THREE.Vector3(d.target.x - p.x, d.target.y - p.y, d.target.z - p.z).multiplyScalar(14);
      v.clampLength(0, 22);
      b.setLinvel(v, true);
      b.setAngvel({ x: b.angvel().x * 0.9, y: b.angvel().y * 0.9, z: b.angvel().z * 0.9 }, true);
    }
  });

  const faces: [number, number, number, number, number, number][] = [
    [0, 0, S / 2 + 0.002, 0, 0, 0], [0, 0, -S / 2 - 0.002, 0, Math.PI, 0],
    [0, S / 2 + 0.002, 0, -Math.PI / 2, 0, 0], [S / 2 + 0.002, 0, 0, 0, Math.PI / 2, 0],
  ];

  return (
    <RigidBody
      ref={(r) => { bodies.current[i] = r; }}
      position={start} rotation={rot} colliders="cuboid"
      restitution={0.35} friction={0.8} linearDamping={0.6} angularDamping={0.8}
      onContactForce={(e) => {
        const f = e.totalForceMagnitude;
        if (f > 180) {
          squash.current = Math.min(1, f / 900);
          const now = performance.now();
          if (now - lastPop.current > 180 && now - globalPop.t > 60) {
            lastPop.current = now; globalPop.t = now;
            pop(420 + Math.min(f, 1500) / 6);
          }
        }
      }}
    >
      <group
        ref={mesh}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); if (!drag.current) setCursor("GRAB ME"); }}
        onPointerOut={() => { setHover(false); if (!drag.current) setCursor(""); }}
        onPointerDown={(e) => onGrab(i, e)}
      >
        <RoundedBox args={[S, S, S]} radius={0.08} smoothness={3}>
          <meshStandardMaterial ref={mat} color={color} roughness={1} metalness={0} />
        </RoundedBox>
        {faces.map(([x, y, z, rx, ry, rz], k) => (
          <Text key={k} position={[x, y, z]} rotation={[rx, ry, rz]} fontSize={0.15} maxWidth={0.9}
            textAlign="center" anchorX="center" anchorY="middle" color={PALETTE.ink}
            letterSpacing={0.02} lineHeight={1}>
            {label}
          </Text>
        ))}
      </group>
    </RigidBody>
  );
}
const globalPop = { t: 0 };

function World({ count, lowEnd, onThrow, setCursor, shakeRef }: Props & { shakeRef: React.MutableRefObject<() => void> }) {
  const bodies = useRef<(RapierRigidBody | null)[]>([]);
  const drag = useRef<{ i: number; target: THREE.Vector3; y: number } | null>(null);
  const { camera, gl, pointer, raycaster } = useThree();
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);

  const cubes = useMemo(
    () => Array.from({ length: count }, (_, i) => ({ label: SKILLS[i % SKILLS.length]!, color: CUBE_COLORS[i % CUBE_COLORS.length]! })),
    [count],
  );

  shakeRef.current = () => {
    bodies.current.forEach((b) => {
      if (!b) return;
      const m = b.mass();
      b.applyImpulse({ x: (Math.random() - 0.5) * 8 * m, y: (4 + Math.random() * 5) * m, z: (Math.random() - 0.5) * 5 * m }, true);
      b.applyTorqueImpulse({ x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5 }, true);
    });
  };

  const onGrab = (i: number, e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const b = bodies.current[i];
    if (!b) return;
    if (e.nativeEvent.pointerType !== "mouse") {
      const m = b.mass();
      b.applyImpulse({ x: (Math.random() - 0.5) * 4 * m, y: 7 * m, z: (Math.random() - 0.5) * 3 * m }, true);
      b.applyTorqueImpulse({ x: Math.random() - 0.5, y: Math.random() - 0.5, z: 0 }, true);
      onThrow();
      return;
    }
    const y = Math.max(b.translation().y + 0.8, 1.6);
    drag.current = { i, target: new THREE.Vector3().copy(b.translation() as THREE.Vector3).setY(y), y };
    setCursor("THROW IT");
    gl.domElement.setPointerCapture?.(e.nativeEvent.pointerId);
  };

  useEffect(() => {
    const up = () => {
      const d = drag.current;
      if (!d) return;
      const b = bodies.current[d.i];
      drag.current = null;
      setCursor("");
      if (b) {
        const v = b.linvel();
        if (Math.hypot(v.x, v.y, v.z) > 3.5) onThrow();
      }
    };
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => { window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up); };
  }, [onThrow, setCursor]);

  useFrame(() => {
    const d = drag.current;
    if (!d) return;
    plane.constant = -d.y;
    raycaster.setFromCamera(pointer, camera);
    const hit = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, hit)) {
      hit.x = THREE.MathUtils.clamp(hit.x, -W / 2 + 0.7, W / 2 - 0.7);
      hit.z = THREE.MathUtils.clamp(hit.z, -D / 2 + 0.7, D / 2 - 0.7);
      d.target.copy(hit);
    }
  });

  return (
    <>
      <RigidBody type="fixed" restitution={0.35} friction={0.9}>
        <CuboidCollider args={[W / 2, 0.25, D / 2]} position={[0, -0.25, 0]} />
        <CuboidCollider args={[0.25, H, D / 2]} position={[-W / 2 - 0.25, H, 0]} />
        <CuboidCollider args={[0.25, H, D / 2]} position={[W / 2 + 0.25, H, 0]} />
        <CuboidCollider args={[W / 2, H, 0.25]} position={[0, H, -D / 2 - 0.25]} />
        <CuboidCollider args={[W / 2, H, 0.25]} position={[0, H, D / 2 + 0.25]} />
        <CuboidCollider args={[W / 2, 0.25, D / 2]} position={[0, H * 2, 0]} />
      </RigidBody>
      <mesh rotation-x={-Math.PI / 2} position-y={0.001}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color={PALETTE.sand} roughness={1} />
      </mesh>
      {cubes.map((c, i) => (
        <Cube key={i} i={i} label={c.label} color={c.color} bodies={bodies}
          drag={drag as CubeProps["drag"]} onGrab={onGrab} setCursor={setCursor} />
      ))}
      {!lowEnd && <ContactShadows position={[0, 0.01, 0]} scale={[W, D]} opacity={0.45} blur={2.2} far={3} frames={Infinity} resolution={512} />}
    </>
  );
}

export const Sandbox = forwardRef<SandboxHandle, Props & { resetKey: number }>(function Sandbox(props, ref) {
  const shakeRef = useRef<() => void>(() => {});
  useImperativeHandle(ref, () => ({ shake: () => shakeRef.current() }), []);
  return (
    <Canvas
      frameloop={props.active ? "always" : "never"}
      dpr={[1, props.lowEnd ? 1.5 : 2]}
      camera={{ position: [0, 9.5, 9], fov: 42 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.5, 0)}
      gl={{ antialias: !props.lowEnd, alpha: true }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 10, 5]} intensity={1.6} color="#fff1dc" />
      <Suspense fallback={null}>
        <Physics
          key={props.resetKey}
          gravity={props.gravityOff ? [0, 0, 0] : [0, -18, 0]}
          paused={!props.active}
          timeStep={props.lowEnd ? 1 / 40 : 1 / 60}
        >
          <World {...props} shakeRef={shakeRef} />
        </Physics>
      </Suspense>
    </Canvas>
  );
});

export default Sandbox;
