import { useState } from "react";
import { home } from "../../content/site-content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <h2
          className="text-center text-3xl font-bold md:text-4xl lg:text-5xl"
          style={{ color: "var(--text-primary)" }}
        >
          Frequently Asked{" "}
          <span style={{ color: "var(--accent-primary)" }}>Questions</span>
        </h2>

        <div className="mx-auto mt-12 max-w-3xl md:mt-16">
          {home.faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="transition-colors duration-200"
                style={{
                  borderBottom: "1px solid var(--border-subtle)",
                  borderLeft: isOpen
                    ? "2px solid var(--accent-primary)"
                    : "2px solid transparent",
                  background: isOpen
                    ? "rgba(244, 121, 32, 0.02)"
                    : "transparent",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left transition-colors duration-200"
                >
                  <span
                    className="text-base font-medium md:text-lg"
                    style={{
                      color: isOpen
                        ? "var(--text-primary)"
                        : "var(--text-secondary)",
                    }}
                  >
                    {item.question}
                  </span>
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      background: isOpen
                        ? "var(--accent-primary)"
                        : "rgba(255, 255, 255, 0.05)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill={isOpen ? "#fff" : "var(--text-muted)"}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transitionTimingFunction: "var(--ease-out-expo)",
                  }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="px-4 pb-5 text-sm leading-relaxed md:text-base"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
