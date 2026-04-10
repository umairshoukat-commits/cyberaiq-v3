import Button from "../ui/Button";
import { home } from "../../content/site-content";

export default function Hero() {
  return (
    <section
      className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden pt-32 pb-16 md:pt-[180px] md:pb-24"
      style={{ backgroundColor: "#050510" }}
    >
      {/* Layer 0: hero-bg */}
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <img
          src="/images/selections/hero-bg.webp"
          alt=""
          className="h-full w-full object-cover"
          style={{ opacity: 0.08 }}
        />
      </div>

      {/* Layer 0: 4 animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }} aria-hidden="true">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="hero-blob hero-blob-4" />
      </div>

      {/* Layer 2: text content — CSS load animation, no scroll trigger */}
      <div className="relative z-[2] mx-auto max-w-[1280px] px-6 text-center md:px-12 lg:px-20">
        <h1
          className="hero-heading mx-auto max-w-6xl font-extrabold tracking-tight"
          style={{ fontSize: "clamp(36px, 5.5vw, 68px)", lineHeight: 1.05 }}
        >
          Converging trust in the Age of{" "}
          <br className="hidden md:block" />
          <span style={{ color: "#F97316" }}>
            AI, Cloud, Cyber &amp; Quantum
          </span>
        </h1>

        <p
          className="hero-subtext mx-auto mb-10 mt-8 max-w-2xl text-lg md:text-xl lg:text-2xl"
          style={{ color: "var(--text-secondary)" }}
        >
          {home.hero.body}
        </p>

        <div className="hero-cta">
          <Button href="/contact" variant="primary" size="lg">
            {home.hero.cta} &rarr;
          </Button>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3]"
        style={{
          height: "200px",
          background: "linear-gradient(to bottom, transparent, var(--surface-0))",
        }}
      />

      <style>{`
        .hero-section::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.10;
          mix-blend-mode: soft-light;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .hero-blob-1 {
          width: 50vw; height: 50vh;
          background: radial-gradient(circle, rgba(8,145,178,0.5) 0%, transparent 70%);
          top: 10%; left: 20%;
          animation: drift1 30s ease-in-out infinite alternate;
        }
        .hero-blob-2 {
          width: 60vw; height: 60vh;
          background: radial-gradient(circle, rgba(76,29,149,0.45) 0%, transparent 70%);
          top: 30%; right: 10%;
          animation: drift2 25s ease-in-out infinite alternate;
        }
        .hero-blob-3 {
          width: 45vw; height: 45vh;
          background: radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%);
          bottom: 10%; left: 40%;
          animation: drift3 35s ease-in-out infinite alternate;
        }
        .hero-blob-4 {
          width: 40vw; height: 40vh;
          background: radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%);
          top: 50%; right: 30%;
          animation: drift4 40s ease-in-out infinite alternate;
        }

        @keyframes drift1 { from { transform: translate(0,0); } to { transform: translate(30px,-40px); } }
        @keyframes drift2 { from { transform: translate(0,0); } to { transform: translate(-40px,30px); } }
        @keyframes drift3 { from { transform: translate(0,0); } to { transform: translate(20px,50px); } }
        @keyframes drift4 { from { transform: translate(0,0); } to { transform: translate(-50px,-20px); } }

        @keyframes hero-fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-heading {
          animation: hero-fade-in 0.8s ease-out forwards;
        }
        .hero-subtext {
          opacity: 0;
          animation: hero-fade-in 0.8s ease-out 0.2s forwards;
        }
        .hero-cta {
          opacity: 0;
          animation: hero-fade-in 0.8s ease-out 0.4s forwards;
        }

        @media (max-width: 768px) {
          .hero-blob { filter: blur(60px); }
          .hero-blob-1, .hero-blob-2, .hero-blob-3, .hero-blob-4 { width: 70vw; height: 70vh; opacity: 0.7; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-heading, .hero-subtext, .hero-cta {
            animation: none !important;
            opacity: 1 !important;
          }
          .hero-blob { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
