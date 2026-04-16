import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { home } from "../../content/site-content";

const fields = home.contactForm.fields;

export default function ContactForm() {
  const [interests, setInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"" | "success" | "error">("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    const form = el.querySelector("form, .success-message");
    if (form) {
      gsap.set(form, { opacity: 0, x: -30 });
      ScrollTrigger.create({
        trigger: el, start: "top 90%", once: true,
        onEnter: () => gsap.to(form, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }),
      });
    }
    const img = imageRef.current;
    if (img) {
      gsap.set(img, { opacity: 0, scale: 0.95 });
      ScrollTrigger.create({
        trigger: el, start: "top 90%", once: true,
        onEnter: () => gsap.to(img, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }),
      });
      gsap.to(img, { y: 25, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    }
  }, { scope: sectionRef });

  const toggleInterest = (option: string) => {
    setInterests((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("access_key", "225485b4-a4fa-4e6d-abd1-1cb0fd1ab0b1");
    formData.append("subject", "New Contact Form Submission — CyberAIQ Website");
    formData.append("from_name", "CyberAIQ Website");
    if (interests.length > 0) {
      formData.append("area_of_interest", interests.join(", "));
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setInterests([]);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // [MASTER.md §6a Stage 3] bg normalized to alternation rhythm
    <section className="py-12 md:py-16 lg:py-24" style={{ background: "#0F0F0F" }}>
      <div ref={sectionRef} className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl lg:text-5xl" style={{ color: "var(--text-primary)" }}>
          Get <span style={{ color: "var(--accent-primary)" }}>In Touch</span>
        </h2>

        <div className="mt-12 grid items-stretch gap-12 md:mt-16 lg:grid-cols-2 lg:gap-20">
          {status === "success" ? (
            <div className="success-message flex flex-col items-center justify-center gap-6 py-16 text-center transition-opacity duration-300">
              <svg className="h-16 w-16" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" stroke="#10B981" strokeWidth="3" />
                <path d="M20 33l8 8 16-16" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                Message Sent Successfully
              </h3>
              <p style={{ color: "var(--text-secondary)" }}>
                Thank you for reaching out. We&apos;ll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setStatus("")}
                className="mt-4 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200"
                style={{ border: "1.5px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.85)" }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Honeypot — spam protection */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
              {/* Reply-to */}
              <input type="hidden" name="replyto" id="replyto-hidden" />

              {fields.map((field) => {
                if ("options" in field && field.options) {
                  return (
                    <fieldset key={field.name}>
                      <legend className="mb-2 block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        {field.label}
                        {field.required && <span style={{ color: "var(--accent-primary)" }}> *</span>}
                      </legend>
                      <div className="flex flex-wrap gap-2" role="group" aria-label={field.label}>
                        {field.options.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleInterest(option)}
                            className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:border-white/30"
                            style={{
                              background: interests.includes(option)
                                ? "linear-gradient(135deg, #F97316 0%, #E84393 50%, #8B5CF6 100%)"
                                : "rgba(255, 255, 255, 0.03)",
                              color: interests.includes(option) ? "#fff" : "var(--text-secondary)",
                              border: interests.includes(option) ? "1px solid transparent" : "1px solid var(--border-default)",
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  );
                }

                if (field.name === "message") {
                  return (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="mb-2 block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        {field.label} {field.required && <span style={{ color: "var(--accent-primary)" }}>*</span>}
                      </label>
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={4}
                        required={field.required}
                        className="w-full rounded-[var(--radius-md)] px-4 py-3 text-sm outline-none transition-all duration-200"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-default)", color: "var(--text-primary)", resize: "vertical" }}
                      />
                    </div>
                  );
                }

                return (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="mb-2 block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                      {field.label}
                      {field.required && <span style={{ color: "var(--accent-primary)" }}> *</span>}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.name === "email" ? "email" : "text"}
                      required={field.required}
                      onChange={field.name === "email" ? (e) => {
                        const hidden = document.getElementById("replyto-hidden") as HTMLInputElement;
                        if (hidden) hidden.value = e.target.value;
                      } : undefined}
                      className="w-full rounded-[var(--radius-md)] px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
                    />
                  </div>
                );
              })}

              {status === "error" && (
                <p className="text-sm text-red-400">
                  Something went wrong. Please try again or email us directly at{" "}
                  <a href="mailto:contact@cyberaiq.com" className="underline">contact@cyberaiq.com</a>
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-9 py-3.5 text-[15px] font-semibold text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #F97316 0%, #E84393 50%, #8B5CF6 100%)",
                  backgroundSize: "200% 200%",
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  home.contactForm.submitLabel
                )}
              </button>
            </form>
          )}

          <div ref={imageRef} className="relative h-[300px] w-full overflow-hidden rounded-xl lg:h-full lg:min-h-full">
            <img src="/images/selections/Contact.webp" alt="Dubai skyline featuring the Museum of the Future" className="h-full w-full object-cover object-bottom" loading="lazy" decoding="async" />
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to right, var(--surface-0) 0%, transparent 10%, transparent 90%, var(--surface-0) 100%), linear-gradient(to bottom, var(--surface-0) 0%, transparent 10%, transparent 90%, var(--surface-0) 100%)" }} />
            <div className="pointer-events-none absolute -inset-5 -z-10" style={{ background: "radial-gradient(ellipse, rgba(8,145,178,0.05) 0%, transparent 70%)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
