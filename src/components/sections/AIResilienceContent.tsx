import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import Button from "../ui/Button";
import { aiResilience } from "../../content/site-content";

function OrangeCheck() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="var(--accent-primary)">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function SectionImage({ src, bg = "var(--surface-1)" }: { src: string; bg?: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
      <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
      <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(to right, ${bg} 0%, transparent 18%, transparent 82%, ${bg} 100%), linear-gradient(to bottom, ${bg} 0%, transparent 15%, transparent 85%, ${bg} 100%)` }} />
      <div className="pointer-events-none absolute -inset-5 -z-10" style={{ background: "radial-gradient(ellipse, rgba(8,145,178,0.05) 0%, transparent 70%)" }} />
    </div>
  );
}

const frameworkColors = [
  { gradient: "linear-gradient(135deg, rgba(43,126,193,0.10) 0%, transparent 70%)", border: "#2B7EC1" },
  { gradient: "linear-gradient(135deg, rgba(99,102,241,0.10) 0%, transparent 70%)", border: "#6366F1" },
  { gradient: "linear-gradient(135deg, rgba(0,168,157,0.10) 0%, transparent 70%)", border: "#00A89D" },
  { gradient: "linear-gradient(135deg, rgba(244,121,32,0.10) 0%, transparent 70%)", border: "#F47920" },
  { gradient: "linear-gradient(135deg, rgba(139,92,246,0.10) 0%, transparent 70%)", border: "#8B5CF6" },
  { gradient: "linear-gradient(135deg, rgba(43,126,193,0.10) 0%, transparent 70%)", border: "#2B7EC1" },
];

export default function AIResilienceContent() {
  const frameworkRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = frameworkRef.current?.querySelectorAll(".fw-card");
    if (!cards?.length) return;
    gsap.set(cards, { opacity: 0, y: 30 });
    ScrollTrigger.create({ trigger: frameworkRef.current, start: "top 90%", once: true, onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }) });
  }, { scope: frameworkRef });

  return (
    <>
      {/* Section 1: Tagline + Intro */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="text-xl font-bold italic leading-relaxed md:text-2xl" style={{ color: "var(--accent-primary)" }}>
            {aiResilience.tagline}
          </p>
          {aiResilience.intro.body.split("\n").map((line, i) => (
            <p key={i} className="mt-5 text-base leading-relaxed md:text-lg" style={{ color: i === 0 ? "var(--text-secondary)" : "var(--text-primary)" }}>
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* Section 2: What AI Resilience Means */}
      <section className="py-12 md:py-16 lg:py-24" style={{ background: "var(--surface-1)" }}>
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl" style={{ color: "var(--text-primary)" }}>
            What <span style={{ color: "var(--accent-primary)" }}>AI Resilience Means</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed md:text-lg" style={{ color: "var(--text-secondary)" }}>
            {aiResilience.whatItMeans.body}
          </p>
          <p className="mt-4 text-base font-medium" style={{ color: "var(--text-primary)" }}>
            AI Resilience protects your organization from:
          </p>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionImage src="/images/selections/ai-resilience-meaning.webp" />
            <ul className="flex flex-col gap-3">
              {aiResilience.whatItMeans.protectsFrom.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed md:text-base" style={{ color: "var(--text-secondary)" }}>
                  <OrangeCheck />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 text-lg font-semibold italic md:text-xl" style={{ color: "var(--text-primary)" }}>
            {aiResilience.whatItMeans.closing}
          </p>
        </div>
      </section>

      {/* Section 3: Framework — 3x2 grid */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
          <h2 className="text-center text-3xl font-bold md:text-4xl lg:text-5xl" style={{ color: "var(--text-primary)" }}>
            The CYBERAIQ AG <span style={{ color: "var(--accent-primary)" }}>AI Resilience Framework</span>
          </h2>

          <div ref={frameworkRef} className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {aiResilience.framework.pillars.map((pillar, i) => {
              const c = frameworkColors[i];
              return (
                <div
                  key={i}
                  className="fw-card rounded-xl p-7"
                  style={{ background: c.gradient, border: "1px solid var(--border-subtle)", borderTop: `2px solid ${c.border}` }}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold" style={{ background: `${c.border}20`, color: c.border }}>
                    {pillar.number}
                  </span>
                  <h3 className="mt-4 text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {pillar.body.replace(/\n/g, " ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Why AI Resilience Matters Now */}
      <section className="py-12 md:py-16 lg:py-24" style={{ background: "var(--surface-1)" }}>
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl" style={{ color: "var(--text-primary)" }}>
            Why <span style={{ color: "var(--accent-primary)" }}>AI Resilience Matters Now?</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed md:text-lg" style={{ color: "var(--text-secondary)" }}>
            AI is no longer optional — it&apos;s mission‑critical. But mission‑critical systems must be <strong style={{ color: "var(--text-primary)" }}>resilient</strong>, not fragile. Organizations that invest in AI Resilience gain:
          </p>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionImage src="/images/selections/ai-resilience-why.webp" />
            <ul className="flex flex-col gap-3">
              {aiResilience.whyNow.benefits.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed md:text-base" style={{ color: "var(--text-secondary)" }}>
                  <OrangeCheck />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 text-lg font-semibold italic md:text-xl" style={{ color: "var(--accent-primary)" }}>
            {aiResilience.whyNow.closing}
          </p>
        </div>
      </section>

      {/* Section 5: AI Resilience by CYBERAIQ AG */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl" style={{ color: "var(--text-primary)" }}>
            AI Resilience <span style={{ color: "var(--accent-primary)" }}>by CYBERAIQ AG</span>
          </h2>
          <p className="mt-6 text-lg font-semibold italic md:text-xl" style={{ color: "var(--text-primary)" }}>
            We build AI that doesn&apos;t just perform — it endures.
          </p>
          <p className="mt-5 text-base leading-relaxed md:text-lg" style={{ color: "var(--text-secondary)" }}>
            Our approach blends deep cybersecurity expertise, cloud engineering mastery, and forward‑looking quantum readiness. The result is AI that becomes stronger with every challenge. This is resilience engineered for the enterprises that refuse to break.
          </p>
        </div>
      </section>

      {/* Section 6: Final CTA */}
      <section className="py-12 md:py-16 lg:py-24" style={{ background: "var(--surface-1)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl" style={{ color: "var(--text-primary)" }}>
            {aiResilience.cta.heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed md:text-lg" style={{ color: "var(--text-secondary)" }}>
            {aiResilience.cta.body}
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="primary" size="lg">
              {aiResilience.cta.button} &rarr;
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
