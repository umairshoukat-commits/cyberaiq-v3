// [MASTER.md §6b Stage 2] Simplified to true minimalism + orange accent word override
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "../../lib/gsap";

type PageVariant = "about" | "services" | "partners" | "careers" | "contact" | "ai-resilience";

const eyebrows: Record<PageVariant, string> = {
  about: "ABOUT",
  services: "SERVICES",
  partners: "PARTNERS",
  careers: "CAREERS",
  contact: "CONTACT",
  "ai-resilience": "AI RESILIENCE",
};

interface PageHeroProps {
  title: string;
  subtitle?: string;
  orange?: string;
  variant?: PageVariant;
  eyebrow?: string;
}

export default function PageHero({ title, subtitle, orange, variant = "services", eyebrow }: PageHeroProps) {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const eyebrowText = eyebrow ?? eyebrows[variant];

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
    if (lineRef.current) {
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
      tl.to(lineRef.current, { scaleX: 1, duration: 0.4, ease: "power3.out" }, "-=0.3");
    }
  }, []);

  return (
    <section
      className="page-hero relative pt-40 pb-12 md:pt-44 md:pb-16"
      style={{
        backgroundColor: "#0A0A0A",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 text-left md:px-10 lg:px-20">
        <p
          className="mb-5 text-xs font-medium uppercase"
          style={{ color: "#737373", letterSpacing: "0.15em" }}
        >
          {eyebrowText}
        </p>
        <h1
          ref={h1Ref}
          className="font-semibold"
          style={{
            color: "var(--text-primary)",
            fontSize: "clamp(36px, 5vw, 56px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
          }}
        >
          {orange ? (
            <>
              {title.split(orange)[0]}
              <span style={{ color: "var(--accent-primary)" }}>{orange}</span>
              {title.split(orange)[1] || ""}
            </>
          ) : (
            title
          )}
        </h1>
        {subtitle && (
          <p
            ref={subRef}
            className="mt-4 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            {subtitle}
          </p>
        )}
        <div
          ref={lineRef}
          className="mt-6"
          style={{ width: "48px", height: "1px", background: "var(--accent-primary)" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
