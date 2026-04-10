import { useRef, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "../../lib/gsap";

interface AnimatedTextProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export default function AnimatedText({
  text,
  tag: Tag = "h2",
  className = "",
  delay = 0,
  style,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const split = SplitText.create(el, {
        type: "words",
        mask: "words",
        autoSplit: true,
      });

      gsap.set(split.words, { yPercent: 100 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(split.words, {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "power3.out",
            delay,
          });
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className} style={style}>
      {text}
    </Tag>
  );
}
