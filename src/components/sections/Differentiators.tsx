import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { home } from "../../content/site-content";

function OrangeCheck() {
  return (
    <span
      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
      style={{ background: "rgba(244, 121, 32, 0.15)" }}
    >
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 20 20"
        fill="var(--accent-primary)"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

export default function Differentiators() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      const items = el.querySelectorAll(".diff-item");
      if (items.length) {
        gsap.set(items, { opacity: 0, x: -20 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => gsap.to(items, { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }),
        });
      }

      // Image parallax
      const img = el.querySelector(".diff-image");
      if (img) {
        gsap.set(img, { opacity: 0, scale: 0.95 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => gsap.to(img, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }),
        });
        gsap.to(img, {
          y: 30,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    // [MASTER.md §6a Stage 3] bg normalized to alternation rhythm
    <section className="py-12 md:py-16 lg:py-24" style={{ background: "#0F0F0F" }}>
      <div
        ref={sectionRef}
        className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — content */}
          <div>
            <h2
              className="text-3xl font-bold md:text-4xl lg:text-5xl"
              style={{ color: "var(--text-primary)" }}
            >
              What Makes Us{" "}
              <span style={{ color: "var(--accent-primary)" }}>Different</span>
            </h2>
            <p
              className="mt-3 text-sm font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              {home.differentiators.subheading}
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              {home.differentiators.points.map((point, i) => (
                <li
                  key={i}
                  className="diff-item flex items-start gap-3"
                >
                  <OrangeCheck />
                  <span
                    className="text-sm font-medium md:text-base"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <p
              className="mt-8 text-base leading-relaxed md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {home.differentiators.body}
            </p>
          </div>

          <div className="diff-image relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <img src="/images/selections/differentiator.webp" alt="Operations room with teal displays and monitoring screens" className="h-full w-full object-cover" loading="lazy" decoding="async" />
            <div className="pointer-events-none absolute inset-0" style={{
              background: "linear-gradient(to right, var(--surface-0) 0%, transparent 20%, transparent 80%, var(--surface-0) 100%), linear-gradient(to bottom, var(--surface-0) 0%, transparent 15%, transparent 85%, var(--surface-0) 100%)",
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
