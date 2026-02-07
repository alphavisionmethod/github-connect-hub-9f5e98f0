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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, hsl(270 91% 55% / 0.07), transparent 70%)",
          }}
        />
      </div>

      <div className="container-narrow relative z-10">
        {/* Header — tight + elevated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground/70 border border-border/30 mb-8">
            Where SITA runs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            SITA shows up where decisions already happen.
          </h2>
        </motion.div>

        {/* 1 center dominant + 2 satellites */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* LEFT — Web Dashboard (secondary) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 p-6 rounded-xl text-center"
            style={{
              background: "#0E0B14",
              border: "1px solid hsl(270 60% 50% / 0.1)",
            }}
          >
            <div className="w-10 h-10 rounded-lg bg-muted/40 flex items-center justify-center mx-auto mb-4">
              <Monitor className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Web dashboard
            </h3>
            <p className="text-xs text-muted-foreground leading-loose">
              Review decisions.
              <br />
              Approve actions.
              <br />
              Audit everything in one place.
            </p>
          </motion.div>

          {/* CENTER — Mobile (primary, dominant) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="md:col-span-6 p-10 md:p-12 rounded-xl text-center relative"
            style={{
              background: "#0E0B14",
              border: "1px solid hsl(270 60% 50% / 0.12)",
              boxShadow:
                "0 0 50px hsl(270 91% 55% / 0.05), 0 0 80px hsl(38 95% 54% / 0.03)",
            }}
          >
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">
                Mobile access
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                Approve, pause, or escalate actions instantly.
                <br />
                Control doesn't wait for a desk.
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Integrations (secondary) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 p-6 rounded-xl text-center"
            style={{
              background: "#0E0B14",
              border: "1px solid hsl(270 60% 50% / 0.1)",
            }}
          >
            <div className="w-10 h-10 rounded-lg bg-muted/40 flex items-center justify-center mx-auto mb-4">
              <Plug className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Your existing tools
            </h3>
            <p className="text-xs text-muted-foreground leading-loose">
              SITA connects to what you already use.
              <br />
              Rolled out carefully, in phases.
            </p>
          </motion.div>
        </div>

        {/* Bottom anchor sentence — high contrast */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center text-sm text-foreground/70 mt-16 tracking-wide"
        >
          No hardware. No gimmicks. Just software that works.
        </motion.p>
      </div>
    </section>
  );
};

export default MultiPlatformSection;
