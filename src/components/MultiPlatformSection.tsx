import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Smartphone, Plug } from "lucide-react";

const platforms = [
  {
    icon: Monitor,
    title: "Web dashboard",
    description: "Review decisions, approve actions, and audit history in one place.",
  },
  {
    icon: Smartphone,
    title: "Mobile access",
    description: "Approve, pause, or escalate actions on the go.",
  },
  {
    icon: Plug,
    title: "Your existing tools",
    description: "SITA connects to the systems you already use — rolled out in phases.",
  },
];

const MultiPlatformSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-radial-center" />

      <div className="container-narrow relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent border border-accent/20 mb-6"
          >
            Where SITA runs
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            SITA lives where decisions already happen.
          </motion.p>
        </motion.div>

        {/* 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.12 }}
              className="glass-card-hover p-8 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mx-auto mb-5">
                <platform.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {platform.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {platform.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom muted note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          No hardware. No gimmicks. Just software that works.
        </motion.p>
      </div>
    </section>
  );
};

export default MultiPlatformSection;
