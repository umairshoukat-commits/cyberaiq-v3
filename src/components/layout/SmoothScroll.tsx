import { useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

export default function SmoothScroll({ children }: { children?: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Disable Lenis on mobile — native scroll is already smooth
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    let lenis = new Lenis({ lerp: 0.1, smoothTouch: false, autoRaf: false });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tickerCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const handleBeforeSwap = () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };

    const handlePageLoad = () => {
      lenis = new Lenis({ lerp: 0.1, smoothTouch: false, autoRaf: false });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
    };

    document.addEventListener("astro:before-swap", handleBeforeSwap);
    document.addEventListener("astro:page-load", handlePageLoad);

    return () => {
      document.removeEventListener("astro:before-swap", handleBeforeSwap);
      document.removeEventListener("astro:page-load", handlePageLoad);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
