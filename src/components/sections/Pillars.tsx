import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, BrainCircuit, Atom, Cloud } from "lucide-react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { home } from "../../content/site-content";

const pillarMeta = [
  // [MASTER.md §14 Stage 5] inline SVG → lucide
  {
    color: "#2B7EC1",
    bg: "rgba(43, 126, 193, 0.12)",
    gradient: "linear-gradient(135deg, rgba(43,126,193,0.10) 0%, transparent 70%)",
    icon: <ShieldCheck className="h-7 w-7" strokeWidth={1.5} />,
  },
  // [MASTER.md §14 Stage 5] inline SVG → lucide
  {
    color: "#6366F1",
    bg: "rgba(99, 102, 241, 0.12)",
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.10) 0%, transparent 70%)",
    icon: <BrainCircuit className="h-7 w-7" strokeWidth={1.5} />,
  },
  // [MASTER.md §14 Stage 5] inline SVG → lucide
  {
    color: "#8B5CF6",
    bg: "rgba(139, 92, 246, 0.12)",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.10) 0%, transparent 70%)",
    icon: <Atom className="h-7 w-7" strokeWidth={1.5} />,
  },
  // [MASTER.md §14 Stage 5] inline SVG → lucide
  {
    color: "#00A89D",
    bg: "rgba(0, 168, 157, 0.12)",
    gradient: "linear-gradient(135deg, rgba(0,168,157,0.10) 0%, transparent 70%)",
    icon: <Cloud className="h-7 w-7" strokeWidth={1.5} />,
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
    // [MASTER.md §6a Stage 3] bg normalized to alternation rhythm
    <section className="relative py-12 md:py-16 lg:py-24" style={{ background: "#0A0A0A" }}>
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
