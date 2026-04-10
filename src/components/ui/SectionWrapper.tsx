import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export default function SectionWrapper({
  children,
  className = "",
  animate = true,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!animate) return;
      const el = sectionRef.current;
      if (!el) return;

      const items = el.querySelectorAll(":scope > *");
      if (items.length === 0) return;

      gsap.set(items, { y: 40, opacity: 0 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={`mx-auto max-w-[1280px] px-6 py-16 md:px-10 lg:px-20 lg:py-24 ${className}`}
    >
      {children}
    </section>
  );
}
