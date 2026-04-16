import CountUp from "../ui/CountUp";
import ScrollReveal from "../ui/ScrollReveal";
import { home } from "../../content/site-content";

function parseStatValue(raw: string): { num: number; suffix: string; decimals: number } {
  const match = raw.match(/^([\d.]+)(.*)$/);
  if (!match) return { num: 0, suffix: raw, decimals: 0 };
  const num = parseFloat(match[1]);
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return { num, suffix: match[2], decimals };
}

export default function Stats() {
  return (
    // [MASTER.md §6a Stage 3] bg normalized to alternation rhythm
    <section className="py-12 md:py-16 lg:py-24" style={{ background: "#0A0A0A" }}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <ScrollReveal from={{ y: 40, opacity: 0 }} to={{ y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }}>
          <div
            className="grid grid-cols-2 gap-6 rounded-[var(--radius-lg)] p-5 md:grid-cols-4 md:gap-4 md:p-12"
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            {home.metrics.map((metric, i) => {
              const { num, suffix, decimals } = parseStatValue(metric.value);
              return (
                <div key={i} className="flex flex-col items-center gap-3 text-center">
                  <CountUp
                    end={num}
                    suffix={suffix}
                    decimals={decimals}
                    duration={2}
                    className="font-extrabold"
                    style={{
                      fontSize: "clamp(36px, 5vw, 56px)",
                      lineHeight: 1,
                      color: "var(--accent-primary)",
                    }}
                  />
                  <span
                    className="text-xs font-medium uppercase tracking-wider md:text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {metric.label}
                  </span>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
