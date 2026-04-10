type Variant =
  | "converging-lines"
  | "orbital-rings"
  | "expanding-network"
  | "layered-grid"
  | "connected-hexagons"
  | "ascending-nodes"
  | "shield-mesh"
  | "radial-convergence";

const BASE = "relative w-full overflow-hidden rounded-xl pointer-events-none";
const BG = "#0D1017";
const TEAL = "rgba(8, 145, 178, 0.4)";
const TEAL_BRIGHT = "rgba(8, 145, 178, 0.7)";
const TEAL_DIM = "rgba(8, 145, 178, 0.15)";

export default function GenerativeVisual({
  variant,
  className = "aspect-[4/3]",
}: {
  variant: Variant;
  className?: string;
}) {
  return (
    <div
      className={`${BASE} ${className}`}
      style={{ background: BG, border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Depth overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      <VariantContent variant={variant} />
      <style>{KEYFRAMES}</style>
    </div>
  );
}

function VariantContent({ variant }: { variant: Variant }) {
  switch (variant) {
    case "converging-lines":
      return (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300">
          <line x1="0" y1="0" x2="200" y2="150" stroke={TEAL} strokeWidth="0.8" strokeDasharray="8 4" className="gv-draw" />
          <line x1="400" y1="0" x2="200" y2="150" stroke={TEAL} strokeWidth="0.8" strokeDasharray="8 4" className="gv-draw-delay1" />
          <line x1="0" y1="300" x2="200" y2="150" stroke={TEAL} strokeWidth="0.8" strokeDasharray="8 4" className="gv-draw-delay2" />
          <line x1="400" y1="300" x2="200" y2="150" stroke={TEAL} strokeWidth="0.8" strokeDasharray="8 4" className="gv-draw-delay3" />
          <circle cx="200" cy="150" r="4" fill={TEAL_BRIGHT} className="gv-pulse" />
          <circle cx="200" cy="150" r="12" fill="none" stroke={TEAL_DIM} strokeWidth="0.5" className="gv-pulse-ring" />
        </svg>
      );

    case "orbital-rings":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="gv-orbit1 absolute h-[55%] w-[75%] rounded-full border border-solid" style={{ borderColor: TEAL_DIM, transform: "rotateX(65deg)" }} />
          <div className="gv-orbit2 absolute h-[45%] w-[65%] rounded-full border border-solid" style={{ borderColor: TEAL, transform: "rotateX(65deg) rotateZ(60deg)" }} />
          <div className="gv-orbit3 absolute h-[35%] w-[55%] rounded-full border border-solid" style={{ borderColor: TEAL_DIM, transform: "rotateX(65deg) rotateZ(120deg)" }} />
          <div className="absolute h-2 w-2 rounded-full" style={{ background: TEAL_BRIGHT }} />
        </div>
      );

    case "expanding-network":
      return (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300">
          <circle cx="200" cy="150" r="3" fill={TEAL_BRIGHT} />
          {[[140, 90], [260, 90], [130, 200], [270, 200], [200, 60], [200, 240]].map(([x, y], i) => (
            <g key={i}>
              <line x1="200" y1="150" x2={x} y2={y} stroke={TEAL_DIM} strokeWidth="0.6" strokeDasharray="4 3" className="gv-draw" />
              <circle cx={x} cy={y} r="2.5" fill={TEAL} className={`gv-scale-${(i % 3) + 1}`} />
            </g>
          ))}
        </svg>
      );

    case "layered-grid":
      return (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300">
          {[60, 120, 180, 240].map((y, i) => (
            <line key={`h${i}`} x1="40" y1={y} x2="360" y2={y} stroke={TEAL_DIM} strokeWidth="0.5" className={`gv-wave-${(i % 3) + 1}`} />
          ))}
          {[80, 160, 240, 320].map((x, i) => (
            <line key={`v${i}`} x1={x} y1="30" x2={x} y2="270" stroke={TEAL_DIM} strokeWidth="0.4" />
          ))}
          {[{x: 160, y: 120}, {x: 240, y: 180}, {x: 160, y: 240}].map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="2" fill={TEAL} className="gv-pulse" />
          ))}
        </svg>
      );

    case "connected-hexagons":
      return (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300">
          {[[140, 110], [260, 110], [200, 190]].map(([cx, cy], i) => (
            <g key={i}>
              <polygon
                points={hexPoints(cx, cy, 30)}
                fill="none"
                stroke={TEAL}
                strokeWidth="0.7"
                className={`gv-pulse-${(i % 2) + 1}`}
              />
            </g>
          ))}
          <line x1="160" y1="120" x2="240" y2="120" stroke={TEAL_DIM} strokeWidth="0.5" className="gv-draw" />
          <line x1="150" y1="125" x2="185" y2="178" stroke={TEAL_DIM} strokeWidth="0.5" className="gv-draw-delay1" />
          <line x1="250" y1="125" x2="215" y2="178" stroke={TEAL_DIM} strokeWidth="0.5" className="gv-draw-delay2" />
        </svg>
      );

    case "ascending-nodes":
      return (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300">
          {[[100, 250], [150, 210], [200, 170], [250, 130], [300, 90], [340, 60]].map(([x, y], i, arr) => (
            <g key={i}>
              <circle cx={x} cy={y} r={2 + i * 0.3} fill={TEAL} className="gv-drift" />
              {i > 0 && (
                <line x1={arr[i - 1][0]} y1={arr[i - 1][1]} x2={x} y2={y} stroke={TEAL_DIM} strokeWidth="0.5" strokeDasharray="3 3" />
              )}
            </g>
          ))}
        </svg>
      );

    case "shield-mesh":
      return (
        <>
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `radial-gradient(circle, ${TEAL} 1px, transparent 1px)`,
              backgroundSize: "24px 28px",
              backgroundPosition: "0 0, 12px 14px",
            }}
          />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300">
            <path
              d="M200 60 L280 100 L280 200 L200 240 L120 200 L120 100 Z"
              fill="none"
              stroke={TEAL}
              strokeWidth="1"
              strokeDasharray="6 4"
              className="gv-draw"
            />
            <circle cx="200" cy="150" r="2" fill={TEAL_BRIGHT} className="gv-pulse" />
          </svg>
        </>
      );

    case "radial-convergence":
      return (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x2 = 200 + Math.cos(angle) * 130;
            const y2 = 150 + Math.sin(angle) * 100;
            return (
              <line key={i} x1="200" y1="150" x2={x2} y2={y2} stroke={TEAL_DIM} strokeWidth="0.6" strokeDasharray="4 6" className={`gv-draw-delay${i % 4}`} />
            );
          })}
          <circle cx="200" cy="150" r="3" fill={TEAL_BRIGHT} className="gv-pulse" />
          <circle cx="200" cy="150" r="20" fill="none" stroke={TEAL_DIM} strokeWidth="0.5" className="gv-pulse-ring" />
        </svg>
      );
  }
}

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    })
    .join(" ");
}

const KEYFRAMES = `
  .gv-draw { stroke-dashoffset: 40; animation: gv-draw-in 3s ease-out forwards; }
  .gv-draw-delay1 { stroke-dashoffset: 40; animation: gv-draw-in 3s 0.3s ease-out forwards; }
  .gv-draw-delay2 { stroke-dashoffset: 40; animation: gv-draw-in 3s 0.6s ease-out forwards; }
  .gv-draw-delay3 { stroke-dashoffset: 40; animation: gv-draw-in 3s 0.9s ease-out forwards; }
  @keyframes gv-draw-in { to { stroke-dashoffset: 0; } }

  .gv-pulse { animation: gv-pulse 3s ease-in-out infinite; }
  .gv-pulse-1 { animation: gv-pulse 3s ease-in-out infinite; }
  .gv-pulse-2 { animation: gv-pulse 3s 1.5s ease-in-out infinite; }
  .gv-pulse-ring { animation: gv-pulse-expand 4s ease-out infinite; }
  @keyframes gv-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
  @keyframes gv-pulse-expand { 0% { r: 12; opacity: 0.4; } 100% { r: 30; opacity: 0; } }

  .gv-orbit1 { animation: gv-spin 20s linear infinite; }
  .gv-orbit2 { animation: gv-spin 28s linear infinite reverse; }
  .gv-orbit3 { animation: gv-spin 15s linear infinite; }
  @keyframes gv-spin { to { transform: rotateX(65deg) rotateZ(360deg); } }

  .gv-scale-1 { animation: gv-pop 2s 0.5s ease-out both; }
  .gv-scale-2 { animation: gv-pop 2s 1s ease-out both; }
  .gv-scale-3 { animation: gv-pop 2s 1.5s ease-out both; }
  @keyframes gv-pop { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }

  .gv-wave-1 { animation: gv-wave 18s ease-in-out infinite; }
  .gv-wave-2 { animation: gv-wave 18s 4s ease-in-out infinite; }
  .gv-wave-3 { animation: gv-wave 18s 8s ease-in-out infinite; }
  @keyframes gv-wave { 0%,100% { transform: translateY(0); } 50% { transform: translateY(4px); } }

  .gv-drift { animation: gv-drift 20s ease-in-out infinite; }
  @keyframes gv-drift { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }

  .gv-draw-delay0 { stroke-dashoffset: 40; animation: gv-draw-in 3s 0s ease-out forwards; }
`;
