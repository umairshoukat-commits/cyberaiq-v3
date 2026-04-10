import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0,
  className = "",
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const countRef = useRef({ value: 0 });

  useGSAP(
    () => {
      gsap.to(countRef.current, {
        value: end,
        duration,
        ease: "power2.out",
        snap: { value: decimals > 0 ? 1 / Math.pow(10, decimals) : 1 },
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent =
              prefix + countRef.current.value.toFixed(decimals) + suffix;
          }
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}0{suffix}
    </span>
  );
}
