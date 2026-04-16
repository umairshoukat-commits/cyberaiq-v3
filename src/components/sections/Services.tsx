import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, BrainCircuit, Cloud, Atom } from "lucide-react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { services } from "../../content/site-content";

const serviceIcons = [
  // Cyber — shield (orange) [MASTER.md §14 Stage 5] inline SVG → lucide
  {
    color: "var(--accent-primary)",
    bg: "rgba(244, 121, 32, 0.12)",
    icon: <ShieldCheck className="h-7 w-7" strokeWidth={1.5} />,
  },
  // AI — brain-circuit (blue) [MASTER.md §13 change 6] lucide-react BrainCircuit
  {
    color: "var(--accent-secondary)",
    bg: "rgba(43, 126, 193, 0.12)",
    icon: <BrainCircuit className="h-7 w-7" strokeWidth={1.5} />,
  },
  // Cloud (purple) [MASTER.md §14 Stage 5] inline SVG → lucide
  {
    color: "#8B5CF6",
    bg: "rgba(139, 92, 246, 0.12)",
    icon: <Cloud className="h-7 w-7" strokeWidth={1.5} />,
  },
  // Quantum — atom (teal) [MASTER.md §14 Stage 5] inline SVG → lucide
  {
    color: "#00A89D",
    bg: "rgba(0, 168, 157, 0.12)",
    icon: <Atom className="h-7 w-7" strokeWidth={1.5} />,
  },
];

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll(".service-card");
      if (!cards?.length) return;

      gsap.set(cards, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
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
      className="relative py-12 md:py-16 lg:py-24"
      style={{ background: "#0F0F0F" }}
    >
      {/* [MASTER.md §13 change 1] Services.webp decorative background removed */}
      {/* [MASTER.md §13 change 2] Service card resting bg bumped from 0.02 to 0.04 — revert this <style> block to restore original */}
      <style>{`
        .service-card > .shine-card {
          background: rgba(255, 255, 255, 0.04) !important;
        }
      `}</style>
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            Our{" "}
            <span style={{ color: "var(--accent-primary)" }}>Services</span>
          </h2>
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 items-stretch gap-6 md:mt-16 md:grid-cols-2"
        >
          {services.items.map((service, i) => {
            const meta = serviceIcons[i];
            return (
              <div key={i} className="service-card flex">
                <Card className="h-full w-full shine-card" spotlight>
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: meta.bg, color: meta.color }}
                  >
                    {meta.icon}
                  </div>
                  <h3
                    className="mt-4 text-xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {service.description}
                  </p>
                  <div className="mt-4 flex-1">
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Focus Areas:
                    </span>
                    <ul className="mt-2 flex flex-col gap-2">
                      {service.focusAreas.map((area, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="var(--accent-primary)">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 h-px w-full" style={{
                    background: "linear-gradient(90deg, transparent, rgba(8,145,178,0.4) 20%, rgba(6,182,212,0.6) 50%, rgba(8,145,178,0.4) 80%, transparent)",
                  }} />
                  <p className="mt-4 text-sm italic" style={{ color: "var(--text-secondary)" }}>
                    {service.tagline}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Marketplace */}
        <div className="mt-20 md:mt-24">
          <h3
            className="text-center text-2xl font-bold md:text-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            <span style={{ color: "var(--accent-primary)" }}>Marketplace-First</span>{" "}
            Acceleration
          </h3>

          <p
            className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {services.marketplace.intro}
          </p>
          <p
            className="mt-4 text-center text-base font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            {services.marketplace.approach}
          </p>

          {/* 3 marketplace cards with orange top border */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* What We Do */}
            <div
              className="rounded-[var(--radius-md)] p-6"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid var(--border-subtle)",
                borderTop: "3px solid var(--accent-primary)",
              }}
            >
              <h4
                className="text-base font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                What We Do
              </h4>
              <ul className="mt-4 flex flex-col gap-2">
                {services.marketplace.whatWeDo.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--accent-primary)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p
                className="mt-3 text-xs italic"
                style={{ color: "var(--text-muted)" }}
              >
                {services.marketplace.whatWeDoNote}
              </p>
            </div>

            {/* Why It Matters */}
            <div
              className="rounded-[var(--radius-md)] p-6"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid var(--border-subtle)",
                borderTop: "3px solid var(--accent-primary)",
              }}
            >
              <h4
                className="text-base font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Why Marketplace-First Matters
              </h4>
              <ul className="mt-4 flex flex-col gap-2">
                {services.marketplace.whyItMatters.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--accent-primary)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p
                className="mt-4 text-sm font-medium italic"
                style={{ color: "var(--accent-primary)" }}
              >
                {services.marketplace.tagline}
              </p>
            </div>

            {/* Built for the New Era */}
            <div
              className="rounded-[var(--radius-md)] p-6"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid var(--border-subtle)",
                borderTop: "3px solid var(--accent-primary)",
              }}
            >
              <h4
                className="text-base font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {services.marketplace.builtFor.heading}
              </h4>
              <p
                className="mt-3 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {services.marketplace.builtFor.statement}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {services.marketplace.builtFor.weAre.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--accent-primary)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p
                className="mt-3 text-sm font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                {services.marketplace.builtFor.closing}
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button href="/contact" variant="primary" size="lg">
              {services.marketplace.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
