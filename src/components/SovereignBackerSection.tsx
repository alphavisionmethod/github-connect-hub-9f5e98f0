import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

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
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent border border-accent/20 mb-4">
            FINAL STEP
          </span>
          <h2
            className="font-semibold text-white mb-5"
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.15,
            }}
          >
            Request access
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{ fontSize: "16px", color: "rgba(255,255,255,0.55)" }}
          >
            Choose beta access or partner access. Both are invite-only.
          </p>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-lg mx-auto rounded-2xl text-center"
          style={{
            background: "rgba(18, 14, 26, 0.7)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(16px)",
            padding: "48px 40px",
          }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            {/* Primary — gradient button */}
            <button
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-medium transition-all hover:opacity-90"
              style={{
                fontSize: "14px",
                background: "linear-gradient(135deg, hsl(270 91% 55%), hsl(38 95% 54%))",
                color: "#fff",
                border: "none",
              }}
            >
              Request beta invite
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary — outlined */}
            <button
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-medium transition-all hover:bg-white/5"
              style={{
                fontSize: "14px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
              }}
            >
              Talk to the founders
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
            No spam. Invite-only. Governance first.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SovereignBackerSection;
