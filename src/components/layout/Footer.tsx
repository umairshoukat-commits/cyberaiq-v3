import { footer } from "../../content/site-content";

export default function Footer() {
  return (
    <footer role="contentinfo" aria-label="Footer" style={{ background: "var(--surface-1)", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-10 md:py-16 lg:px-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo + description */}
          <div>
            <a href="/" className="inline-block">
              <img src="/logo.png" alt="CyberAIQ AG" className="h-8 w-auto" width="207" height="32" />
            </a>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Converging trust in the Age of AI, Cloud, Cyber &amp; Quantum
            </p>
          </div>

          {/* Organization links */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Organization
            </p>
            <ul className="flex flex-col gap-2.5">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} aria-label={`${link.label} - footer navigation`} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "var(--text-secondary)" }}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/partners" aria-label="Partners - footer navigation" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "var(--text-secondary)" }}>Partners</a>
              </li>
              <li>
                <a href="/ai-resilience" aria-label="AI Resilience - footer navigation" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "var(--text-secondary)" }}>AI Resilience</a>
              </li>
            </ul>
          </div>

          {/* Contact + LinkedIn */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Contact
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href={`mailto:${footer.email}`} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "var(--text-secondary)" }}>
                  {footer.email}
                </a>
              </li>
              <li>
                <a href={`tel:${footer.phone}`} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "var(--text-secondary)" }}>
                  {footer.phone}
                </a>
              </li>
              <li>
                <a
                  href={footer.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-white"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Location with Google Maps */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Location
            </p>
            <div className="overflow-hidden rounded-[var(--radius-md)]" style={{ border: "1px solid var(--border-subtle)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.168!2d55.264!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEyJzE3LjMiTiA1NcKwMTUnNTAuNCJF!5e0!3m2!1sen!2sae!4v1"
                width="100%"
                height="140"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) brightness(0.6) contrast(1.2)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CyberAIQ AG Office Location"
              />
            </div>
            <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
              Cloud Spaces – Circle Mall, Dubai
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 pt-6 md:flex-row" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{footer.copyright}</p>
          <div className="flex gap-6">
            {footer.legal.map((link) => (
              <a key={link.href} href={link.href} className="text-xs transition-colors duration-200 hover:text-white" style={{ color: "var(--text-muted)" }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
