import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Smartphone, Plug } from "lucide-react";

const MultiPlatformSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#0B0812", padding: "120px 24px" }}
    >
      {/* Subtle radial glow behind center */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, hsl(270 91% 55% / 0.06), hsl(38 95% 54% / 0.03) 50%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto">
        {/* Eyebrow + Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: 72 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent border border-accent/20 mb-4">
            Where SITA runs
          </span>
          <h2
            className="mx-auto"
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#FFFFFF",
              maxWidth: 900,
              marginTop: 16,
            }}
          >
            <span className="gradient-text">SITA runs</span> inside the tools you already use.
          </h2>
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.6)", maxWidth: 700, margin: "16px auto 0", lineHeight: 1.5 }}>
            Review in one place. Approve anywhere. Execute across your stack — with receipts.
          </p>
        </motion.div>

        {/* Cards row — 3 columns */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 32 }}
        >
          {/* LEFT — Web dashboard (secondary) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: "#120E1A",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16,
              padding: 28,
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(139,92,246,0.1)",
                marginBottom: 20,
              }}
            >
              <Monitor style={{ width: 20, height: 20, color: "rgba(139,92,246,0.6)" }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 500, color: "#FFFFFF", marginBottom: 10 }}>
              Web dashboard
            </h3>
            <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(242,180,92,0.7)", marginBottom: 8 }}>
              Governance &amp; audit center
            </p>
            <ul style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: 0, paddingLeft: 16, listStyleType: "disc" }}>
              <li>Review decisions SITA proposes</li>
              <li>Approve / reject actions</li>
              <li>See receipts &amp; logs</li>
              <li>Manage permissions</li>
            </ul>
          </motion.div>

          {/* CENTER — Mobile access (PRIMARY) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              background: "#181227",
              border: "1px solid rgba(242,180,92,0.25)",
              borderRadius: 18,
              padding: 36,
              boxShadow:
                "0 0 50px rgba(139,92,246,0.08), 0 0 80px rgba(242,180,92,0.05)",
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(242,180,92,0.12))",
                marginBottom: 22,
                boxShadow: "0 0 20px rgba(242,180,92,0.1)",
              }}
            >
              <Smartphone style={{ width: 22, height: 22, color: "#F2B45C" }} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: "#FFFFFF", marginBottom: 12 }}>
              Mobile access
            </h3>
            <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(242,180,92,0.85)", marginBottom: 10 }}>
              Fast approvals &amp; safety controls on the go
            </p>
            <ul style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.85)", margin: 0, paddingLeft: 16, listStyleType: "disc" }}>
              <li>Approve a task quickly</li>
              <li>Pause SITA instantly</li>
              <li>Escalate to a human decision</li>
              <li>Get alerts when something needs you</li>
            </ul>
          </motion.div>

          {/* RIGHT — Your existing tools (secondary) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: "#120E1A",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16,
              padding: 28,
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(242,180,92,0.08)",
                marginBottom: 20,
              }}
            >
              <Plug style={{ width: 20, height: 20, color: "rgba(242,180,92,0.55)" }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 500, color: "#FFFFFF", marginBottom: 10 }}>
              Your existing tools
            </h3>
            <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(242,180,92,0.7)", marginBottom: 8 }}>
              Integration without the chaos
            </p>
            <ul style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: 0, paddingLeft: 16, listStyleType: "disc" }}>
              <li>SITA connects to what you already use</li>
              <li>Rolled out carefully, in phases</li>
              <li>Not "connect everything and pray"</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom anchor line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            marginTop: 64,
          }}
        >
          No hardware. No gimmicks. Just software that works.
        </motion.p>
      </div>
    </section>
  );
};

export default MultiPlatformSection;
