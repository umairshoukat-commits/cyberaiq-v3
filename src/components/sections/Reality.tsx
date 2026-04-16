import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Zap, Fingerprint, Sparkles, Globe } from "lucide-react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { home } from "../../content/site-content";

const truthIcons = [
  // AI is scaling faster than security — Zap [MASTER.md §14 Stage 5] inline SVG → lucide
  {
    bg: "rgba(244, 121, 32, 0.10)",
    color: "var(--accent-primary)",
    icon: <Zap className="h-5 w-5" strokeWidth={1.5} />,
  },
  // Identity has replaced the perimeter — Fingerprint [MASTER.md §14 Stage 5] inline SVG → lucide
  {
    bg: "rgba(244, 160, 80, 0.10)",
    color: "#F4A050",
    icon: <Fingerprint className="h-5 w-5" strokeWidth={1.5} />,
  },
  // Quantum will break today's cryptography — Sparkles [MASTER.md §14 Stage 5] inline SVG → lucide
  {
    bg: "rgba(139, 92, 246, 0.10)",
    color: "#8B5CF6",
    icon: <Sparkles className="h-5 w-5" strokeWidth={1.5} />,
  },
  // Legacy Security Models cannot keep up — Globe [MASTER.md §14 Stage 5] inline SVG → lucide
  {
    bg: "rgba(0, 168, 157, 0.10)",
    color: "#00A89D",
    icon: <Globe className="h-5 w-5" strokeWidth={1.5} />,
  },
];

export default function Reality() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gridRef.current?.querySelectorAll(".reality-pill");
      if (!items?.length) return;

      gsap.set(items, { opacity: 0, y: 24, scale: 0.96 });

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          });
        },
      });
    },
    { scope: gridRef }
  );

  return (
    // [MASTER.md §6a Stage 3] bg normalized to alternation rhythm
    <section
      className="py-12 md:py-16 lg:py-24"
      style={{ background: "#0A0A0A" }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            The{" "}
            <span style={{ color: "var(--accent-primary)" }}>Reality</span>
          </h2>
          <p
            className="mt-4 text-sm font-semibold uppercase tracking-widest md:text-base"
            style={{ color: "var(--text-muted)" }}
          >
            {home.reality.subheading}
          </p>
        </div>

        <div
          ref={gridRef}
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-16"
        >
          {home.reality.truths.map((truth, i) => {
            const meta = truthIcons[i];
            return (
              <div
                key={i}
                className="reality-pill shine-card flex items-start gap-4 rounded-[var(--radius-md)] p-5"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)]"
                  style={{ background: meta.bg, color: meta.color }}
                >
                  {meta.icon}
                </div>
                <span
                  className="text-sm font-medium leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {truth}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
