import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

function shouldSkip() {
  if (typeof window === "undefined") return false;
  if (new URLSearchParams(window.location.search).get("static") === "1") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return false;
}

export default function ScrollReveal({
  children,
  delay = 0,
  y = 40,
  duration = 0.8,
  once = true,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (shouldSkip()) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    gsap.set(el, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration, delay, ease: "power3.out" });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
