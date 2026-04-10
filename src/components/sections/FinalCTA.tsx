import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import Button from "../ui/Button";
import { home } from "../../content/site-content";

export default function FinalCTA() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = contentRef.current;
      if (!el) return;

      const items = el.querySelectorAll(":scope > *");
      gsap.set(items, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          });
        },
      });
    },
    { scope: contentRef }
  );

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--surface-1)" }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(244,121,32,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 lg:px-20 lg:py-[100px]">
        <div
          ref={contentRef}
          className="relative mx-auto max-w-2xl text-center"
        >
          <h2
            className="text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            Start the{" "}
            <span style={{ color: "var(--accent-primary)" }}>Conversation</span>
          </h2>

          <p
            className="mt-6 text-base leading-relaxed md:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            {home.contactCta.body}
          </p>

          <div className="mt-10">
            <Button href="/contact" variant="primary" size="lg">
              {home.contactCta.cta}
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient accent line */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[1px] w-[60%] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-primary), transparent)",
          opacity: 0.3,
        }}
      />
    </section>
  );
}
