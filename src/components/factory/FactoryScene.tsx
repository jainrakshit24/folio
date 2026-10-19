/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Diorama } from "./Diorama";

/**
 * The WebGL half of the Data Factory, split into its own chunk.
 *
 * three + drei are ~237 kB gzip. Keeping them out of the entry chunk is what
 * lets the shell hydrate (and the preloader start animating) before any of it
 * has downloaded, and visitors on the flat SVG fallback never pay for it.
 */
export default function FactoryScene({
  pathname,
  quality,
  ducks,
}: {
  pathname: string;
  quality: "high" | "low";
  ducks: boolean;
}) {
  return (
    <Canvas
      shadows={quality === "high"}
      dpr={[1, 2]}
      gl={{ antialias: quality === "high", powerPreference: "high-performance" }}
      camera={{ position: [10, 7.5, 12], fov: 34 }}
    >
      <color attach="background" args={["#FFF6EC"]} />
      <fog attach="fog" args={["#FFF6EC", 26, 48]} />
      <Suspense fallback={null}>
        <Diorama pathname={pathname} quality={quality} ducks={ducks} />
      </Suspense>
    </Canvas>
  );
}
