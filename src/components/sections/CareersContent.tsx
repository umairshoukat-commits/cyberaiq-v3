import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { careers } from "../../content/site-content";

function OrangeCheck() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="var(--accent-primary)">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

interface TwoColProps { heading: string; orangeWord: string; body: string; items: readonly string[]; closing?: string; imageLeft?: boolean; dark?: boolean; imageSrc?: string }

function SectionImage({ src, dark }: { src?: string; dark?: boolean }) {
  const bg = dark ? "var(--surface-1)" : "var(--surface-0)";
  if (!src) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl" style={{ background: "#0D1017", border: "1px solid var(--border-subtle)" }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      </div>
    );
  }
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
      <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
      <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(to right, ${bg} 0%, transparent 18%, transparent 82%, ${bg} 100%), linear-gradient(to bottom, ${bg} 0%, transparent 15%, transparent 85%, ${bg} 100%)` }} />
      <div className="pointer-events-none absolute -inset-5 -z-10" style={{ background: "radial-gradient(ellipse, rgba(8,145,178,0.05) 0%, transparent 70%)" }} />
    </div>
  );
}

function TwoColSection({ heading, orangeWord, body, items, closing, imageLeft = false, dark = false, imageSrc }: TwoColProps) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const els = ref.current?.querySelectorAll(".reveal-item");
    if (!els?.length) return;
    gsap.set(els, { opacity: 0, y: 20 });
    ScrollTrigger.create({ trigger: ref.current, start: "top 90%", once: true, onEnter: () => gsap.to(els, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power2.out" }) });
  }, { scope: ref });

  const content = (
    <div ref={ref}>
      <h3 className="text-2xl font-bold md:text-3xl" style={{ color: "var(--text-primary)" }}>
        {heading.split(orangeWord)[0]}<span style={{ color: "var(--accent-primary)" }}>{orangeWord}</span>{heading.split(orangeWord)[1] || ""}
      </h3>
      <p className="reveal-item mt-5 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }} dangerouslySetInnerHTML={{ __html: body.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>') }} />
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="reveal-item flex items-start gap-2.5 text-sm leading-relaxed md:text-base" style={{ color: "var(--text-secondary)" }}>
            <OrangeCheck />
            <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>') }} />
          </li>
        ))}
      </ul>
      {closing && <p className="reveal-item mt-5 text-base font-medium leading-relaxed" style={{ color: "var(--text-primary)" }} dangerouslySetInnerHTML={{ __html: closing.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />}
    </div>
  );

  return (
    <section className="py-12 md:py-16 lg:py-24" style={dark ? { background: "var(--surface-1)" } : undefined}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {imageLeft ? <><SectionImage src={imageSrc} dark={dark} />{content}</> : <>{content}<SectionImage src={imageSrc} dark={dark} /></>}
        </div>
      </div>
    </section>
  );
}

export default function CareersContent() {
  return (
    <>
      {/* Section 1: Who We Are (careers context) */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl" style={{ color: "var(--text-primary)" }}>
            Who <span style={{ color: "var(--accent-primary)" }}>We Are</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed md:text-lg" style={{ color: "var(--text-secondary)" }}>
            {careers.intro}
          </p>
        </div>
      </section>

      {/* Section 2: Who We Look For */}
      <TwoColSection
        heading={careers.whoWeLookFor.heading}
        orangeWord="Look For"
        body={careers.whoWeLookFor.body}
        items={careers.whoWeLookFor.traits}
        imageLeft
        dark
        imageSrc="/images/selections/Careers-team.webp"
      />

      {/* Section 3: What You'll Work On */}
      <TwoColSection
        heading={careers.whatYoullWorkOn.heading}
        orangeWord="Work On"
        body={careers.whatYoullWorkOn.body}
        items={careers.whatYoullWorkOn.areas}
        closing={careers.whatYoullWorkOn.note}
        imageSrc="/images/selections/Careers-team.webp"
      />

      {/* Section 4: How We Work */}
      <TwoColSection
        heading={careers.howWeWork.heading}
        orangeWord="We Work"
        body=""
        items={careers.howWeWork.points}
        closing={careers.howWeWork.closing}
        imageLeft
        dark
        imageSrc="/images/selections/Careers-team.webp"
      />

      {/* Section 5: Growth at CYBERAIQ AG */}
      <TwoColSection
        heading={careers.growth.heading}
        orangeWord="CYBERAIQ AG"
        body={careers.growth.body}
        items={careers.growth.points}
        closing={careers.growth.closing}
        imageSrc="/images/selections/careers-growth.webp"
      />

      {/* Section 6: Open Roles */}
      <TwoColSection
        heading={careers.openRoles.heading}
        orangeWord="Open Roles"
        body={careers.openRoles.body}
        items={careers.openRoles.roles}
        imageLeft
        dark
        imageSrc="/images/selections/careers-growth.webp"
      />

      {/* Section 7: CTA */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="text-base leading-relaxed md:text-lg" style={{ color: "var(--text-secondary)" }}>
            To explore opportunities, reach out to:
          </p>
          <a
            href={`mailto:${careers.openRoles.contact}`}
            className="mt-4 inline-block text-xl font-bold transition-colors duration-200 hover:underline md:text-2xl"
            style={{ color: "var(--accent-primary)" }}
          >
            {careers.openRoles.contact}
          </a>
        </div>
      </section>
    </>
  );
}
