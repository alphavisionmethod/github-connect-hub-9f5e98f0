import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EyeOff, KeyRound, Receipt, RotateCcw, UserCheck } from "lucide-react";

const trustPoints = [
  {
    icon: EyeOff,
    title: "Shadow Mode by default",
    subtitle: "Nothing runs without approval",
  },
  {
    icon: KeyRound,
    title: "Explicit permissions",
    subtitle: "Scoped, revocable, auditable",
  },
  {
    icon: Receipt,
    title: "Receipts for every action",
    subtitle: "Full traceability",
  },
  {
    icon: RotateCcw,
    title: "Rollbacks & kill switch",
    subtitle: "You stay in control",
  },
  {
    icon: UserCheck,
    title: "Human-in-the-loop by design",
    subtitle: "Not as an afterthought",
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
              className="flex items-center rounded-2xl border cursor-default transition-colors duration-300"
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.08)',
                padding: '20px 22px',
                gap: '14px',
              }}
              whileHover={{
                backgroundColor: 'rgba(255,255,255,0.045)',
                borderColor: 'rgba(255,255,255,0.12)',
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'rgba(120,60,255,0.16)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <point.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold" style={{ fontSize: 16, color: 'rgba(255,255,255,0.92)' }}>
                  {point.title}
                </p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>
                  {point.subtitle}
                </p>
              </div>
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
