/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain. All rights reserved.
 * https://github.com/jainrakshit24
 */
import { useMemo, useRef, useState, type ReactNode } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { RoundedBox, Html, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "@tanstack/react-router";
import { PALETTE } from "@/lib/toy";
import { sceneFor, type SceneState } from "./sceneStates";

const CLEAN_COLORS = [PALETTE.coral, PALETTE.sunny, PALETTE.mint, PALETTE.sky, PALETTE.grape];
const RAW_COLORS = ["#B9A98F", "#9AA6B2", "#C98F6B", "#8E9B7B", "#A98FB9"];

/* ------------ hoverable part wrapper ------------ */
function Part({
  children,
  label,
  to,
  position = [0, 0, 0],
  interactive = true,
}: {
  children: ReactNode;
  label?: string;
  to?: string;
  position?: [number, number, number];
  interactive?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  useFrame((_, dt) => {
    if (!group.current) return;
    const targetY = position[1] + (hovered ? 0.1 : 0);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 8, dt);
  });

  return (
    <group
      ref={group}
      position={position}
      {...(interactive
        ? {
            onPointerOver: (e: ThreeEvent<PointerEvent>) => {
              e.stopPropagation();
              setHovered(true);
            },
            onPointerOut: () => setHovered(false),
          }
        : {})}
      {...(to
        ? {
            onClick: (e: ThreeEvent<MouseEvent>) => {
              e.stopPropagation();
              navigate({ to });
            },
          }
        : {})}
    >
      {children}
      {hovered && label && (
        <Html center distanceFactor={9} position={[0, 0.7, 0]} zIndexRange={[20, 0]}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              background: PALETTE.sunny,
              border: `2px solid ${PALETTE.ink}`,
              borderRadius: 999,
              padding: "2px 8px",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        </Html>
      )}
    </group>
  );
}

function Flat({
  color,
  args,
  radius = 0.08,
}: {
  color: string;
  args: [number, number, number];
  radius?: number;
}) {
  return (
    <RoundedBox args={args} radius={Math.min(radius, Math.min(...args) / 2.1)} smoothness={3} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={0.75} metalness={0} />
    </RoundedBox>
  );
}

/* ------------ one travelling data cube ------------ */
const BELT_START = -2.2;
const BELT_END = 2.0;

function DataCube({
  offset,
  speedRef,
  lane,
  clumsy,
  duck,
  onArrive,
}: {
  offset: number;
  speedRef: React.MutableRefObject<number>;
  lane: number;
  clumsy: boolean;
  duck: boolean;
  onArrive: (lane: number) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const t = useRef(offset);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const fell = useRef(false);
  const vy = useRef(0);
  const arrived = useRef(false);
  const rawColor = useMemo(() => RAW_COLORS[Math.floor(Math.random() * RAW_COLORS.length)]!, []);
  const cleanColor = useMemo(() => CLEAN_COLORS[lane % CLEAN_COLORS.length]!, [lane]);

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const step = Math.min(dt, 0.05) * 0.16 * speedRef.current;
    t.current += step;

    if (t.current >= 1) {
      t.current = 0;
      fell.current = false;
      arrived.current = false;
      vy.current = 0;
      g.scale.set(1, 1, 1);
    }
    const p = t.current;

    if (fell.current) {
      vy.current -= 9.8 * dt;
      g.position.y += vy.current * dt;
      if (g.position.y < 0.18) {
        g.position.y = 0.18;
        vy.current = Math.abs(vy.current) * 0.45;
        if (vy.current < 0.4) vy.current = 0;
      }
      g.position.x += dt * 0.3;
      g.rotation.z += dt * 1.5;
      if (mat.current) mat.current.color.set(rawColor);
      return;
    }

    if (p < 0.12) {
      // chute + funnel drop
      const k = p / 0.12;
      g.position.set(BELT_START - 0.3 + k * 0.3, 3.1 - k * 2.35, 0);
      g.rotation.set(k * 3, k * 2, k * 1.4);
      if (mat.current) mat.current.color.set(rawColor);
    } else {
      const k = (p - 0.12) / 0.73;
      const clean = p > 0.47;
      if (mat.current) mat.current.color.set(clean ? cleanColor : rawColor);
      const laneZ = p > 0.62 ? (lane - 1) * 0.42 * Math.min(1, (p - 0.62) / 0.12) : 0;

      if (p < 0.85) {
        g.position.set(BELT_START + k * (BELT_END - BELT_START), 0.78, laneZ);
        g.rotation.set(0, 0, 0);
        // stamp squash
        const s = Math.max(0, 1 - Math.abs(p - 0.45) / 0.03);
        g.scale.set(1 + s * 0.35, 1 - s * 0.55, 1 + s * 0.35);
        if (mat.current) {
          mat.current.emissive.set("#ffffff");
          mat.current.emissiveIntensity = s * 0.9;
        }
        if (clumsy && p > 0.55 && p < 0.57) {
          fell.current = true;
          vy.current = 0.6;
        }
      } else {
        const q = (p - 0.85) / 0.15;
        g.position.set(BELT_END + q * 0.55, 0.78 + Math.sin(q * Math.PI) * 0.5 - q * 0.1, laneZ);
        g.rotation.set(q * 2, 0, 0);
        if (!arrived.current && q > 0.9) {
          arrived.current = true;
          onArrive(lane);
        }
      }
    }
  });

  return (
    <group ref={ref}>
      {duck ? (
        <mesh castShadow>
          <sphereGeometry args={[0.17, 12, 10]} />
          <meshStandardMaterial ref={mat} color={PALETTE.sunny} roughness={0.5} />
        </mesh>
      ) : (
        <RoundedBox args={[0.28, 0.28, 0.28]} radius={0.06} smoothness={3} castShadow>
          <meshStandardMaterial ref={mat} color={rawColor} roughness={0.6} />
        </RoundedBox>
      )}
    </group>
  );
}

/* ------------ conveyor ------------ */
function Conveyor({ speedRef }: { speedRef: React.MutableRefObject<number> }) {
  const rollers = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    rollers.current?.children.forEach((c) => {
      c.rotation.z -= dt * 3 * speedRef.current;
    });
  });
  return (
    <group>
      <Part label="CONVEYOR" position={[0, 0.55, 0]} interactive>
        <Flat color={PALETTE.sand} args={[4.8, 0.16, 1.5]} radius={0.07} />
      </Part>
      <group ref={rollers}>
        {Array.from({ length: 9 }).map((_, i) => (
          <mesh key={i} position={[-2.2 + i * 0.55, 0.42, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.11, 0.11, 1.45, 12]} />
            <meshStandardMaterial color={PALETTE.ink} roughness={0.5} />
          </mesh>
        ))}
      </group>
      {[-0.78, 0.78].map((z) => (
        <mesh key={z} position={[0, 0.25, z]} castShadow>
          <boxGeometry args={[4.8, 0.5, 0.12]} />
          <meshStandardMaterial color={PALETTE.ink} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------ stamping arm ------------ */
function Stamp({ speedRef }: { speedRef: React.MutableRefObject<number> }) {
  const head = useRef<THREE.Group>(null);
  const clock = useRef(0);
  useFrame((_, dt) => {
    clock.current += dt * speedRef.current * 2.2;
    const s = Math.max(0, Math.sin(clock.current));
    if (head.current) head.current.position.y = 1.5 - s * 0.62;
  });
  return (
    <group position={[0.4, 0, 0]}>
      <Part label="TRANSFORM → SKILLS" to="/skills" position={[0, 0, 0]}>
        <group>
          <mesh position={[0, 1.1, -0.7]} castShadow>
            <boxGeometry args={[0.28, 2.1, 0.28]} />
            <meshStandardMaterial color={PALETTE.coral} roughness={0.7} />
          </mesh>
          <mesh position={[0, 2.05, -0.3]} castShadow>
            <boxGeometry args={[0.24, 0.24, 1]} />
            <meshStandardMaterial color={PALETTE.coral} roughness={0.7} />
          </mesh>
        </group>
      </Part>
      <group ref={head} position={[0, 1.5, 0]}>
        <RoundedBox args={[0.6, 0.5, 0.6]} radius={0.1} smoothness={3} castShadow>
          <meshStandardMaterial color={PALETTE.grape} roughness={0.5} />
        </RoundedBox>
      </group>
    </group>
  );
}

/* ------------ sorting gate ------------ */
function Gate() {
  const blade = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (blade.current) blade.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.6) * 0.5;
  });
  return (
    <Part label="VALIDATE" position={[1.35, 0.72, 0]}>
      <group>
        <mesh castShadow>
          <boxGeometry args={[0.16, 0.5, 1.5]} />
          <meshStandardMaterial color={PALETTE.mint} roughness={0.6} />
        </mesh>
        <group ref={blade} position={[0.2, 0.15, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.06, 0.4, 0.9]} />
            <meshStandardMaterial color={PALETTE.ink} />
          </mesh>
        </group>
      </group>
    </Part>
  );
}

/* ------------ output bar chart ------------ */
function BarChart({ counts }: { counts: React.MutableRefObject<number[]> }) {
  const bars = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((_, dt) => {
    bars.current.forEach((b, i) => {
      if (!b) return;
      const target = 0.2 + Math.min(counts.current[i] ?? 0, 8) * 0.22;
      b.scale.y = THREE.MathUtils.damp(b.scale.y, target, 5, dt);
      b.position.y = b.scale.y / 2 + 0.1;
    });
  });
  return (
    <Part label="OUTPUT → WORK" to="/work" position={[2.9, 0, 0]}>
      <group>
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[1.1, 0.1, 1.6]} />
          <meshStandardMaterial color={PALETTE.sand} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            ref={(n) => {
              bars.current[i] = n;
            }}
            position={[0, 0.2, (i - 1) * 0.42]}
            castShadow
          >
            <boxGeometry args={[0.5, 1, 0.3]} />
            <meshStandardMaterial color={[PALETTE.coral, PALETTE.sunny, PALETTE.sky][i]!} roughness={0.55} />
          </mesh>
        ))}
      </group>
    </Part>
  );
}

function StageLabel({ text, position }: { text: string; position: [number, number, number] }) {
  return (
    <Html center position={position} distanceFactor={11} zIndexRange={[10, 0]}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.2em",
          background: PALETTE.paper,
          border: `2px solid ${PALETTE.ink}`,
          borderRadius: 999,
          padding: "2px 7px",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    </Html>
  );
}

/* ------------ island props ------------ */
function Desk({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <Part label="DESK → ABOUT" to="/about" position={[-1.9, 0.35, 1.5]}>
      <group>
        <Flat color={PALETTE.paper} args={[0.9, 0.1, 0.6]} />
        <mesh position={[0, 0.22, -0.1]} rotation={[-0.35, 0, 0]} castShadow>
          <boxGeometry args={[0.5, 0.35, 0.04]} />
          <meshStandardMaterial color={PALETTE.sky} />
        </mesh>
        <mesh position={[0.32, 0.16, 0.15]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.16, 12]} />
          <meshStandardMaterial color={PALETTE.coral} />
        </mesh>
        <mesh position={[-0.33, 0.2, 0.12]} castShadow>
          <sphereGeometry args={[0.13, 10, 8]} />
          <meshStandardMaterial color={PALETTE.mint} />
        </mesh>
      </group>
    </Part>
  );
}

function Mailbox({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <Part label="SAY HI → CONTACT" to="/contact" position={[1.4, 0.5, 1.7]}>
      <group>
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.6, 8]} />
          <meshStandardMaterial color={PALETTE.ink} />
        </mesh>
        <RoundedBox args={[0.5, 0.35, 0.7]} radius={0.14} smoothness={3} castShadow>
          <meshStandardMaterial color={PALETTE.coral} roughness={0.6} />
        </RoundedBox>
      </group>
    </Part>
  );
}

function GradCap({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <Part label="EDUCATION" to="/education" position={[-1.2, 1.4, -1.2]}>
      <group rotation={[0, 0.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.06, 0.7]} />
          <meshStandardMaterial color={PALETTE.ink} />
        </mesh>
        <mesh position={[0, -0.12, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.24, 0.2, 10]} />
          <meshStandardMaterial color={PALETTE.ink} />
        </mesh>
        <mesh position={[0.3, 0, 0.3]} castShadow>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color={PALETTE.sunny} />
        </mesh>
      </group>
    </Part>
  );
}

function Signpost() {
  return (
    <Part label="ABOUT ME" to="/about" position={[-2.6, 0.7, 0.9]}>
      <group>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
          <meshStandardMaterial color={PALETTE.ink} />
        </mesh>
        <mesh position={[0.18, 0.35, 0]} rotation={[0, 0, -0.08]} castShadow>
          <boxGeometry args={[0.6, 0.22, 0.06]} />
          <meshStandardMaterial color={PALETTE.sunny} />
        </mesh>
      </group>
    </Part>
  );
}

function Island({
  position = [0, 0, 0],
  scale = 1,
  color = PALETTE.mint,
}: {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, -0.15, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[3.6, 3.4, 0.5, 8]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
      <mesh position={[0, -1.1, 0]} castShadow>
        <coneGeometry args={[3.3, 1.8, 8]} />
        <meshStandardMaterial color="#8B6B4A" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ------------ camera rig with drag orbit ------------ */
function CameraRig({ scene, allowDrag }: { scene: SceneState; allowDrag: boolean }) {
  const { camera, gl } = useThree();
  const target = useRef(new THREE.Vector3(...scene.target));
  const orbit = useRef({ az: 0, pol: 0, dolly: 0 });
  const drag = useRef<{ x: number; y: number } | null>(null);
  const auto = useRef(0);

  useFrame((_, dt) => {
    auto.current += allowDrag ? 0 : dt * 0.12;
    const base = new THREE.Vector3(...scene.camera);
    const sph = new THREE.Spherical().setFromVector3(base);
    sph.theta += orbit.current.az + auto.current;
    sph.phi = THREE.MathUtils.clamp(sph.phi + orbit.current.pol, 0.35, 1.32);
    sph.radius = THREE.MathUtils.clamp(sph.radius + orbit.current.dolly, 6, 26);
    const desired = new THREE.Vector3().setFromSpherical(sph);
    const t = new THREE.Vector3(...scene.target);
    desired.add(t);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, desired.x, 2.4, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, desired.y, 2.4, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, desired.z, 2.4, dt);
    target.current.lerp(t, 1 - Math.exp(-2.4 * dt));
    camera.lookAt(target.current);
  });

  // pointer + wheel handlers on the canvas element
  useFrame(() => {});
  const el = gl.domElement;
  if (!(el as unknown as { __rigBound?: boolean }).__rigBound) {
    (el as unknown as { __rigBound?: boolean }).__rigBound = true;
    el.addEventListener("pointerdown", (e) => {
      if (!allowDrag) return;
      drag.current = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener("pointerup", () => {
      drag.current = null;
    });
    window.addEventListener("pointermove", (e) => {
      if (!drag.current) return;
      const dx = e.clientX - drag.current.x;
      const dy = e.clientY - drag.current.y;
      drag.current = { x: e.clientX, y: e.clientY };
      orbit.current.az = THREE.MathUtils.clamp(orbit.current.az - dx * 0.005, -1.1, 1.1);
      orbit.current.pol = THREE.MathUtils.clamp(orbit.current.pol - dy * 0.004, -0.35, 0.35);
    });
    el.addEventListener(
      "wheel",
      (e) => {
        const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
        orbit.current.dolly = THREE.MathUtils.clamp(orbit.current.dolly + dy * 0.004, -3, 6);
      },
      { passive: true },
    );
  }
  return null;
}

/* ------------ contact: every particle converges to one bright point ------------ */
function ConvergenceField({ target }: { target: [number, number, number] }) {
  const COUNT = 240;
  const points = useRef<THREE.Points>(null);
  const core = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  const data = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const dirs: THREE.Vector3[] = [];
    const prog: number[] = [];
    const speed: number[] = [];
    for (let i = 0; i < COUNT; i++) {
      dirs.push(new THREE.Vector3().randomDirection());
      prog.push(Math.random());
      speed.push(0.1 + Math.random() * 0.22);
    }
    return { pos, dirs, prog, speed };
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const attr = points.current?.geometry.getAttribute("position") as
      | THREE.BufferAttribute
      | undefined;
    if (!attr) return;
    const R = 8;
    for (let i = 0; i < COUNT; i++) {
      data.prog[i] = (data.prog[i] ?? 0) + dt * (data.speed[i] ?? 0.15);
      if (data.prog[i]! >= 1) {
        data.prog[i] = 0;
        data.dirs[i]!.randomDirection();
      }
      const p = data.prog[i]!;
      const ease = 1 - Math.pow(1 - p, 3); // accelerate toward the core
      const r = R * (1 - ease) + 0.04;
      const d = data.dirs[i]!;
      attr.setXYZ(i, target[0] + d.x * r, target[1] + d.y * r, target[2] + d.z * r);
    }
    attr.needsUpdate = true;
    const pulse = 1 + Math.sin(t * 3) * 0.14;
    if (core.current) core.current.scale.setScalar(pulse);
    if (light.current) light.current.intensity = 2.6 + Math.sin(t * 3) * 0.7;
  });

  return (
    <group>
      <points ref={points} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.pos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color={PALETTE.sunny}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
      <mesh ref={core} position={target}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color={PALETTE.sunny} />
      </mesh>
      <pointLight ref={light} position={target} color={PALETTE.sunny} intensity={2.6} distance={9} />
    </group>
  );
}

/* ------------ the diorama ------------ */

/* ------------ services: cubes assemble a floating browser window ------------ */
type Piece = { pos: [number, number, number]; size: [number, number, number]; color: string; delay: number };
const BROWSER_PIECES: Piece[] = [
  { pos: [0, 0, -0.06], size: [3.6, 2.6, 0.12], color: PALETTE.cream, delay: 0 },
  { pos: [0, 1.12, 0.02], size: [3.6, 0.36, 0.14], color: PALETTE.sand, delay: 0.1 },
  { pos: [-1.55, 1.12, 0.1], size: [0.14, 0.14, 0.06], color: PALETTE.coral, delay: 0.2 },
  { pos: [-1.33, 1.12, 0.1], size: [0.14, 0.14, 0.06], color: PALETTE.sunny, delay: 0.25 },
  { pos: [-1.11, 1.12, 0.1], size: [0.14, 0.14, 0.06], color: PALETTE.mint, delay: 0.3 },
  { pos: [0.3, 1.12, 0.1], size: [2.1, 0.18, 0.05], color: PALETTE.paper, delay: 0.35 },
  { pos: [0, 0.68, 0.06], size: [3.2, 0.28, 0.1], color: PALETTE.ink, delay: 0.6 },
  { pos: [0, 0.08, 0.06], size: [3.2, 0.72, 0.12], color: PALETTE.sky, delay: 0.9 },
  { pos: [-0.82, -0.62, 0.06], size: [1.55, 0.5, 0.12], color: PALETTE.coral, delay: 1.2 },
  { pos: [0.82, -0.62, 0.06], size: [1.55, 0.5, 0.12], color: PALETTE.grape, delay: 1.4 },
  { pos: [0, -1.07, 0.06], size: [3.2, 0.2, 0.1], color: PALETTE.mint, delay: 1.7 },
];
const LOOP = 7.5; // build ~2.5s, hold ~2s, dismantle, pause

function BrowserWindow({ focus }: { focus: boolean }) {
  const root = useRef<THREE.Group>(null);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const source = new THREE.Vector3(2.9, -2, 0.4);
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime % LOOP;
    BROWSER_PIECES.forEach((p, i) => {
      const m = refs.current[i];
      if (!m) return;
      const inT = THREE.MathUtils.clamp((t - p.delay) / 0.7, 0, 1);
      const outT = THREE.MathUtils.clamp((t - 4.8 - p.delay * 0.4) / 0.6, 0, 1);
      const k = (1 - Math.pow(1 - inT, 3)) * (1 - outT * outT);
      m.position.set(
        THREE.MathUtils.lerp(source.x, p.pos[0], k),
        THREE.MathUtils.lerp(source.y, p.pos[1], k) + Math.sin(k * Math.PI) * 0.6,
        THREE.MathUtils.lerp(source.z, p.pos[2], k),
      );
      m.rotation.z = (1 - k) * (i % 2 ? 1.4 : -1.4);
      m.scale.setScalar(Math.max(0.001, 0.35 + 0.65 * k));
    });
    if (root.current) {
      const g = root.current;
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, focus ? 0.28 : 0.05, 2, dt);
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, focus ? 0 : Math.sin(state.clock.elapsedTime * 0.4) * 0.15 - 0.2, 2, dt);
      g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, focus ? 1.35 : 1, 2, dt));
      g.position.y = 3.4 + Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    }
  });
  return (
    <group ref={root} position={[0, 3.4, -0.6]}>
      {BROWSER_PIECES.map((p, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }} castShadow>
          <boxGeometry args={p.size} />
          <meshStandardMaterial color={p.color} roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

export function Diorama({
  pathname,
  quality,
  ducks,
}: {
  pathname: string;
  quality: "high" | "low";
  ducks: boolean;
}) {
  const scene = sceneFor(pathname);
  const speedRef = useRef(scene.speed);
  const counts = useRef([0, 0, 0]);
  const island = useRef<THREE.Group>(null);
  const machine = useRef<THREE.Group>(null);
  const resetAt = useRef(0);

  // Slower, calmer motion on phones and weaker devices (quality === "low").
  speedRef.current = scene.speed * (quality === "low" ? 0.6 : 1);

  const cubes = useMemo(
    () =>
      Array.from({ length: quality === "high" ? 12 : 7 }, (_, i) => ({
        offset: i / (quality === "high" ? 12 : 7),
        lane: i % 3,
        clumsy: i % 5 === 0,
      })),
    [quality],
  );

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (island.current) {
      island.current.position.y = Math.sin(t * 0.6) * 0.12;
      island.current.rotation.z = Math.sin(t * 0.4) * 0.012;
    }
    if (machine.current) {
      const explode = scene.mode === "explode" ? 1 : 0;
      machine.current.rotation.y = THREE.MathUtils.damp(
        machine.current.rotation.y,
        explode ? t * 0.15 : 0,
        1.5,
        dt,
      );
      const s = THREE.MathUtils.damp(machine.current.scale.x, explode ? 1.18 : 1, 2, dt);
      machine.current.scale.setScalar(s);
    }
    if (scene.mode === "mail") {
      // cubes pile toward the mailbox: handled by tilt
      if (island.current) island.current.rotation.z = THREE.MathUtils.damp(island.current.rotation.z, -0.12, 2, dt);
    }
    if (t - resetAt.current > 14) {
      resetAt.current = t;
      counts.current = [0, 0, 0];
    }
  });

  const onArrive = (lane: number) => {
    counts.current[lane] = (counts.current[lane] ?? 0) + 1;
  };

  return (
    <>
      <CameraRig scene={scene} allowDrag={quality === "high"} />
      <ambientLight intensity={0.75} color={PALETTE.cream} />
      <hemisphereLight args={[PALETTE.cream, PALETTE.sand, 0.5]} />
      <directionalLight
        position={[5, 8, 4]}
        intensity={1.5}
        color="#FFE9C9"
        castShadow={quality === "high"}
        shadow-mapSize={[1024, 1024]}
      />

      <group ref={island}>
        <Island />
        {scene.mode === "islands" && (
          <>
            <Island position={[-7.5, -0.4, 1.5]} scale={0.6} color={PALETTE.sunny} />
            <Island position={[7.5, -0.4, -1.5]} scale={0.6} color={PALETTE.sky} />
            <mesh position={[-4.4, -0.2, 0.75]} castShadow>
              <boxGeometry args={[3.4, 0.1, 0.5]} />
              <meshStandardMaterial color={PALETTE.sand} />
            </mesh>
            <mesh position={[4.4, -0.2, -0.75]} castShadow>
              <boxGeometry args={[3.4, 0.1, 0.5]} />
              <meshStandardMaterial color={PALETTE.sand} />
            </mesh>
          </>
        )}

        <group ref={machine} position={[0, 0.1, 0]}>
          {/* chute + funnel */}
          <Part label="INGEST" position={[-2.7, 1.9, 0]}>
            <group>
              <mesh castShadow rotation={[0, 0, 0.35]}>
                <boxGeometry args={[1.2, 0.12, 0.9]} />
                <meshStandardMaterial color={PALETTE.sky} />
              </mesh>
              <mesh position={[0.4, -0.7, 0]} castShadow>
                <cylinderGeometry args={[0.55, 0.22, 0.7, 10, 1, true]} />
                <meshStandardMaterial color={PALETTE.sunny} side={THREE.DoubleSide} roughness={0.6} />
              </mesh>
            </group>
          </Part>

          <Conveyor speedRef={speedRef} />
          <Stamp speedRef={speedRef} />
          <Gate />
          <BarChart counts={counts} />

          {cubes.map((c, i) => (
            <DataCube
              key={i}
              offset={c.offset}
              lane={c.lane}
              clumsy={c.clumsy}
              duck={ducks}
              speedRef={speedRef}
              onArrive={onArrive}
            />
          ))}

          <StageLabel text="INGEST" position={[-2.6, 2.8, 0]} />
          <StageLabel text="TRANSFORM" position={[0.4, 2.4, 0]} />
          <StageLabel text="VALIDATE" position={[1.4, 1.7, 0]} />
          <StageLabel text="LOAD" position={[2.9, 1.9, 0]} />
        </group>

        <Signpost />
        <Desk visible={scene.mode === "desk" || scene.mode === "run"} />
        <Mailbox visible={scene.mode === "mail" || scene.mode === "run"} />
        <GradCap visible={scene.mode === "school"} />
      </group>

      {(scene.mode === "web" || scene.mode === "webFocus") && <BrowserWindow focus={scene.mode === "webFocus"} />}

      {scene.mode === "mail" && <ConvergenceField target={scene.target} />}

      {quality === "high" && (
        <ContactShadows position={[0, -0.38, 0]} opacity={0.35} scale={14} blur={2.4} far={6} />
      )}
    </>
  );
}
