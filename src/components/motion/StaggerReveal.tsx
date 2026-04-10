import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

interface Props {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}

function shouldSkip() {
  if (typeof window === "undefined") return false;
  if (new URLSearchParams(window.location.search).get("static") === "1") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return false;
}

export default function StaggerReveal({
  children,
  stagger = 0.1,
  delay = 0,
  y = 30,
  duration = 0.7,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(":scope > *");
    if (!items.length) return;

    if (shouldSkip()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(items, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(items, { opacity: 1, y: 0, duration, delay, stagger, ease: "power3.out" });
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
