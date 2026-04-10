import { useRef, type ReactNode, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const sizeStyles: Record<Size, string> = {
  sm: "px-6 py-2.5 text-xs",
  md: "px-9 py-3.5 text-[15px]",
  lg: "px-9 py-3.5 text-[15px]",
};

const variantBase: Record<Variant, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, #F97316 0%, #E84393 50%, #8B5CF6 100%)",
    backgroundSize: "200% 200%",
    backgroundPosition: "0% 50%",
    color: "#fff",
    border: "none",
    boxShadow: "0 0 12px rgba(232, 67, 147, 0.15)",
  },
  secondary: {
    background: "transparent",
    color: "rgba(255,255,255,0.85)",
    border: "1.5px solid rgba(255,255,255,0.2)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid transparent",
  },
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) return;

    xTo.current = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    yTo.current = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    const handleMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      xTo.current?.((e.clientX - (left + width / 2)) * 0.15);
      yTo.current?.((e.clientY - (top + height / 2)) * 0.15);
    };
    const handleLeave = () => { xTo.current?.(0); yTo.current?.(0); };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => { el.removeEventListener("mousemove", handleMove); el.removeEventListener("mouseleave", handleLeave); };
  }, []);

  const Tag: ElementType = href ? "a" : "button";
  const extraProps = href ? { href } : { type, onClick };

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (variant === "primary") {
      el.style.backgroundPosition = "100% 50%";
      el.style.filter = "brightness(1.08)";
      el.style.transform = "translateY(-2px)";
      el.style.boxShadow = "0 0 15px rgba(249,115,22,0.4), 0 0 30px rgba(232,67,147,0.25), 0 0 60px rgba(139,92,246,0.15)";
      el.style.animation = "glow-pulse 2s ease-in-out infinite";
    } else if (variant === "secondary") {
      el.style.borderColor = "rgba(255,255,255,0.5)";
      el.style.background = "rgba(255,255,255,0.05)";
      el.style.transform = "translateY(-1px)";
    }
  };

  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (variant === "primary") {
      el.style.backgroundPosition = "0% 50%";
      el.style.filter = "";
      el.style.transform = "";
      el.style.boxShadow = "0 0 12px rgba(232, 67, 147, 0.15)";
      el.style.animation = "";
    } else if (variant === "secondary") {
      el.style.borderColor = "rgba(255,255,255,0.2)";
      el.style.background = "transparent";
      el.style.transform = "";
    }
  };

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      {...extraProps}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ${sizeStyles[size]} ${className}`}
      style={{
        ...variantBase[variant],
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </Tag>
  );
}
