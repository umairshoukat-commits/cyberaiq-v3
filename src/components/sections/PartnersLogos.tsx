import { partners } from "../../content/site-content";
import { MicrosoftLogo, AWSLogo, GoogleCloudLogo } from "../ui/HyperscalerLogos";
import TextReveal from "../ui/TextReveal";
import ScrollReveal from "../ui/ScrollReveal";

const logos = [
  { component: <MicrosoftLogo className="h-14 w-auto md:h-16" />, glow: "rgba(0, 164, 239, 0.12)" },
  { component: <AWSLogo className="h-14 w-auto md:h-16" />, glow: "rgba(255, 153, 0, 0.12)" },
  { component: <GoogleCloudLogo className="h-14 w-auto md:h-16" />, glow: "rgba(66, 133, 244, 0.12)" },
];

export default function PartnersLogos() {
  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <TextReveal as="h2" className="text-center text-3xl font-bold md:text-4xl lg:text-5xl">
          <span style={{ color: "var(--accent-primary)" }}>Hyperscalers</span>{" "}
          <span style={{ color: "var(--text-primary)" }}>at the Core</span>
        </TextReveal>
        <ScrollReveal delay={0.2} from={{ y: 30, opacity: 0 }} to={{ y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }}>
          <p className="mx-auto mt-4 max-w-3xl text-center text-base italic leading-relaxed md:text-lg" style={{ color: "var(--text-secondary)" }}>
            {partners.body}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4} from={{ y: 40, opacity: 0 }} to={{ y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }}>
          <div className="mt-16 flex flex-col items-center justify-center gap-16 md:flex-row md:gap-20">
            {logos.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-6 py-4 transition-all duration-400"
                style={{ opacity: 0.6 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.filter = `drop-shadow(0 0 24px ${logo.glow})`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.6";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.filter = "none";
                }}
              >
                {logo.component}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
