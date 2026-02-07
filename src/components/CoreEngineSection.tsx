import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FileText, Shield, UserCheck, Zap, Receipt, ChevronRight, ChevronDown } from "lucide-react";
import MagneticCard from "./MagneticCard";

const steps = [
  {
    icon: FileText,
    title: "Think",
    quote: ["SITA drafts decisions and plans actions.", "Nothing is executed yet."],
  },
  {
    icon: Shield,
    title: "Check",
    quote: "Is this allowed by your rules?",
  },
  {
    icon: UserCheck,
    title: "Approve",
    quote: "Should I proceed, or wait for you?",
  },
  {
    icon: Zap,
    title: "Act",
    quote: "Done. Here's exactly what I did.",
  },
  {
    icon: Receipt,
    title: "Prove",
    quote: "Proof—timestamped and verifiable.",
  },
];

const CoreEngineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="core-engine" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-radial-center" />
      
      {/* Parallax floating orb */}
      <motion.div 
        style={{ y }}
        className="absolute -right-32 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container-narrow relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
            How SITA Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Think. Check. Act. <span className="gradient-text">Prove.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Every AI should be accountable. SITA OS thinks through your request, 
            checks it against your rules, acts only with permission, 
            and gives you proof of what happened. Simple.
          </p>
        </motion.div>

        {/* Process flow */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden xl:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20 -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group flex items-center"
              >
                {/* Card */}
                <div className="flex-1">
                  <MagneticCard className="h-full">
                    <div className="glass-card-hover p-5 lg:p-6 h-full min-h-[280px] flex flex-col">
                      {/* Step number */}
                      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center z-10">
                        <span className="text-xs font-bold gradient-text">{index + 1}</span>
                      </div>

                      {/* Icon */}
                      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 group-hover:from-primary/30 group-hover:to-accent/20 transition-all duration-300">
                        <step.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                      
                      {/* Quote */}
                      <div className="flex-1">
                        <p className="text-muted-foreground text-sm leading-relaxed italic">
                          {Array.isArray(step.quote) ? step.quote.map((line, i) => (
                            <span key={i} className={i > 0 ? "block mt-2" : "block"}>{line}</span>
                          )) : step.quote}
                        </p>
                      </div>

                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: "radial-gradient(circle at 50% 50%, hsl(270 91% 55% / 0.1), transparent 70%)",
                        }}
                      />
                    </div>
                  </MagneticCard>
                </div>

                {/* Horizontal Arrow connector for desktop - positioned between cards */}
                {index < steps.length - 1 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                    className="hidden xl:flex items-center justify-center absolute -right-3 top-1/2 -translate-y-1/2 z-20"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
                      <ChevronRight className="w-4 h-4 text-background" />
                    </div>
                  </motion.div>
                )}

                {/* Vertical Arrow connector for mobile/tablet */}
                {index < steps.length - 1 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                    className="xl:hidden absolute -bottom-5 left-1/2 -translate-x-1/2 z-20"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-b from-primary to-accent flex items-center justify-center shadow-lg">
                      <ChevronDown className="w-4 h-4 text-background" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreEngineSection;
