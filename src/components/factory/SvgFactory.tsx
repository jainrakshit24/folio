/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
/**
 * Flat, illustrated fallback for the 3D Data Factory.
 * Shown when WebGL is unavailable or the visitor prefers reduced motion.
 */
export function SvgFactory() {
  return (
    <svg
      viewBox="0 0 800 500"
      className="h-auto w-[min(90vw,900px)] opacity-90"
      aria-hidden="true"
      role="presentation"
    >
      <ellipse cx="400" cy="380" rx="300" ry="60" fill="#23D5A0" stroke="#171512" strokeWidth="4" />
      <path d="M100 380c40 90 260 130 460 40 40-18 90-30 140-40Z" fill="#EFE3D3" stroke="#171512" strokeWidth="4" />

      {/* chute */}
      <rect x="90" y="150" width="140" height="22" rx="10" fill="#3D6DFF" stroke="#171512" strokeWidth="4" transform="rotate(-12 160 160)" />
      {/* belt */}
      <rect x="150" y="300" width="500" height="26" rx="12" fill="#EFE3D3" stroke="#171512" strokeWidth="4" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle key={i} cx={180 + i * 62} cy={335} r="14" fill="#FFF6EC" stroke="#171512" strokeWidth="4" />
      ))}
      {/* stamp */}
      <rect x="370" y="180" width="20" height="90" fill="#FF5A36" stroke="#171512" strokeWidth="4" />
      <rect x="345" y="255" width="70" height="45" rx="12" fill="#8B5CF6" stroke="#171512" strokeWidth="4">
        <animate attributeName="y" values="235;265;235" dur="1.6s" repeatCount="indefinite" />
      </rect>
      {/* cubes */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={170 + i * 120} y="266" width="30" height="30" rx="8" fill={["#B9A98F", "#B9A98F", "#FFC531", "#23D5A0"][i]} stroke="#171512" strokeWidth="4">
          <animate attributeName="x" values={`${170 + i * 120};${230 + i * 120};${170 + i * 120}`} dur="4s" repeatCount="indefinite" />
        </rect>
      ))}
      {/* bar chart */}
      <rect x="640" y="230" width="34" height="70" fill="#FF5A36" stroke="#171512" strokeWidth="4" />
      <rect x="682" y="200" width="34" height="100" fill="#FFC531" stroke="#171512" strokeWidth="4" />
      <rect x="724" y="250" width="34" height="50" fill="#3D6DFF" stroke="#171512" strokeWidth="4" />

      <text x="120" y="130" fontFamily="monospace" fontSize="16" fill="#171512">INGEST</text>
      <text x="330" y="160" fontFamily="monospace" fontSize="16" fill="#171512">TRANSFORM</text>
      <text x="500" y="270" fontFamily="monospace" fontSize="16" fill="#171512">VALIDATE</text>
      <text x="655" y="180" fontFamily="monospace" fontSize="16" fill="#171512">LOAD</text>
    </svg>
  );
}
