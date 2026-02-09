import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import sitaDemo from "@/assets/sita-demo.mp4";

const DemoVideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="demo-video"
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
              "radial-gradient(ellipse, hsl(270 91% 55% / 0.06), hsl(38 95% 54% / 0.03) 50%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto">
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
            See It In Action
          </span>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 600,
              lineHeight: 1.15,
              color: "#FFFFFF",
              marginTop: 16,
              marginBottom: 16,
            }}
          >
            A Day with <span className="gradient-text">SitaOs...</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 600, margin: "0 auto" }}>
            Watch how SITA OS transforms your daily operations with governed autonomy.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            style={{
              padding: 10,
              borderRadius: 18,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow:
                "0 0 60px hsl(270 91% 55% / 0.1), 0 0 80px hsl(38 95% 54% / 0.06)",
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <video
                style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
                controls
                preload="metadata"
              >
                <source src={sitaDemo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Corner accents */}
              <div
                className="absolute top-0 left-0 pointer-events-none"
                style={{
                  width: 48,
                  height: 48,
                  borderLeft: "2px solid rgba(139,92,246,0.25)",
                  borderTop: "2px solid rgba(139,92,246,0.25)",
                  borderTopLeftRadius: 12,
                }}
              />
              <div
                className="absolute top-0 right-0 pointer-events-none"
                style={{
                  width: 48,
                  height: 48,
                  borderRight: "2px solid rgba(242,180,92,0.25)",
                  borderTop: "2px solid rgba(242,180,92,0.25)",
                  borderTopRightRadius: 12,
                }}
              />
              <div
                className="absolute bottom-0 left-0 pointer-events-none"
                style={{
                  width: 48,
                  height: 48,
                  borderLeft: "2px solid rgba(242,180,92,0.25)",
                  borderBottom: "2px solid rgba(242,180,92,0.25)",
                  borderBottomLeftRadius: 12,
                }}
              />
              <div
                className="absolute bottom-0 right-0 pointer-events-none"
                style={{
                  width: 48,
                  height: 48,
                  borderRight: "2px solid rgba(139,92,246,0.25)",
                  borderBottom: "2px solid rgba(139,92,246,0.25)",
                  borderBottomRightRadius: 12,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
          style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 32 }}
        >
          Experience the future of governed AI execution
        </motion.p>
      </div>
    </section>
  );
};

export default DemoVideoSection;
