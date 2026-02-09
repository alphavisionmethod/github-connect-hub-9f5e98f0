import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Crown, ChevronDown, Volume2, VolumeX } from "lucide-react";
import advisorsVideo from "@/assets/advisors-video.mp4";

const fullContent = `
**The Family Office Model**
Billionaires don't make decisions alone. They have dedicated teams—family offices, investment committees, operations leads—who handle everything from wealth preservation to daily logistics. These systems are built to reduce errors, protect time, and execute with precision.

**SITA OS Brings This to Everyone**
We've built the first AI-powered advisory layer that operates like a personal family office. It doesn't just answer questions—it manages, coordinates, and acts across every domain of your life: business strategy, financial optimization, and personal operations.

**Your Complete Executive Team**
Imagine having a Chief of Staff who never sleeps. A CFO who monitors every transaction. A COO who keeps operations running smoothly. A personal assistant who remembers everything. SITA OS combines all of these into one intelligent system—governed by your rules, accountable to you alone.

**Built by Those Who Know**
The architecture behind SITA OS was shaped by operators who've built billion-dollar enterprises, managed sovereign wealth, and led global organizations. They understand what it takes to run at scale—and they've encoded that wisdom into every layer of the platform.
`;

const BoardOfAdvisorsSection = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#0B0812", padding: "120px 24px" }}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, hsl(38 95% 54% / 0.04), hsl(270 91% 55% / 0.03) 50%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: 64 }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full uppercase"
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              color: "rgba(242,180,92,0.8)",
              padding: "4px 14px",
              border: "1px solid rgba(242,180,92,0.15)",
              marginBottom: 16,
            }}
          >
            <Crown style={{ width: 14, height: 14 }} />
            The Vision
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
            Give Everyone a{" "}
            <span className="gradient-text">Billionaire-Level Advisory System</span>
          </h2>
          <p
            className="mx-auto"
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 700,
              lineHeight: 1.6,
            }}
          >
            A complete executive team, Family Office, and Personal Assistant across every area of your life—focused on growth, profitability, and execution.
          </p>
        </motion.div>

        {/* Main content card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto"
          style={{ maxWidth: 960 }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              background: "#120E1A",
              border: "1px solid rgba(242,180,92,0.12)",
              borderRadius: 20,
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(242,180,92,0.25), transparent)",
              }}
            />

            {/* Hero Video */}
            <div className="relative overflow-hidden" style={{ height: "clamp(240px, 30vw, 380px)" }}>
              <video
                ref={videoRef}
                src={advisorsVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
                style={{ opacity: 0.6 }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, #120E1A, rgba(18,14,26,0.5) 60%, transparent)",
                }}
              />

              {/* Sound toggle */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={toggleMute}
                className="absolute bottom-4 right-4 animate-pulse"
                style={{
                  padding: 12,
                  borderRadius: "50%",
                  background: "rgba(11,8,18,0.4)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                  boxShadow: isMuted
                    ? "0 0 15px hsl(38 95% 54% / 0.2)"
                    : "0 0 25px hsl(38 95% 54% / 0.35)",
                }}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <VolumeX style={{ width: 20, height: 20, color: "rgba(255,255,255,0.7)" }} />
                ) : (
                  <Volume2 style={{ width: 20, height: 20, color: "#F2B45C" }} />
                )}
              </motion.button>
            </div>

            {/* Content */}
            <div style={{ padding: "36px 40px 40px" }}>
              {/* Opening statement */}
              <div style={{ marginBottom: 32 }}>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.3,
                    marginBottom: 12,
                  }}
                >
                  Most people manage life alone.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  style={{
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 700,
                    lineHeight: 1.3,
                  }}
                >
                  <span className="gradient-text">Billionaires build systems.</span>
                </motion.p>
              </div>

              {/* Supporting text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.7,
                  marginBottom: 32,
                  maxWidth: 700,
                }}
              >
                They rely on teams—family offices, investment committees, department heads, personal chiefs of staff—whose job is to reduce mistakes, defend time, and move with certainty.
              </motion.p>

              {/* Expanded content */}
              <motion.div
                initial={false}
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div
                  style={{
                    paddingTop: 32,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                    {fullContent
                      .split("\n\n")
                      .filter((p) => p.trim())
                      .map((paragraph, idx) => {
                        if (paragraph.includes("**")) {
                          const parts = paragraph.split("**");
                          return (
                            <div key={idx}>
                              <h4
                                style={{
                                  fontSize: 18,
                                  fontWeight: 600,
                                  color: "#FFFFFF",
                                  marginBottom: 10,
                                }}
                              >
                                {parts[1]}
                              </h4>
                              <p
                                style={{
                                  fontSize: 14,
                                  color: "rgba(255,255,255,0.55)",
                                  lineHeight: 1.7,
                                  margin: 0,
                                }}
                              >
                                {parts[2]}
                              </p>
                            </div>
                          );
                        }
                        return (
                          <p
                            key={idx}
                            style={{
                              fontSize: 14,
                              color: "rgba(255,255,255,0.55)",
                              lineHeight: 1.7,
                              margin: 0,
                            }}
                          >
                            {paragraph}
                          </p>
                        );
                      })}
                  </div>
                </div>
              </motion.div>

              {/* Learn More button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 transition-all hover:opacity-90"
                style={{
                  marginTop: 32,
                  padding: "12px 28px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(242,180,92,0.2)",
                  color: "rgba(242,180,92,0.8)",
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {isExpanded ? "Show Less" : "Learn More"}
                <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown style={{ width: 18, height: 18 }} />
                </motion.span>
              </button>
            </div>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(242,180,92,0.1), transparent)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BoardOfAdvisorsSection;
