import Button from "../ui/Button";

export default function PreFooterCTA() {
  return (
    // [MASTER.md §6a Stage 3] bg normalized to alternation rhythm
    <section className="py-12 md:py-16 lg:py-24" style={{ background: "#0F0F0F" }}>
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <h2
          className="text-3xl font-bold md:text-4xl lg:text-5xl"
          style={{ color: "var(--text-primary)" }}
        >
          Ready to{" "}
          <span style={{ color: "var(--accent-primary)" }}>
            Converge Trust?
          </span>
        </h2>
        <p
          className="mt-5 text-base leading-relaxed md:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Transformation starts with clarity.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/contact" variant="primary" size="lg">
            Start a Strategic Conversation &rarr;
          </Button>
          <Button href="/services" variant="secondary" size="lg">
            Explore Our Services
          </Button>
        </div>
      </div>
      {/* Teal glow separator */}
      <div className="mx-auto mt-16 h-px w-[80%] max-w-[800px]" style={{
        background: "linear-gradient(90deg, transparent, rgba(8,145,178,0.4) 20%, rgba(6,182,212,0.6) 50%, rgba(8,145,178,0.4) 80%, transparent)",
      }} />
    </section>
  );
}
