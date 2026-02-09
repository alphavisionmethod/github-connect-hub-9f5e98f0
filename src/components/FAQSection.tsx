import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What exactly is SITA OS?",
    answer:
      "Think of it as a highly capable assistant that actually does things—pays bills, sends emails, books travel, manages your pipeline—but only within rules you set. Every action is logged. You're always in control.",
  },
  {
    question: "How is this different from ChatGPT or other AI assistants?",
    answer:
      "ChatGPT gives you text. SITA OS gives you results. It doesn't just suggest—it acts, safely. Every action follows your rules and creates a verifiable record.",
  },
  {
    question: "What do you mean by 'governed execution'?",
    answer:
      "Every action SITA OS takes is constrained by rules you define. Spending limits, approval chains, risk thresholds—you set the boundaries. Full transparency, full control.",
  },
  {
    question: "Can I control how much autonomy the AI has?",
    answer:
      "Yes. Start with 'I suggest, you do' where you're fully hands-on. Progress to 'I run it, you relax' for routine tasks. You choose the level for each task, and you can change it anytime.",
  },
  {
    question: "What types of tasks can SITA OS handle?",
    answer:
      "Business: leads, pipeline, marketing. Finance: expenses, investments, rates. Lifestyle: travel, subscriptions, appointments. If it can follow a rule, SITA OS can handle it.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Every action is encrypted, auditable, and only visible to you. We don't sell your data. Ever.",
  },
  {
    question: "When will SITA OS be available?",
    answer:
      "We're in private beta now. Join the waitlist for early access. Beta participants get lifetime priority access and help shape the product.",
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="faq"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#0B0812", padding: "120px 24px" }}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/4 w-[400px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, hsl(270 91% 55% / 0.04), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, hsl(38 95% 54% / 0.03), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: 64 }}
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
            FAQ
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
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)" }}>
            Everything you need to know about SITA OS and governed AI execution.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-0 rounded-xl overflow-hidden px-6"
                  style={{
                    background: "#120E1A",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <AccordionTrigger
                    className="text-left hover:no-underline py-5"
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: "#FFFFFF",
                    }}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: 14,
                      lineHeight: 1.7,
                      paddingBottom: 20,
                    }}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
