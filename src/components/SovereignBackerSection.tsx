import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Handshake, ArrowRight } from "lucide-react";

const paths = [
  {
    id: "users",
    label: "USERS",
    title: "Founding Members (Beta)",
    oneLiner: "Get invited to the private beta.",
    icon: Users,
    bullets: [
      "Priority beta access (rolling cohorts)",
      "Founder-led onboarding",
      "Direct feedback channel",
      "Early pricing when plans launch",
    ],
    cta: "Request beta invite",
    microcopy: "No payment. Invite-only.",
  },
  {
    id: "funding",
    label: "FUNDING",
    title: "Partners (Capital + Strategic)",
    oneLiner: "Help fund development and shape the roadmap.",
    icon: Handshake,
    bullets: [
      "Early access to product + roadmap",
      "Monthly build updates + demos",
      "Direct line to founders",
      "Priority integration requests",
    ],
    cta: "Talk to the founders",
    microcopy: "For strategic partners and angels.",
  },
];

const SovereignBackerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="backer"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#0B0812", padding: "120px 0" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, hsl(270 60% 40% / 0.06), transparent 70%)",
        }}
      />

      <div className="max-w-[960px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block mb-4 uppercase tracking-[0.14em]"
            style={{
              fontSize: "12px",
              color: "rgba(242, 180, 92, 0.8)",
            }}
          >
            Access
          </span>
          <h2
            className="font-semibold text-white mb-5"
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.15,
            }}
          >
            <span className="gradient-text">Choose</span> your path
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{ fontSize: "16px", color: "rgba(255,255,255,0.55)" }}
          >
            SITA is rolling out in small cohorts — and we're also opening a
            limited partner round.
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
              className="flex flex-col rounded-2xl"
              style={{
                background: "#120E1A",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "36px",
              }}
            >
              {/* Label */}
              <span
                className="uppercase tracking-[0.12em] mb-6"
                style={{
                  fontSize: "11px",
                  color: "rgba(242, 180, 92, 0.6)",
                }}
              >
                {path.label}
              </span>

              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <path.icon
                  className="w-5 h-5"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                />
              </div>

              {/* Title + one-liner */}
              <h3
                className="font-semibold text-white mb-2"
                style={{ fontSize: "20px" }}
              >
                {path.title}
              </h3>
              <p
                className="mb-6"
                style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)" }}
              >
                {path.oneLiner}
              </p>

              {/* Bullets */}
              <ul className="space-y-3 mb-8 flex-1">
                {path.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3"
                    style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "rgba(242, 180, 92, 0.5)" }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all hover:opacity-90"
                style={{
                  fontSize: "14px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
              >
                {path.cta}
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Microcopy */}
              <p
                className="text-center mt-3"
                style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}
              >
                {path.microcopy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SovereignBackerSection;
