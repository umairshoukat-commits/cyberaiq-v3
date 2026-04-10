import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

interface Props {
  from?: number;
  to: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}

function shouldSkip() {
  if (typeof window === "undefined") return false;
  if (new URLSearchParams(window.location.search).get("static") === "1") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return false;
}

export default function CountUp({
  from = 0,
  to,
  suffix = "",
  duration = 2.5,
  decimals = 0,
  className = "",
  style,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const obj = useRef({ val: from });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (shouldSkip()) {
      el.textContent = to.toFixed(decimals) + suffix;
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(obj.current, {
          val: to,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = obj.current.val.toFixed(decimals) + suffix;
          },
        });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <span ref={ref} className={className} style={style}>
      {from.toFixed(decimals)}{suffix}
    </span>
  );
}
