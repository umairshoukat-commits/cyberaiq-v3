import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "../../lib/gsap";

type PageVariant = "about" | "services" | "partners" | "careers" | "contact" | "ai-resilience";

const gradients: Record<PageVariant, [string, string]> = {
  about: [
    "radial-gradient(ellipse at 30% 40%, rgba(139,92,246,0.12) 0%, transparent 60%)",
    "radial-gradient(ellipse at 70% 60%, rgba(59,130,246,0.08) 0%, transparent 60%)",
  ],
  services: [
    "radial-gradient(ellipse at 30% 40%, rgba(6,182,212,0.15) 0%, transparent 60%)",
    "radial-gradient(ellipse at 70% 60%, rgba(59,130,246,0.08) 0%, transparent 60%)",
  ],
  partners: [
    "radial-gradient(ellipse at 30% 40%, rgba(249,115,22,0.10) 0%, transparent 60%)",
    "radial-gradient(ellipse at 70% 60%, rgba(139,92,246,0.08) 0%, transparent 60%)",
  ],
  careers: [
    "radial-gradient(ellipse at 30% 40%, rgba(129,140,248,0.14) 0%, transparent 60%)",
    "radial-gradient(ellipse at 70% 60%, rgba(6,182,212,0.08) 0%, transparent 60%)",
  ],
  contact: [
    "radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.10) 0%, transparent 60%)",
    "radial-gradient(ellipse at 70% 60%, rgba(8,145,178,0.06) 0%, transparent 60%)",
  ],
  "ai-resilience": [
    "radial-gradient(ellipse at 30% 40%, rgba(8,145,178,0.18) 0%, transparent 60%)",
    "radial-gradient(ellipse at 70% 60%, rgba(76,29,149,0.10) 0%, transparent 60%)",
  ],
};

interface PageHeroProps {
  title: string;
  subtitle?: string;
  orange?: string;
  variant?: PageVariant;
}

export default function PageHero({ title, subtitle, orange, variant = "services" }: PageHeroProps) {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const h1 = h1Ref.current;
    if (!h1) return;
    const split = SplitText.create(h1, { type: "words", mask: "words", autoSplit: true });
    gsap.set(split.words, { yPercent: 100 });
    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(split.words, { yPercent: 0, duration: 0.8, stagger: 0.04, ease: "power3.out" });
    if (subRef.current) {
      gsap.set(subRef.current, { opacity: 0, y: 16 });
      tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
    }
  }, []);

  const [glow1, glow2] = gradients[variant];

  return (
    <section
      className="page-hero relative flex min-h-[220px] items-end overflow-hidden pb-12 pt-32 md:min-h-[280px] md:pb-16 md:pt-[180px]"
      style={{ backgroundColor: "#0a0a1a" }}
    >
      {/* Gradient glows */}
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <div className="absolute inset-0" style={{ background: glow1 }} />
        <div className="absolute inset-0" style={{ background: glow2 }} />
      </div>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 1 }}>
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, transparent 60%, #0D1017 100%)",
        }} />
      </div>

      {/* Noise texture via ::after on .page-hero */}

      {/* Bottom separator */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0" style={{ zIndex: 2 }}>
        <div className="mx-auto h-px w-[60%] max-w-[600px]" style={{
          background: "linear-gradient(90deg, transparent, rgba(8,145,178,0.2), transparent)",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 text-center md:px-10 lg:px-20">
        <h1
          ref={h1Ref}
          className="text-4xl font-bold md:text-5xl lg:text-6xl"
          style={{ color: "var(--text-primary)" }}
        >
          {orange ? (
            <>
              {title.split(orange)[0]}
              <span style={{ color: "var(--accent-primary)" }}>{orange}</span>
              {title.split(orange)[1] || ""}
            </>
          ) : (
            <span style={{ color: "var(--accent-primary)" }}>{title}</span>
          )}
        </h1>
        {subtitle && (
          <p
            ref={subRef}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <style>{`
        .page-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.10;
          mix-blend-mode: soft-light;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  );
}
