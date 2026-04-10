import { useRef, type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  spotlight?: boolean;
}

export default function Card({ children, className = "", spotlight = false }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = spotlight
    ? (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--spotlight-x", `${x}%`);
        el.style.setProperty("--spotlight-y", `${y}%`);
      }
    : undefined;

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col rounded-xl p-5 md:p-6 lg:p-8 transition-all duration-300 ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseMove={handleMove}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = "rgba(255, 255, 255, 0.04)";
        el.style.borderColor = "rgba(244, 121, 32, 0.2)";
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 0 30px rgba(244, 121, 32, 0.06)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "rgba(255, 255, 255, 0.02)";
        el.style.borderColor = "rgba(255, 255, 255, 0.06)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255,255,255,0.06), transparent 50%)",
          }}
        />
      )}
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </div>
  );
}
