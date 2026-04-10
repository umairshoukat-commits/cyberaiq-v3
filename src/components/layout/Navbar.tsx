import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { nav } from "../../content/site-content";

const desktopLinks = nav.links;
const ctaButton = nav.cta;
const allMobileLinks = [...nav.links, { label: ctaButton.label, href: ctaButton.href }];

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pathname, setPathname] = useState("/");

  useEffect(() => {
    setPathname(window.location.pathname.replace(/\/$/, "") || "/");
  }, []);

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        onUpdate: (self) => {
          const el = headerRef.current;
          if (!el) return;
          if (self.direction === 1 && self.scroll() > 80) el.classList.add("nav-scrolled");
          if (self.scroll() <= 80) el.classList.remove("nav-scrolled");
        },
      });
    },
    { scope: headerRef }
  );

  const isActive = (href: string) => {
    const clean = href.replace(/\/$/, "") || "/";
    return pathname === clean;
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300"
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      >
        <nav aria-label="Main navigation" className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 md:px-10 lg:px-20">
          <a href="/" className="relative z-10 shrink-0">
            <img src="/logo.png" alt="CyberAIQ AG" className="h-8 w-auto" width="207" height="32" />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {desktopLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-medium transition-colors duration-300"
                style={{
                  color: isActive(link.href) ? "var(--accent-primary)" : "var(--text-secondary)",
                  transitionTimingFunction: "var(--ease-out-expo)",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={ctaButton.href}
            className="hidden lg:inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #F97316 0%, #E84393 50%, #8B5CF6 100%)",
              backgroundSize: "200% 200%",
              backgroundPosition: "0% 50%",
              color: "#fff",
              boxShadow: "0 0 12px rgba(232, 67, 147, 0.15)",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.backgroundPosition = "100% 50%"; el.style.filter = "brightness(1.08)"; el.style.boxShadow = "0 0 10px rgba(249,115,22,0.35), 0 0 30px rgba(232,67,147,0.2)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.backgroundPosition = "0% 50%"; el.style.filter = ""; el.style.boxShadow = "0 0 12px rgba(232, 67, 147, 0.15)"; }}
          >
            {ctaButton.label}
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Toggle menu"
          >
            <span className="block h-[2px] w-5 transition-all duration-300 origin-center" style={{ background: "var(--text-primary)", transform: mobileOpen ? "translateY(5px) rotate(45deg)" : "none" }} />
            <span className="block h-[2px] w-5 transition-all duration-300" style={{ background: "var(--text-primary)", opacity: mobileOpen ? 0 : 1 }} />
            <span className="block h-[2px] w-5 transition-all duration-300 origin-center" style={{ background: "var(--text-primary)", transform: mobileOpen ? "translateY(-5px) rotate(-45deg)" : "none" }} />
          </button>
        </nav>

        <style>{`
          .nav-scrolled { background: rgba(17,17,22,0.85); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border-bottom: 1px solid var(--border-subtle); }
          .nav-link:hover { color: var(--text-primary) !important; }
        `}</style>
      </header>

      <div className="fixed inset-0 z-40 transition-opacity duration-300 lg:hidden" style={{ opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? "auto" : "none", background: "rgba(10,10,15,0.6)", backdropFilter: "blur(4px)" }} onClick={() => setMobileOpen(false)} />

      <div className="fixed top-0 right-0 bottom-0 w-[300px] flex flex-col pt-24 px-8 pb-8 transition-transform duration-500 lg:hidden" style={{ background: "var(--surface-1)", borderLeft: "1px solid var(--border-subtle)", transform: mobileOpen ? "translateX(0)" : "translateX(100%)", transitionTimingFunction: "var(--ease-out-expo)", zIndex: 45 }}>
        <div className="flex flex-col gap-2">
          {allMobileLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200" style={{ color: isActive(link.href) ? "var(--accent-primary)" : "var(--text-secondary)" }}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="mt-auto">
          <a href={ctaButton.href} onClick={() => setMobileOpen(false)} className="flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300" style={{ background: "linear-gradient(135deg, #F97316 0%, #E84393 50%, #8B5CF6 100%)", color: "#fff" }}>
            {ctaButton.label}
          </a>
        </div>
      </div>
    </>
  );
}
