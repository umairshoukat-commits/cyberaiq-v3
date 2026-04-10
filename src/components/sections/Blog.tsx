import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import Card from "../ui/Card";
import { home } from "../../content/site-content";

export default function Blog() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll(".blog-card");
      if (!cards?.length) return;

      gsap.set(cards, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          });
        },
      });
    },
    { scope: gridRef }
  );

  return (
    <section
      className="py-12 md:py-16 lg:py-24"
      style={{ background: "var(--surface-1)" }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <h2
          className="text-center text-3xl font-bold md:text-4xl lg:text-5xl"
          style={{ color: "var(--text-primary)" }}
        >
          Knowledge and Cases that{" "}
          <span style={{ color: "var(--accent-primary)" }}>inspire</span>
        </h2>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3"
        >
          {home.knowledge.posts.map((post, i) => (
            <div key={i} className="blog-card">
              <Card className="h-full">
                {/* Image placeholder */}
                <div
                  className="mb-5 aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-sm)]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(244,121,32,0.06) 0%, rgba(43,126,193,0.06) 100%)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{ color: "var(--text-muted)", opacity: 0.3 }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-10 w-10">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                </div>
                <span
                  className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{
                    color: "var(--accent-primary)",
                    background: "rgba(244, 121, 32, 0.10)",
                  }}
                >
                  Blogpost
                </span>
                <h3
                  className="mt-3 text-base font-semibold leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {post.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {post.excerpt}
                </p>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-8">
          {home.knowledge.ctas.map((label, i) => (
            <a
              key={i}
              href="#"
              className="text-sm font-semibold transition-colors duration-200"
              style={{ color: "var(--accent-primary)" }}
            >
              {label} &rarr;
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
