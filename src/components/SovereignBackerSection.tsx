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
      style={{ background: "#0B0812", paddingTop: 128, paddingBottom: 128 }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "60%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)",
        }}
      />

      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, hsl(270 60% 40% / 0.06), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto px-6" style={{ maxWidth: 1040 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent border border-accent/20 mb-4">
            FINAL STEP
          </span>
          <h2
            className="font-semibold text-white mb-5"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.15 }}
          >
            Request access
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{ fontSize: "16px", color: "rgba(255,255,255,0.55)" }}
          >
            Choose beta access or partner access. Both are invite-only.
          </p>
          <p
            className="max-w-xl mx-auto mt-3"
            style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}
          >
            We review every request. Small cohorts only.
          </p>
        </motion.div>

        {/* Two mini cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto"
          style={{ maxWidth: 800, marginTop: 48 }}
        >
          {/* Beta card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "36px 32px",
            }}
          >
            {/* Gradient top border */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: 2,
                background:
                  "linear-gradient(90deg, hsl(270 91% 55%), hsl(38 95% 54%))",
              }}
            />
            <h3
              className="font-semibold text-white mb-2"
              style={{ fontSize: "19px" }}
            >
              Founding Members (Beta)
            </h3>
            <p
              className="mb-7 flex-1"
              style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}
            >
              Priority access to the private beta.
            </p>
            <button
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all hover:bg-white/5"
              style={{
                fontSize: "14px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
              }}
            >
              Request beta invite
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Partners card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "36px 32px",
            }}
          >
            {/* Gradient top border */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: 2,
                background:
                  "linear-gradient(90deg, hsl(270 91% 55%), hsl(38 95% 54%))",
              }}
            />
            <h3
              className="font-semibold text-white mb-2"
              style={{ fontSize: "19px" }}
            >
              Partners (Capital + Strategic)
            </h3>
            <p
              className="mb-7 flex-1"
              style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}
            >
              Fund development and shape the roadmap.
            </p>
            <button
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all hover:opacity-90"
              style={{
                fontSize: "14px",
                background:
                  "linear-gradient(135deg, hsl(270 91% 55%), hsl(38 95% 54%))",
                border: "none",
                color: "#fff",
              }}
            >
              Talk to the founders
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
          style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: 32 }}
        >
          No spam. Invite-only. Governance first.
        </motion.p>
      </div>
    </section>
  );
};

export default SovereignBackerSection;
