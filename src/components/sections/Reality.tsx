import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { home } from "../../content/site-content";

const truthIcons = [
  // AI is scaling faster than security — Zap
  {
    bg: "rgba(244, 121, 32, 0.10)",
    color: "var(--accent-primary)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  // Identity has replaced the perimeter — Fingerprint
  {
    bg: "rgba(244, 160, 80, 0.10)",
    color: "#F4A050",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" />
        <path d="M5 19.5C5.5 18 6 15 6 12c0-3.5 2.5-6 6-6 1.7 0 3.2.7 4.2 1.8" />
        <path d="M17.6 9.5c.3.8.4 1.6.4 2.5 0 2.5-.5 5-2 7.5" />
        <path d="M10 12c0 4-1 8-3 11" />
        <path d="M14 12c0 2-.5 4-1.5 6" />
      </svg>
    ),
  },
  // Quantum will break today's cryptography — Sparkles
  {
    bg: "rgba(139, 92, 246, 0.10)",
    color: "#8B5CF6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
      </svg>
    ),
  },
  // Legacy Security Models cannot keep up — Globe
  {
    bg: "rgba(0, 168, 157, 0.10)",
    color: "#00A89D",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
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
    <section
      className="py-12 md:py-16 lg:py-24"
      style={{ background: "var(--surface-1)", backgroundImage: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(249,115,22,0.06), transparent)", backgroundSize: "100% 100%" }}
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
