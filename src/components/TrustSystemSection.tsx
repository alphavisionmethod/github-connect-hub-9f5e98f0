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
    <section className="relative section-padding overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-radial-top opacity-30" />

      <div className="container-narrow relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
            Trust System
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Built for trust — <span className="gradient-text">not surprises.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A governed execution system — approvals, permissions, receipts.
          </p>
        </motion.div>

        {/* Trust bullets */}
        <div className="max-w-2xl mx-auto space-y-4">
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                <point.icon className="w-5 h-5 text-accent" />
              </div>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed pt-1.5">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closer */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm md:text-base text-muted-foreground mt-12 font-medium"
        >
          If it can't be proven, it doesn't run.
        </motion.p>
      </div>
    </section>
  );
};

export default TrustSystemSection;
