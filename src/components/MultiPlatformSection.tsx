import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Smartphone, Plug } from "lucide-react";

const MultiPlatformSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 md:px-8 relative overflow-hidden">
      {/* Subtle radial glow behind center */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, hsl(270 91% 55% / 0.07), transparent 70%)",
          }}
        />
      </div>

      <div className="container-narrow relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground border border-border/40 mb-8">
            Where SITA runs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            SITA shows up where decisions already happen.
          </h2>
        </motion.div>

        {/* 1 center + 2 satellites layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-center">
          {/* Left satellite — Web Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 p-6 rounded-2xl border border-border/30 bg-card/40 text-center"
          >
            <div className="w-10 h-10 rounded-lg bg-muted/60 flex items-center justify-center mx-auto mb-4">
              <Monitor className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1.5">
              Web dashboard
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Review decisions, approve actions, and audit history in one place.
            </p>
          </motion.div>

          {/* Center dominant — Mobile Access */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="md:col-span-6 p-10 rounded-2xl border border-primary/20 bg-card/60 text-center relative"
          >
            {/* Subtle glow ring */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow:
                  "inset 0 0 60px hsl(270 91% 55% / 0.06), 0 0 40px hsl(270 91% 55% / 0.04)",
              }}
            />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mx-auto mb-5">
                <Smartphone className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Mobile access
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                Approve, pause, or escalate actions on the go.
              </p>
            </div>
          </motion.div>

          {/* Right satellite — Existing Tools */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 p-6 rounded-2xl border border-border/30 bg-card/40 text-center"
          >
            <div className="w-10 h-10 rounded-lg bg-muted/60 flex items-center justify-center mx-auto mb-4">
              <Plug className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1.5">
              Your existing tools
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              SITA connects to the systems you already use — rolled out in phases.
            </p>
          </motion.div>
        </div>

        {/* Bottom muted note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center text-xs text-muted-foreground/60 mt-14"
        >
          No hardware. No gimmicks. Just software that works.
        </motion.p>
      </div>
    </section>
  );
};

export default MultiPlatformSection;
