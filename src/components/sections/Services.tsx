import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { services } from "../../content/site-content";

const serviceIcons = [
  // Cyber — shield (orange)
  {
    color: "var(--accent-primary)",
    bg: "rgba(244, 121, 32, 0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  // AI — brain-circuit (blue)
  {
    color: "var(--accent-secondary)",
    bg: "rgba(43, 126, 193, 0.12)",
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
  // Cloud (purple)
  {
    color: "#8B5CF6",
    bg: "rgba(139, 92, 246, 0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M17.5 19a4.5 4.5 0 100-9h-1A7 7 0 105 12.5" />
        <path d="M8 19h9.5" />
      </svg>
    ),
  },
  // Quantum — atom (teal)
  {
    color: "#00A89D",
    bg: "rgba(0, 168, 157, 0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-7 w-7">
        <circle cx="12" cy="12" r="2.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
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
    <section
      className="relative py-12 md:py-16 lg:py-24"
      style={{ background: "var(--surface-1)" }}
    >
      {/* Atmospheric background image */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img src="/images/selections/Services.webp" alt="" className="h-full w-full object-cover" style={{ opacity: 0.12 }} loading="lazy" decoding="async" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--surface-1) 0%, transparent 20%, transparent 80%, var(--surface-1) 100%), linear-gradient(to right, var(--surface-1) 0%, transparent 15%, transparent 85%, var(--surface-1) 100%)" }} />
      </div>
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
                    style={{ color: "var(--accent-primary)", opacity: 0.8 }}
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
                          style={{ color: "var(--text-muted)" }}
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
                  <p className="mt-4 text-sm italic" style={{ color: meta.color }}>
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
