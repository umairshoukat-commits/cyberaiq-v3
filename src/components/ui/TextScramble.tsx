import { useEffect, useRef, useState } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function TextScramble({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const totalFrames = 30;

    const animate = () => {
      const progress = frame / totalFrames;
      const result = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (progress * text.length > i) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplay(result);
      frame++;

      if (frame <= totalFrames) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text]);

  return <span className={className}>{display}</span>;
}
