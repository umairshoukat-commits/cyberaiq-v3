import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if ("ontouchstart" in window) return;
    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Force invisible on mount
    dot.style.opacity = "0";
    ring.style.opacity = "0";

    const xDot = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    let revealed = false;

    const handleMove = (e: MouseEvent) => {
      if (!revealed) {
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to(dot, { opacity: 1, duration: 0.3 });
        gsap.to(ring, { opacity: 1, duration: 0.3 });
        document.documentElement.style.cursor = "none";
        revealed = true;
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], input, textarea, select")) {
        gsap.to(ring, { scale: 2.5, duration: 0.3, ease: "power3.out" });
        gsap.to(dot, { scale: 0, duration: 0.3, ease: "power3.out" });
      }
    };

    const handleOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], input, textarea, select")) {
        gsap.to(ring, { scale: 1, duration: 0.3, ease: "power3.out" });
        gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
      }
    };

    const handleLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
      revealed = false;
    };

    const handleEnter = () => {
      if (revealed) gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <style>{`
        .cursor-dot,
        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          will-change: transform;
          opacity: 0;
        }
        .cursor-dot {
          width: 8px;
          height: 8px;
          margin-left: -4px;
          margin-top: -4px;
          background: white;
          border-radius: 50%;
        }
        .cursor-ring {
          width: 40px;
          height: 40px;
          margin-left: -20px;
          margin-top: -20px;
          border: 1px solid white;
          border-radius: 50%;
        }
        @media (hover: none), (pointer: coarse) {
          .cursor-dot,
          .cursor-ring {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
