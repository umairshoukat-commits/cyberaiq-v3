import { useEffect, useRef } from "react";
import { home } from "../../content/site-content";
import { MicrosoftLogo, AWSLogo, GoogleCloudLogo } from "../ui/HyperscalerLogos";

const logoSet = [
  <MicrosoftLogo key="ms" className="h-6 w-auto md:h-11" />,
  <AWSLogo key="aws" className="h-6 w-auto md:h-11" />,
  <GoogleCloudLogo key="gc" className="h-6 w-auto md:h-11" />,
];

export default function HyperscalerTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const singleSetWidth = track.scrollWidth / 2;
    const speed = 0.8;

    function animate() {
      posRef.current -= speed;
      if (posRef.current <= -singleSetWidth) {
        posRef.current = 0;
      }
      track!.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    // [MASTER.md §6a Stage 3] bg normalized to alternation rhythm
    <section className="py-12 md:py-16 lg:py-24" style={{ background: "#0F0F0F" }}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl" style={{ color: "var(--text-primary)", textWrap: "balance" }}>
            <span style={{ color: "var(--accent-primary)" }}>Hyperscalers</span> at the Core
          </h2>
          <p className="mt-4 text-base leading-relaxed md:text-lg" style={{ color: "var(--text-secondary)" }}>
            {home.hyperscalers.body}
          </p>
        </div>

        <div
          className="mt-12 overflow-hidden py-8 md:mt-16"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div
            ref={trackRef}
            className="flex items-center gap-8 md:gap-24"
            style={{ width: "max-content" }}
          >
            {/* Set A */}
            {logoSet.map((logo, i) => (
              <div key={`a${i}`} className="shrink-0" style={{ opacity: 0.45 }}>{logo}</div>
            ))}
            {/* Set B (duplicate for seamless loop) */}
            {logoSet.map((logo, i) => (
              <div key={`b${i}`} className="shrink-0" style={{ opacity: 0.45 }}>{logo}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
