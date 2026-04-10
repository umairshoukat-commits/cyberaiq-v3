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
      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="var(--accent-primary)">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

export default function WhoWeAre() {
  const listRef = useRef<HTMLUListElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = listRef.current?.querySelectorAll("li");
      if (items?.length) {
        gsap.set(items, { opacity: 0, x: -20 });
        ScrollTrigger.create({
          trigger: listRef.current,
          start: "top 90%",
          once: true,
          onEnter: () => gsap.to(items, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }),
        });
      }
      // Image parallax
      const img = imageRef.current;
      if (img) {
        gsap.to(img, {
          y: 30,
          ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    },
    { scope: listRef }
  );

  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl" style={{ color: "var(--text-primary)" }}>
              Who <span style={{ color: "var(--accent-primary)" }}>We Are</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed md:text-lg" style={{ color: "var(--text-secondary)" }}>
              {home.whoWeAre.body}
            </p>
            <ul ref={listRef} className="mt-6 flex flex-col gap-4">
              {home.whoWeAre.achievements.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <OrangeCheck />
                  <span className="text-sm leading-relaxed md:text-base" style={{ color: "var(--text-secondary)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base font-medium leading-relaxed md:text-lg" style={{ color: "var(--text-primary)" }}>
              {home.whoWeAre.closing}
            </p>
          </div>
          <div ref={imageRef} className="relative aspect-square w-full overflow-hidden rounded-xl">
            <img src="/images/selections/who-we-are.webp" alt="Executive briefing room with holographic data displays" className="h-full w-full object-cover" loading="lazy" decoding="async" />
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
