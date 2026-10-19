/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain. All rights reserved.
 * https://github.com/jainrakshit24
 */
import { prefersReducedMotion } from "@/lib/toy";
import { useEffect, useState } from "react";

const NODES: [number, number][] = [
  [60, 60], [200, 40], [340, 90], [120, 170], [270, 200], [420, 180], [80, 280], [230, 310], [380, 290], [480, 60],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [2, 5], [3, 6], [6, 7], [4, 7], [7, 8], [5, 8], [2, 9], [5, 9],
];
const PATHS = [
  [0, 1, 2, 5, 8],
  [6, 3, 4, 7, 8],
  [0, 3, 4, 5, 9],
  [6, 7, 4, 2, 9],
];

/** Slow-looping schema graph: a pulse travels along one path at a time. */
export function SchemaGraph({ className }: { className?: string }) {
  const [k, setK] = useState(0);
  const [still, setStill] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) return setStill(true);
    const id = setInterval(() => setK((v) => (v + 1) % PATHS.length), 3600);
    return () => clearInterval(id);
  }, []);
  const path = PATHS[k]!;
  const d = path.map((n, i) => `${i ? "L" : "M"}${NODES[n]![0]} ${NODES[n]![1]}`).join(" ");
  return (
    <svg viewBox="0 0 540 360" className={className} aria-hidden="true" fill="none">
      {EDGES.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={NODES[a]![0]} y1={NODES[a]![1]} x2={NODES[b]![0]} y2={NODES[b]![1]} stroke="var(--sky)" strokeOpacity="0.35" strokeWidth="2" />
      ))}
      <path key={k} d={d} stroke="var(--mint)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1200" strokeDashoffset={still ? 0 : 1200} style={still ? undefined : { animation: "schema-pulse 3.4s ease-in-out forwards" }} />
      {NODES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={path.includes(i) ? 9 : 7} fill={path.includes(i) ? "var(--mint)" : "var(--ink)"} stroke="var(--sky)" strokeWidth="2" />
      ))}
    </svg>
  );
}
