import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EyeOff, KeyRound, Receipt, RotateCcw, UserCheck } from "lucide-react";

const trustPoints = [
  {
    icon: EyeOff,
    text: "Shadow Mode by default — nothing runs without approval",
  },
  {
    icon: KeyRound,
    text: "Explicit permissions — scoped, revocable, auditable",
  },
  {
    icon: Receipt,
    text: "Receipts for every action — full traceability",
  },
  {
    icon: RotateCcw,
    text: "Rollbacks & kill switch — you stay in control",
  },
  {
    icon: UserCheck,
    text: "Human-in-the-loop by design — not as an afterthought",
  },
];

const TrustSystemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#0B0812", padding: "120px 24px" }}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[350px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, hsl(270 91% 55% / 0.06), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: 56 }}
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
            Trust System
          </span>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 600,
              lineHeight: 1.15,
              color: "#FFFFFF",
              marginTop: 16,
              marginBottom: 20,
            }}
          >
            Built for trust, <span className="gradient-text">not surprises</span>
          </h2>
          <p
            style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 600, margin: "0 auto" }}
          >
            SITA is designed like a system, not a chatbot.
          </p>
        </motion.div>

        {/* Trust bullets */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="flex items-start gap-4"
              style={{
                padding: 20,
                borderRadius: 14,
                background: "#120E1A",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(242,180,92,0.08))",
                }}
              >
                <point.icon style={{ width: 20, height: 20, color: "rgba(242,180,92,0.7)" }} />
              </div>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.7)",
                  margin: 0,
                  paddingTop: 8,
                }}
              >
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom anchor */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            marginTop: 64,
            fontWeight: 500,
          }}
        >
          If it can't be proven, it doesn't run.
        </motion.p>
      </div>
    </section>
  );
};

export default TrustSystemSection;
