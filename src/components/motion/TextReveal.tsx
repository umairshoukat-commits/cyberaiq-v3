import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

interface Props {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  stagger?: number;
}

function shouldSkip() {
  if (typeof window === "undefined") return false;
  if (new URLSearchParams(window.location.search).get("static") === "1") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return false;
}

export default function TextReveal({
  children,
  as: Tag = "h2",
  className = "",
  stagger = 0.04,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shouldSkip()) return;

    const text = el.textContent || "";
    const words = text.split(/\s+/).filter(Boolean);
    el.innerHTML = "";

    words.forEach((word, i) => {
      const outer = document.createElement("span");
      outer.style.display = "inline-block";
      outer.style.overflow = "hidden";
      outer.style.verticalAlign = "top";

      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.style.transform = "translateY(100%)";
      inner.textContent = word;
      inner.className = "text-reveal-word";

      outer.appendChild(inner);
      el.appendChild(outer);

      if (i < words.length - 1) {
        el.appendChild(document.createTextNode("\u00A0"));
      }
    });

    const wordEls = el.querySelectorAll(".text-reveal-word");

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(wordEls, { y: 0, duration: 0.9, stagger, ease: "expo.out" });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Tag>
  );
}
