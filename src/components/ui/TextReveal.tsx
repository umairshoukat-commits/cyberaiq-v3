import { useRef, type ReactNode, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "../../lib/gsap";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  stagger?: number;
  duration?: number;
  start?: string;
  delay?: number;
}

export default function TextReveal({
  children,
  className = "",
  as: Tag = "div",
  stagger = 0.05,
  duration = 0.7,
  start = "top 85%",
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      SplitText.create(ref.current, {
        type: "words,lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self: { words: Element[] }) {
          return gsap.from(self.words, {
            yPercent: 100,
            stagger,
            duration,
            delay,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ref.current,
              start,
              toggleActions: "play none none none",
            },
          });
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Tag>
  );
}
