import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Lock, Fingerprint, Shield, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const InvestorDataRoom = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("waitlist").insert({
        email,
        source: "investor_data_room",
        interest: "investor",
        is_investor: true,
        category: "investor",
      });

      if (error) {
        if (error.code === "23505") {
          alert("You're already on the investor list!");
        } else {
          throw error;
        }
      } else {
        setIsSuccess(true);
        setEmail("");
        supabase.functions
          .invoke("notify-investor-lead", { body: { email } })
          .catch(console.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
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
          className="absolute top-1/2 left-1/3 w-[500px] h-[400px] rounded-full"
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

      <div className="relative z-10 max-w-[680px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Card */}
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative text-center"
            style={{
              background: "#120E1A",
              border: "1px solid rgba(242,180,92,0.12)",
              borderRadius: 20,
              padding: "56px 40px",
              transition: "border-color 0.5s ease",
              ...(isHovered ? { borderColor: "rgba(242,180,92,0.3)" } : {}),
            }}
          >
            {/* Biometric scan effect on hover */}
            <motion.div
              initial={false}
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{ borderRadius: 20 }}
            >
              <motion.div
                initial={{ y: "-100%" }}
                animate={isHovered ? { y: "200%" } : { y: "-100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0"
                style={{
                  height: 2,
                  background:
                    "linear-gradient(90deg, transparent, rgba(242,180,92,0.4), transparent)",
                  filter: "blur(1px)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  opacity: 0.15,
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(242,180,92,0.08) 20px, rgba(242,180,92,0.08) 21px),
                                    repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(242,180,92,0.08) 20px, rgba(242,180,92,0.08) 21px)`,
                }}
              />
            </motion.div>

            {/* Lock icon */}
            <motion.div
              animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center justify-center"
              style={{
                width: 72,
                height: 72,
                borderRadius: 18,
                background: "linear-gradient(135deg, rgba(242,180,92,0.15), rgba(139,92,246,0.08))",
                marginBottom: 24,
              }}
            >
              {isHovered ? (
                <Fingerprint className="animate-pulse" style={{ width: 36, height: 36, color: "#F2B45C" }} />
              ) : (
                <Lock style={{ width: 36, height: 36, color: "#F2B45C" }} />
              )}
            </motion.div>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full uppercase"
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                color: "rgba(242,180,92,0.8)",
                padding: "4px 12px",
                border: "1px solid rgba(242,180,92,0.2)",
                marginBottom: 20,
              }}
            >
              <Shield style={{ width: 12, height: 12 }} />
              Institutional Access
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 32px)",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: 16,
              }}
            >
              Institutional Grade Autonomy
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: 8, lineHeight: 1.6 }}>
              SITA OS is solving the liability crisis of the Agentic Age.
            </p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginBottom: 32 }}>
              For venture partners and accredited operators.
            </p>

            {/* Form or Success */}
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3"
                style={{
                  padding: "16px 24px",
                  borderRadius: 14,
                  background: "rgba(242,180,92,0.08)",
                  border: "1px solid rgba(242,180,92,0.2)",
                }}
              >
                <Check style={{ width: 20, height: 20, color: "#F2B45C" }} />
                <span style={{ color: "rgba(242,180,92,0.9)", fontWeight: 500, fontSize: 14 }}>
                  Access request received. We'll be in touch.
                </span>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
                style={{ maxWidth: 440, margin: "0 auto" }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="investor@fund.com"
                  required
                  style={{
                    flex: 1,
                    padding: "14px 20px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(242,180,92,0.15)",
                    color: "#FFFFFF",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden disabled:opacity-50"
                  style={{
                    padding: "14px 28px",
                    borderRadius: 12,
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#0B0812",
                    background: "linear-gradient(135deg, hsl(38 95% 54%), hsl(38 100% 65%))",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Fingerprint style={{ width: 18, height: 18 }} />
                    {isSubmitting ? "Verifying..." : "Request Access"}
                  </span>
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestorDataRoom;
