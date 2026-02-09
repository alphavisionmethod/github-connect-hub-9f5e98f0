import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { User, Brain, Zap, Rocket } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const levels = [
  {
    level: 0,
    name: "I suggest, you do",
    description: "AI suggests, you execute",
    icon: User,
  },
  {
    level: 33,
    name: "I draft, you approve",
    description: "AI drafts, you review & send",
    icon: Brain,
  },
  {
    level: 66,
    name: "I act, you review",
    description: "AI acts, you review after",
    icon: Zap,
  },
  {
    level: 100,
    name: "I run it, you relax",
    description: "Full automation within your rules",
    icon: Rocket,
  },
];

const AutonomyLadderSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [autonomyLevel, setAutonomyLevel] = useState([33]);

  const currentLevel = levels.reduce((prev, curr) =>
    Math.abs(curr.level - autonomyLevel[0]) < Math.abs(prev.level - autonomyLevel[0])
      ? curr
      : prev
  );

  const glowIntensity = autonomyLevel[0] / 100;

  return (
    <section
      id="autonomy-ladder"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#0B0812", padding: "120px 24px" }}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(ellipse, hsl(270 91% 55% / ${0.04 + glowIntensity * 0.06}), hsl(38 95% 54% / ${glowIntensity * 0.05}) 50%, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[700px] mx-auto">
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
            Control You Can Adjust
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
            You decide how much <span className="gradient-text">control to keep</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)" }}>
            Start hands-on. Let go gradually. The choice is always yours.
          </p>
        </motion.div>

        {/* Interactive slider card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            style={{
              background: "#120E1A",
              border: `1px solid rgba(242,180,92,${0.1 + glowIntensity * 0.2})`,
              borderRadius: 18,
              padding: "40px 36px",
              boxShadow: `0 0 ${40 + glowIntensity * 60}px hsl(38 95% 54% / ${glowIntensity * 0.12}), 0 0 ${20 + glowIntensity * 40}px hsl(270 91% 55% / ${glowIntensity * 0.06})`,
              transition: "all 0.5s ease",
            }}
          >
            {/* Current level display */}
            <div className="text-center" style={{ marginBottom: 40 }}>
              <motion.div
                key={currentLevel.name}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center justify-center"
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 18,
                  marginBottom: 16,
                  background: `linear-gradient(135deg, rgba(139,92,246,${1 - glowIntensity * 0.5}), rgba(242,180,92,${glowIntensity}))`,
                  boxShadow: `0 0 ${20 + glowIntensity * 30}px hsl(38 95% 54% / ${glowIntensity * 0.4})`,
                }}
              >
                <currentLevel.icon style={{ width: 36, height: 36, color: "#0B0812" }} />
              </motion.div>

              <motion.h3
                key={`title-${currentLevel.name}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}
              >
                <span
                  style={{
                    background: `linear-gradient(135deg, hsl(270 91% 55%), hsl(38 95% 54% / ${0.5 + glowIntensity * 0.5}))`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {currentLevel.name}
                </span>
              </motion.h3>

              <motion.p
                key={`desc-${currentLevel.description}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontSize: 16, color: "rgba(255,255,255,0.55)" }}
              >
                {currentLevel.description}
              </motion.p>
            </div>

            {/* Endpoint labels */}
            <div className="flex justify-between" style={{ marginBottom: 12 }}>
              <span
                className="flex items-center gap-2"
                style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}
              >
                <User style={{ width: 14, height: 14 }} />
                You decide everything
              </span>
              <span
                className="flex items-center gap-2"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  background: "linear-gradient(90deg, hsl(270 91% 55%), hsl(38 95% 54%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Full automation
                <Rocket style={{ width: 14, height: 14, color: "#F2B45C" }} />
              </span>
            </div>

            {/* Slider */}
            <div style={{ marginBottom: 32 }}>
              <Slider
                value={autonomyLevel}
                onValueChange={setAutonomyLevel}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>

            {/* Level buttons */}
            <div className="flex justify-between">
              {levels.map((level, index) => (
                <motion.button
                  key={level.level}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  onClick={() => setAutonomyLevel([level.level])}
                  className="flex flex-col items-center gap-1.5 transition-all duration-300"
                  style={{
                    opacity: currentLevel.level === level.level ? 1 : 0.4,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background:
                        currentLevel.level === level.level
                          ? `linear-gradient(135deg, rgba(139,92,246,${1 - glowIntensity * 0.5}), rgba(242,180,92,${0.5 + glowIntensity * 0.5}))`
                          : "rgba(255,255,255,0.04)",
                      boxShadow:
                        currentLevel.level === level.level
                          ? `0 0 15px hsl(38 95% 54% / ${glowIntensity * 0.4})`
                          : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <level.icon
                      style={{
                        width: 20,
                        height: 20,
                        color: currentLevel.level === level.level ? "#0B0812" : "rgba(255,255,255,0.4)",
                      }}
                    />
                  </div>
                  <span
                    className="hidden sm:block"
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color:
                        currentLevel.level === level.level
                          ? "rgba(242,180,92,0.8)"
                          : "rgba(255,255,255,0.35)",
                    }}
                  >
                    Level {index + 1}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Bottom note */}
            <div
              className="text-center"
              style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                Different tasks, different levels. You're always in control of the dial.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AutonomyLadderSection;
