import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, Rocket, Crown, Gift, X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const donationSchema = z.object({
  name: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Please enter a valid email").max(255),
  amount: z.number().min(1, "Amount must be at least $1"),
  message: z.string().trim().max(500).optional(),
});

const tiers = [
  {
    id: "supporter",
    name: "Supporter",
    amount: 25,
    icon: Heart,
    description: "Back the mission. Get early updates",
    perks: ["Early product updates", "Name on supporters wall", "Community access"],
    color: "hsl(270 91% 55%)",
  },
  {
    id: "builder",
    name: "Builder",
    amount: 100,
    icon: Rocket,
    description: "Priority beta access + name in credits",
    perks: ["All Supporter perks", "Priority beta access", "Name in product credits", "Monthly newsletter"],
    color: "hsl(300 70% 50%)",
    popular: true,
  },
  {
    id: "visionary",
    name: "Visionary",
    amount: 500,
    icon: Crown,
    description: "All Builder perks + monthly founder calls",
    perks: ["All Builder perks", "Monthly founder calls", "Early feature requests", "Lifetime early pricing"],
    color: "hsl(38 95% 54%)",
  },
  {
    id: "open",
    name: "Open Donation",
    amount: 0,
    icon: Gift,
    description: "Donate without expecting anything in return",
    perks: ["Our eternal gratitude", "Good karma", "Support the mission"],
    color: "hsl(160 60% 45%)",
    isOpen: true,
  },
];

const Fund = () => {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", amount: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const activeTier = tiers.find((t) => t.id === selectedTier);

  const handleSubmit = async () => {
    const amount = activeTier?.isOpen ? parseFloat(formData.amount) : activeTier?.amount || 0;
    const result = donationSchema.safeParse({
      name: formData.name || undefined,
      email: formData.email,
      amount,
      message: formData.message || undefined,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        if (e.path[0]) fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("donations" as any).insert({
        name: formData.name || null,
        email: formData.email,
        amount,
        tier: selectedTier,
        message: formData.message || null,
      } as any);
      if (error) throw error;
      setSubmitted(true);
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#0B0812" }}>
      {/* Radial glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px]" style={{ background: "radial-gradient(ellipse, hsl(270 60% 40% / 0.08), transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px]" style={{ background: "radial-gradient(ellipse, hsl(38 95% 54% / 0.06), transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4" style={{ background: "hsl(38 95% 54% / 0.1)", color: "hsl(38 95% 54%)", border: "1px solid hsl(38 95% 54% / 0.2)" }}>
            FUND THE FUTURE
          </span>
          <h1 className="font-bold text-white mb-5" style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.1 }}>
            Help us build{" "}
            <span style={{ background: "linear-gradient(135deg, hsl(270 91% 55%), hsl(38 95% 54%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              what's next
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-white/50" style={{ fontSize: 16 }}>
            Every contribution fuels the mission. Choose a tier or donate freely
          </p>
        </motion.div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                onClick={() => { setSelectedTier(tier.id); setSubmitted(false); setErrors({}); setFormData({ name: "", email: "", amount: tier.isOpen ? "" : String(tier.amount), message: "" }); }}
                className="relative rounded-2xl cursor-pointer transition-all duration-300 flex flex-col group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: selectedTier === tier.id ? `1px solid ${tier.color}` : "1px solid rgba(255,255,255,0.08)",
                  padding: "28px 24px",
                  boxShadow: selectedTier === tier.id ? `0 0 30px ${tier.color}33` : "none",
                }}
              >
                {/* Gradient top */}
                <div className="absolute top-0 left-0 right-0 rounded-t-2xl" style={{ height: 2, background: `linear-gradient(90deg, ${tier.color}, hsl(38 95% 54%))` }} />
                {tier.popular && (
                  <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase" style={{ background: "linear-gradient(135deg, hsl(270 91% 55%), hsl(38 95% 54%))", color: "#fff" }}>
                    POPULAR
                  </span>
                )}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${tier.color}22` }}>
                  <Icon className="w-5 h-5" style={{ color: tier.color }} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{tier.name}</h3>
                {!tier.isOpen && <p className="text-2xl font-bold text-white mb-2">${tier.amount}</p>}
                <p className="text-white/50 text-sm mb-5">{tier.description}</p>
                <ul className="space-y-2 flex-1 mb-6">
                  {tier.perks.map((perk, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                      <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                      {perk}
                    </li>
                  ))}
                </ul>
                <div className="py-2.5 rounded-xl text-center text-sm font-semibold transition-all" style={{ background: selectedTier === tier.id ? tier.color : "transparent", border: selectedTier === tier.id ? "none" : "1px solid rgba(255,255,255,0.15)", color: "#fff" }}>
                  {selectedTier === tier.id ? "Selected" : "Select"}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Donation Form Modal */}
        <AnimatePresence>
          {selectedTier && !submitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-md mx-auto rounded-2xl relative"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "32px" }}
            >
              <button onClick={() => setSelectedTier(null)} className="absolute top-4 right-4 text-white/40 hover:text-white/80"><X className="w-4 h-4" /></button>
              <h3 className="text-white font-semibold text-lg mb-1">Complete your {activeTier?.name} contribution</h3>
              <p className="text-white/40 text-sm mb-6">{activeTier?.isOpen ? "Enter any amount" : `$${activeTier?.amount}`}</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Name (optional)</label>
                  <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} placeholder="Your name" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Email *</label>
                  <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none" style={{ background: "rgba(255,255,255,0.06)", border: errors.email ? "1px solid hsl(0 70% 50%)" : "1px solid rgba(255,255,255,0.1)" }} placeholder="you@example.com" />
                  {errors.email && <p className="text-xs mt-1" style={{ color: "hsl(0 70% 50%)" }}>{errors.email}</p>}
                </div>
                {activeTier?.isOpen && (
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">Amount ($) *</label>
                    <input type="number" min="1" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none" style={{ background: "rgba(255,255,255,0.06)", border: errors.amount ? "1px solid hsl(0 70% 50%)" : "1px solid rgba(255,255,255,0.1)" }} placeholder="50" />
                    {errors.amount && <p className="text-xs mt-1" style={{ color: "hsl(0 70% 50%)" }}>{errors.amount}</p>}
                  </div>
                )}
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Message (optional)</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none resize-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} placeholder="A message for the team..." />
                </div>
                {errors.form && <p className="text-xs" style={{ color: "hsl(0 70% 50%)" }}>{errors.form}</p>}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, hsl(270 91% 55%), hsl(38 95% 54%))" }}
                >
                  {isSubmitting ? "Processing..." : `Contribute ${activeTier?.isOpen ? (formData.amount ? `$${formData.amount}` : "") : `$${activeTier?.amount}`}`}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center rounded-2xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "48px 32px" }}
            >
              <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "hsl(270 91% 55% / 0.15)" }}>
                <Heart className="w-7 h-7" style={{ color: "hsl(270 91% 55%)" }} />
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">Thank you for your support</h3>
              <p className="text-white/50 text-sm mb-6">Your contribution has been recorded. We'll be in touch soon</p>
              <button onClick={() => { setSelectedTier(null); setSubmitted(false); }} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Make another contribution
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Fund;