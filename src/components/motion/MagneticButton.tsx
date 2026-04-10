import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { gsap } from "../../lib/gsap";

interface Props {
  children: ReactNode;
  strength?: number;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  strength = 0.35,
  className = "",
  href,
  onClick,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (new URLSearchParams(window.location.search).get("static") === "1") return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const Tag: ElementType = href ? "a" : "div";
  const extraProps = href ? { href } : { onClick };

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`inline-block ${className}`}
      {...extraProps}
    >
      {children}
    </Tag>
  );
}
