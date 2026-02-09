import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import sitaLogo from "@/assets/sita-logo.jpeg";
import sitaDemo from "@/assets/sita-demo.mp4";
import VerificationReceipt from "./VerificationReceipt";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("waitlist").insert({
        email,
        source: "landing_page_hero",
        interest: "general",
      });

      if (error) {
        if (error.code === "23505") {
          alert("You're already on the waitlist!");
        } else {
          throw error;
        }
      } else {
        setSubmittedEmail(email);
        setShowReceipt(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Error submitting to waitlist:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0B0812", padding: "120px 24px" }}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, hsl(270 91% 55% / 0.1), hsl(38 95% 54% / 0.05) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Grid texture */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative z-10 max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: 32 }}
          >
            <img
              src={sitaLogo}
              alt="SITA OS"
              className="mx-auto"
              style={{
                width: 80,
                height: 80,
                borderRadius: 16,
                boxShadow: "0 0 60px hsl(270 91% 55% / 0.3), 0 0 80px hsl(38 95% 54% / 0.2)",
              }}
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginBottom: 32 }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full uppercase"
              style={{
                fontSize: 12,
                letterSpacing: "0.14em",
                color: "rgba(242,180,92,0.8)",
                padding: "6px 16px",
                border: "1px solid rgba(242,180,92,0.15)",
              }}
            >
              <span
                className="animate-pulse"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "hsl(38 95% 54%)",
                  display: "inline-block",
                }}
              />
              Your AI That Acts
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#FFFFFF",
              marginBottom: 24,
            }}
          >
            Most AIs talk.
            <br />
            <span className="gradient-text">SITA executes — under your rules.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 640,
              margin: "0 auto 48px",
            }}
          >
            A governed AI system for life and business. Nothing acts without permission. Every action leaves a receipt.
          </motion.p>

          {/* CTA Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(242,180,92,0.8)",
              marginBottom: 16,
            }}
          >
            Join the early access waitlist
          </motion.p>

          {/* CTA Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{ maxWidth: 440, margin: "0 auto" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                flex: "1",
                padding: "14px 20px",
                borderRadius: 12,
                background: "#120E1A",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#FFFFFF",
                fontSize: 15,
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-hero pulse-glow whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ width: "auto", padding: "14px 32px" }}
            >
              <span className="relative z-10">
                {isSubmitting ? "Joining..." : "Join Us!"}
              </span>
            </button>
          </motion.form>

          {/* Micro-trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            style={{
              marginTop: 16,
              fontSize: 12,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Shadow mode by default • Human approval required • Full audit trail
          </motion.p>

          {/* Demo Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{ marginTop: 56, maxWidth: 780, margin: "56px auto 0" }}
          >
            <div
              style={{
                padding: 8,
                borderRadius: 18,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 0 60px hsl(270 91% 55% / 0.15), 0 0 80px hsl(38 95% 54% / 0.1)",
              }}
            >
              <video
                src={sitaDemo}
                muted
                controls
                playsInline
                style={{ width: "100%", borderRadius: 12, aspectRatio: "16/9" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Verification Receipt Modal */}
      <VerificationReceipt
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        email={submittedEmail}
      />
    </section>
  );
};

export default HeroSection;
