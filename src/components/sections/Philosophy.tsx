import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { home } from "../../content/site-content";

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = sectionRef.current;
      const img = imageRef.current;
      if (!el) return;

      // Content reveal from left
      const content = el.querySelector(".phil-content");
      if (content) {
        gsap.set(content, { opacity: 0, x: -30 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => gsap.to(content, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }),
        });
      }

      // Cards stagger up
      const cards = el.querySelectorAll(".phil-card");
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 70%",
          once: true,
          onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }),
        });
      }

      // Image parallax
      if (img) {
        gsap.to(img, {
          y: 30,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section className="py-12 md:py-16 lg:py-24" style={{ background: "#0F1219" }}>
      <div ref={sectionRef} className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="phil-content">
              <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl" style={{ color: "var(--text-primary)" }}>
                Our <span style={{ color: "var(--accent-primary)" }}>Philosophy</span>
              </h2>

              <p className="mt-8 text-lg leading-relaxed md:text-xl" style={{ color: "var(--text-primary)" }}>
                Security is no longer a function. It is a{" "}
                <strong>cloud, data, automation and Intelligence problem</strong>.
              </p>

              <p className="mt-6 text-base leading-relaxed md:text-lg" style={{ color: "var(--text-secondary)" }}>
                CYBERAIQ AG exists to help organizations converge{" "}
                <strong style={{ color: "var(--text-primary)" }}>AI, Cloud, Cyber and Quantum</strong>{" "}
                into a single strategic advantage —{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  with ethics, governance, and regulatory alignment built in from day one
                </strong>.
              </p>
            </div>

            {/* Vision */}
            <div
              className="phil-card glass-card shine-card mt-10 rounded-xl p-5"
              style={{
                background: "rgba(200, 150, 80, 0.08)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(244, 121, 32, 0.15)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(244, 121, 32, 0.15)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--accent-primary)" }}>Vision</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{home.vision}</p>
            </div>

            {/* Mission */}
            <div
              className="phil-card glass-card shine-card mt-4 rounded-xl p-5"
              style={{
                background: "rgba(200, 150, 80, 0.08)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(43, 126, 193, 0.15)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(43, 126, 193, 0.15)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#38BDF8" }}>Mission</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{home.mission}</p>
            </div>
          </div>

          <div ref={imageRef} className="relative min-h-[250px] w-full overflow-hidden rounded-xl md:min-h-[350px] lg:min-h-0 lg:self-stretch">
            <img src="/images/selections/Philosophy.webp" alt="Holographic globe with converging domain panels" className="h-full w-full object-cover" loading="lazy" decoding="async" />
            <div className="pointer-events-none absolute inset-0" style={{
              background: "linear-gradient(to right, #0F1219 0%, transparent 20%, transparent 80%, var(--surface-1) 100%), linear-gradient(to bottom, #0F1219 0%, transparent 15%, transparent 85%, var(--surface-1) 100%)",
            }} />
            <div className="pointer-events-none absolute -inset-4 -z-10" style={{
              background: "radial-gradient(ellipse, rgba(8,145,178,0.05) 0%, transparent 70%)",
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}
