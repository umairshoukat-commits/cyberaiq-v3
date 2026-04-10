import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { home } from "../../content/site-content";

const pillarMeta = [
  {
    color: "#2B7EC1",
    bg: "rgba(43, 126, 193, 0.12)",
    gradient: "linear-gradient(135deg, rgba(43,126,193,0.10) 0%, transparent 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    color: "#6366F1",
    bg: "rgba(99, 102, 241, 0.12)",
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.10) 0%, transparent 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M12 5a3 3 0 100-6 3 3 0 000 6z" />
        <path d="M12 5v4" />
        <path d="M6.5 9a2.5 2.5 0 100 5" />
        <path d="M17.5 9a2.5 2.5 0 110 5" />
        <path d="M6.5 14l2 2" />
        <path d="M17.5 14l-2 2" />
        <path d="M10 18h4" />
        <path d="M12 18v3" />
        <circle cx="12" cy="11" r="1" fill="currentColor" />
        <circle cx="8" cy="16" r="1" fill="currentColor" />
        <circle cx="16" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    color: "#8B5CF6",
    bg: "rgba(139, 92, 246, 0.12)",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.10) 0%, transparent 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-7 w-7">
        <circle cx="12" cy="12" r="2.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    color: "#00A89D",
    bg: "rgba(0, 168, 157, 0.12)",
    gradient: "linear-gradient(135deg, rgba(0,168,157,0.10) 0%, transparent 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M17.5 19a4.5 4.5 0 100-9h-1A7 7 0 105 12.5" />
        <path d="M8 19h9.5" />
      </svg>
    ),
  },
];

export default function Pillars() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll(".pillar-card");
      if (!cards?.length) return;
      gsap.set(cards, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(cards, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" });
        },
      });
    },
    { scope: gridRef }
  );

  return (
    <section className="relative py-12 md:py-16 lg:py-24" style={{ background: "var(--surface-1)", backgroundImage: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(8,145,178,0.08), transparent), radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "100% 100%, 24px 24px" }}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <h2 className="mb-12 text-center text-3xl font-bold md:mb-16 md:text-4xl lg:text-5xl" style={{ color: "var(--text-primary)" }}>
          Our <span style={{ color: "var(--accent-primary)" }}>Four Pillars</span>
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {home.pillars.map((pillar, i) => {
            const meta = pillarMeta[i];
            return (
              <div
                key={i}
                className="pillar-card gradient-border-card shine-card relative overflow-hidden rounded-xl p-5 md:p-6 lg:p-8 transition-all duration-300"
                style={{
                  background: meta.gradient,
                  border: "1px solid var(--border-subtle)",
                  borderTop: `2px solid ${meta.color}`,
                }}
              >
                <div className="flex flex-col gap-5">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{ background: meta.bg, color: meta.color }}
                  >
                    {meta.icon}
                  </div>
                  <h3 className="text-lg font-bold md:text-xl" style={{ color: "var(--text-primary)" }}>
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
