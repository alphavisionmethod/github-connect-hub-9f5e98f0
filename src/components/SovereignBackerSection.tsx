import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Crown, Rocket, Users, Check, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const tiers = [
  {
    id: "operator",
    name: "Operator",
    price: 50,
    icon: Rocket,
    benefits: [
      "Early beta access",
      "\"Founding Operator\" badge",
      "Priority support queue",
      "Monthly product updates",
    ],
    gradient: "from-primary/80 to-primary/40",
    popular: false,
  },
  {
    id: "sovereign",
    name: "Sovereign",
    price: 500,
    icon: Crown,
    benefits: [
      "Everything in Operator",
      "Lifetime Policy-Gate priority",
      "Private Discord access",
      "Direct line to dev team",
      "Custom autonomy presets",
    ],
    gradient: "from-accent to-gold",
    popular: true,
  },
  {
    id: "governance",
    name: "Governance Board",
    price: 2500,
    icon: Users,
    benefits: [
      "Everything in Sovereign",
      "Name in Genesis Receipt",
      "1-on-1 founder setup session",
      "Quarterly strategy calls",
      "Shape product roadmap",
      "Lifetime founding status",
    ],
    gradient: "from-gold via-accent to-primary",
    popular: false,
  },
];

// Mock progress data
const progress = {
  current: 127500,
  goal: 250000,
  percentage: 51,
};

const SovereignBackerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleBackerSignup = async (tierId: string, amount: number) => {
    if (!email || !name.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Insert into donors table (dedicated CRM)
      const { error: donorError } = await supabase.from("donors").insert({
        name: name.trim(),
        email: email.trim(),
        tier: tierId,
        amount: amount,
      });

      if (donorError) {
        if (donorError.code === "23505") {
          toast({
            title: "Already Registered",
            description: "You're already part of our founding backers family!",
            variant: "default",
          });
        } else {
          throw donorError;
        }
      } else {
        const tierName = tiers.find(t => t.id === tierId)?.name || tierId;
        toast({
          title: `Welcome, ${name.split(' ')[0]}! 🎉`,
          description: `You've joined the ${tierName} tier. Check your email for next steps.`,
        });
        setEmail("");
        setName("");
        setSelectedTier(null);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="backer" ref={ref} className="section-padding relative overflow-hidden">
      {/* Light leak effects */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-narrow relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent border border-accent/20 mb-4">
            Founding Backers
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Be a <span className="gradient-text">founding backer</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get early access, shape the product, and lock in founding status—forever.
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">Phase 1: Core Engine Deployment</span>
              <span className="text-sm font-bold gradient-text">{progress.percentage}% Funded</span>
            </div>
            <div className="relative h-3 rounded-full overflow-hidden bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${progress.percentage}%` } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
                  boxShadow: "0 0 20px hsl(var(--accent) / 0.5)",
                }}
              />
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-lg font-bold text-foreground">
                ${progress.current.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">
                of ${progress.goal.toLocaleString()} goal
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              className="relative group"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-accent to-gold text-background text-xs font-bold">
                    <Star className="w-3 h-3" />
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div
                className={`h-full p-8 rounded-2xl border transition-all duration-500 ${
                  tier.popular
                    ? "bg-[#0a0a0a] border-gold/50 shadow-[0_0_40px_hsl(var(--gold)/0.2)]"
                    : "bg-[#0a0a0a] border-gold/20 hover:border-gold/40"
                }`}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.gradient} mb-6`}>
                  <tier.icon className="w-7 h-7 text-background" />
                </div>

                {/* Tier name & price */}
                <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold gradient-text">${tier.price}</span>
                  <span className="text-muted-foreground ml-2">one-time</span>
                </div>

                {/* Benefits */}
                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {selectedTier === tier.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-gold/20 focus:border-gold/50 outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground"
                      autoFocus
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-gold/20 focus:border-gold/50 outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedTier(null)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-border text-muted-foreground text-sm hover:bg-muted transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleBackerSignup(tier.id, tier.price)}
                        disabled={isSubmitting || !email || !name.trim()}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 ${
                          tier.popular
                            ? "bg-gradient-to-r from-accent to-gold text-background"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {isSubmitting ? "..." : "Reserve Spot"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedTier(tier.id)}
                    className={`w-full px-6 py-3 rounded-xl font-semibold transition-all ${
                      tier.popular
                        ? "bg-gradient-to-r from-accent to-gold text-background hover:opacity-90"
                        : "border border-gold/30 text-foreground hover:bg-gold/10"
                    }`}
                  >
                    Become a {tier.name}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SovereignBackerSection;
