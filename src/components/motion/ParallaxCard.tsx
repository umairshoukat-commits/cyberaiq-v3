import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "../../lib/gsap";

interface Props {
  children: ReactNode;
  depth?: number;
  className?: string;
}

export default function ParallaxCard({
  children,
  depth = 8,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (new URLSearchParams(window.location.search).get("static") === "1") return;

    const xTo = gsap.quickTo(el, "rotateY", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "rotateX", { duration: 0.4, ease: "power3" });

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      xTo(x * (depth / 2));
      yTo(-y * (depth / 2));
      el.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`parallax-card ${className}`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249,115,22,0.06), transparent 60%)",
        }}
      />
    </div>
  );
}
