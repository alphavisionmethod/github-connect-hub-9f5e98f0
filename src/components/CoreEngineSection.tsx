import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Shield, UserCheck, Zap, Receipt } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Think",
    quote: ["SITA drafts decisions and plans actions.", "Nothing is executed yet."],
  },
  {
    icon: Shield,
    title: "Check",
    quote: ["You review, approve, edit, or reject.", "Clear context. No black boxes."],
  },
  {
    icon: UserCheck,
    title: "Approve",
    quote: "Should I proceed, or wait for you?",
  },
  {
    icon: Zap,
    title: "Act",
    quote: ["SITA executes only what you approved.", "Within strict permissions."],
  },
  {
    icon: Receipt,
    title: "Prove",
    quote: ["You receive a receipt:", "What happened, why, when, and by whom."],
  },
];

const CoreEngineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="core-engine"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#0B0812", padding: "120px 24px" }}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, hsl(270 91% 55% / 0.06), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: 72 }}
        >
          <span
            className="inline-block rounded-full uppercase"
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              color: "rgba(242,180,92,0.8)",
              padding: "4px 14px",
              border: "1px solid rgba(242,180,92,0.15)",
              marginBottom: 16,
            }}
          >
            How SITA Works
          </span>
          <h2
            className="mx-auto"
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 600,
              lineHeight: 1.15,
              color: "#FFFFFF",
              maxWidth: 900,
              marginTop: 16,
            }}
          >
            Think. Check. Act. <span className="gradient-text">Prove.</span>
          </h2>
          <p
            className="mx-auto"
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 700,
              marginTop: 20,
              lineHeight: 1.6,
            }}
          >
            Every AI should be accountable. SITA OS thinks through your request,
            checks it against your rules, acts only with permission,
            and gives you proof of what happened.
          </p>
        </motion.div>

        {/* Process cards — 5 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" style={{ gap: 20 }}>
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
              style={{
                background: "#120E1A",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: 28,
              }}
            >
              {/* Step number */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(139,92,246,0.12)",
                  marginBottom: 16,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "rgba(139,92,246,0.7)",
                }}
              >
                {index + 1}
              </div>

              {/* Icon */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(139,92,246,0.1)",
                  marginBottom: 16,
                }}
              >
                <step.icon style={{ width: 20, height: 20, color: "rgba(139,92,246,0.6)" }} />
              </div>

              {/* Title */}
              <h3 style={{ fontSize: 18, fontWeight: 500, color: "#FFFFFF", marginBottom: 10 }}>
                {step.title}
              </h3>

              {/* Quote */}
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.55)", margin: 0, fontStyle: "italic" }}>
                {Array.isArray(step.quote)
                  ? step.quote.map((line, i) => (
                      <span key={i} className={i > 0 ? "block mt-2" : "block"}>
                        {line}
                      </span>
                    ))
                  : step.quote}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            marginTop: 64,
          }}
        >
          Autonomy — without losing control.
        </motion.p>
      </div>
    </section>
  );
};

export default CoreEngineSection;
