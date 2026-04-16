import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { CloudCog, Globe2, GraduationCap } from "lucide-react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { home } from "../../content/site-content";

const cardMeta = [
  // [MASTER.md §14 Stage 5] inline SVG → lucide
  {
    accent: "rgba(249, 115, 22, 0.6)",
    accentHover: "rgba(249, 115, 22, 0.3)",
    iconBg: "rgba(249, 115, 22, 0.15)",
    iconColor: "#F97316",
    shadow: "rgba(249, 115, 22, 0.1)",
    icon: <CloudCog className="h-6 w-6" strokeWidth={1.5} />,
  },
  // [MASTER.md §14 Stage 5] inline SVG → lucide
  {
    accent: "rgba(8, 145, 178, 0.6)",
    accentHover: "rgba(8, 145, 178, 0.3)",
    iconBg: "rgba(8, 145, 178, 0.15)",
    iconColor: "#0891B2",
    shadow: "rgba(8, 145, 178, 0.1)",
    icon: <Globe2 className="h-6 w-6" strokeWidth={1.5} />,
  },
  // [MASTER.md §14 Stage 5] inline SVG → lucide
  {
    accent: "rgba(139, 92, 246, 0.6)",
    accentHover: "rgba(139, 92, 246, 0.3)",
    iconBg: "rgba(139, 92, 246, 0.15)",
    iconColor: "#8B5CF6",
    shadow: "rgba(139, 92, 246, 0.1)",
    icon: <GraduationCap className="h-6 w-6" strokeWidth={1.5} />,
  },
];

export default function Leadership() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll(".lead-card");
      if (!cards?.length) return;
      gsap.set(cards, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(cards, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" });
        },
      });
    },
    { scope: gridRef }
  );

  return (
    // [MASTER.md §6a Stage 3] bg normalized to alternation rhythm
    <section className="relative py-12 md:py-16 lg:py-24" style={{ background: "#0A0A0A" }}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl" style={{ color: "var(--text-primary)" }}>
            Our <span style={{ color: "var(--accent-primary)" }}>Leadership</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed md:text-lg" style={{ color: "var(--text-secondary)" }}>
            {home.leadership.body}
          </p>
        </div>

        <div ref={gridRef} className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
          {home.leadership.qualities.map((q, i) => {
            const m = cardMeta[i];
            return (
              <div
                key={i}
                className="lead-card gradient-border-card shine-card flex flex-col items-center rounded-xl px-5 py-8 md:px-6 md:py-9 lg:px-8 lg:py-10 text-center transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderTop: `2px solid ${m.accent}`,
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "rgba(255, 255, 255, 0.06)";
                  el.style.transform = "translateY(-6px)";
                  el.style.borderColor = m.accentHover;
                  el.style.boxShadow = `0 8px 30px ${m.shadow}`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "rgba(255, 255, 255, 0.03)";
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  el.style.borderTopColor = m.accent;
                  el.style.boxShadow = "none";
                }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: m.iconBg, color: m.iconColor }}
                >
                  {m.icon}
                </div>
                <p className="mt-5 text-lg font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                  {q}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed md:text-lg" style={{ color: "var(--text-primary)" }}>
          {home.leadership.closing}
        </p>
      </div>
    </section>
  );
}
