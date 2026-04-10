import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  start?: string;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  from = { y: 40, opacity: 0 },
  to = { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
  start = "top 90%",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (ref.current) ref.current.style.animation = "none";
      gsap.fromTo(ref.current, from, {
        ...to,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} data-scroll-reveal className={`scroll-reveal-init ${className}`}>
      {children}
    </div>
  );
}
