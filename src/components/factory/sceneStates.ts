/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { isFreelance } from "@/lib/projects";

export type SceneState = {
  camera: [number, number, number];
  target: [number, number, number];
  speed: number;
  mode: "run" | "desk" | "chart" | "explode" | "islands" | "school" | "mail" | "physics" | "web" | "webFocus";
};

export const SCENES: Record<string, SceneState> = {
  "/": { camera: [10, 7.5, 12], target: [-2.2, 1.8, -0.4], speed: 1, mode: "run" },
  "/about": { camera: [7.5, 5.6, 9], target: [-2.4, 1.2, 1.6], speed: 0.45, mode: "desk" },
  "/work": { camera: [5.6, 3.8, 6.8], target: [2.6, 1, 0], speed: 0.8, mode: "chart" },
  "/services": { camera: [9, 6, 11], target: [0, 2.4, 0], speed: 1, mode: "web" },
  "/skills": { camera: [11.5, 8, 13], target: [0, 1, 0], speed: 0.5, mode: "explode" },
  "/experience": { camera: [14, 9, 15], target: [0, 0.2, 0], speed: 0.7, mode: "islands" },
  "/education": { camera: [8, 5.4, 9.5], target: [-0.6, 1, -0.6], speed: 0.15, mode: "school" },
  "/contact": { camera: [8.5, 5.4, 10], target: [0.6, 0.6, 1.4], speed: 0.5, mode: "mail" },
  "/playground": { camera: [11, 7.5, 13], target: [0, 0.6, 0], speed: 1.2, mode: "physics" },
};

export function sceneFor(pathname: string): SceneState {
  if (SCENES[pathname]) return SCENES[pathname]!;
  const slug = pathname.match(/^\/work\/([^/]+)/)?.[1];
  if (slug && isFreelance(slug)) return { camera: [5.5, 4.2, 7], target: [0, 3, 0], speed: 0.8, mode: "webFocus" };
  if (pathname.startsWith("/work")) return SCENES["/work"]!;
  // Unknown URL → 404: the factory scatters into disorder.
  return { camera: [13, 9.5, 14], target: [0, 1, 0], speed: 1.6, mode: "explode" };
}
