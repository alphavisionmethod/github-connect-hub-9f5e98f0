import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TrendingUp, Wallet, Sparkles, Play, ZoomIn } from "lucide-react";
import ImageLightbox from "./ImageLightbox";
import businessOsPreview from "@/assets/business-os-preview.jpg";
import financeOsPreview from "@/assets/finance-os-preview.jpg";
import conciergeOsPreview from "@/assets/concierge-os-preview.jpg";

interface Feature {
  name: string;
  desc: string;
}

interface Desk {
  id: string;
  icon: React.ElementType;
  emoji?: string;
  title: string;
  tagline: string;
  description: string;
  features: Feature[];
  iconColor: string;
  iconBg: string;
  preview: string;
}

const desks: Desk[] = [
  {
    id: "business",
    icon: TrendingUp,
    title: "Business OS",
    tagline: "Run your business. Not just reports.",
    description:
      "From lead generation to closing deals, SITA OS manages your sales pipeline, marketing, and operations—automatically.",
    features: [
      { name: "Works for any industry", desc: "E-commerce, professional services, local shops—SITA OS adapts to your specific business model and workflows." },
      { name: "Growth on autopilot", desc: "Find opportunities, reach out to leads, recover lost deals—your GTM runs in a continuous loop." },
      { name: "Full visibility, full control", desc: "Track everything from competitor moves to pipeline health. Every action stays within your policies." },
    ],
    iconColor: "rgba(139,92,246,0.6)",
    iconBg: "rgba(139,92,246,0.1)",
    preview: businessOsPreview,
  },
  {
    id: "finance",
    icon: Wallet,
    emoji: "💰",
    title: "Finance OS",
    tagline: "Grow wealth. Cut waste.",
    description:
      "Find better rates, track spending, manage investments—all under strict limits you define. Your money, optimized.",
    features: [
      { name: "Better rates, always", desc: "SITA OS scans for superior rates on insurance, banking, and credit—never let your capital sit idle." },
      { name: "Invest with guardrails", desc: "Manage your portfolio under strict risk parameters. Capture upside, protect downside." },
      { name: "Approval chains you set", desc: "Every dollar moved requires your sign-off. Full visibility into where money goes." },
    ],
    iconColor: "#F2B45C",
    iconBg: "rgba(242,180,92,0.1)",
    preview: financeOsPreview,
  },
  {
    id: "concierge",
    icon: Sparkles,
    emoji: "🎩",
    title: "Concierge OS",
    tagline: "Handle the hard stuff.",
    description:
      "Book travel, negotiate prices, manage subscriptions, remember birthdays. The mental load—handled.",
    features: [
      { name: "Negotiate on your behalf", desc: "Get the best prices on flights, hotels, and services. Bookings execute only after meeting your criteria." },
      { name: "Life logistics, sorted", desc: "Gifts, appointments, school runs, family milestones—no detail overlooked." },
      { name: "Protect your time", desc: "Cancel unused subscriptions, manage vendors, handle the tasks that eat your hours." },
    ],
    iconColor: "rgba(139,92,246,0.6)",
    iconBg: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(242,180,92,0.08))",
    preview: conciergeOsPreview,
  },
];

const ThreeDesksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const allImages = desks.map((desk) => ({ src: desk.preview, alt: `${desk.title} preview` }));

  const scrollToDemo = () => {
    document.getElementById("demo-video")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="three-desks"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#0B0812", padding: "120px 24px" }}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, hsl(38 95% 54% / 0.04), hsl(270 91% 55% / 0.04) 50%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: 72 }}
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
            The Three Desks
          </span>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 600,
              lineHeight: 1.15,
              color: "#FFFFFF",
              marginTop: 16,
            }}
          >
            One AI. <span className="gradient-text">Three roles.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 28 }}>
          {desks.map((desk, index) => (
            <motion.div
              key={desk.id}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.12 }}
              className="flex flex-col"
            >
              {/* Main card */}
              <div
                className="flex-1 flex flex-col"
                style={{
                  background: "#120E1A",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  padding: 28,
                }}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: desk.iconBg,
                    marginBottom: 20,
                  }}
                >
                  <desk.icon style={{ width: 22, height: 22, color: desk.iconColor }} />
                </div>

                {/* Title */}
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "#FFFFFF", marginBottom: 6 }}>
                  {desk.emoji && <span style={{ marginRight: 8 }}>{desk.emoji}</span>}
                  {desk.title}
                </h3>

                {/* Tagline */}
                <p
                  className="gradient-text"
                  style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}
                >
                  {desk.tagline}
                </p>

                {/* Description */}
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.55)", marginBottom: 20 }}>
                  {desk.description}
                </p>

                {/* Features */}
                <div className="flex-1" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                  {desk.features.map((feature) => (
                    <div key={feature.name}>
                      <h4 style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.85)", marginBottom: 2 }}>
                        {feature.name}
                      </h4>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, margin: 0 }}>
                        {feature.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={scrollToDemo}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium transition-all hover:opacity-90"
                  style={{
                    fontSize: 14,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                >
                  <Play style={{ width: 16, height: 16 }} />
                  See Demo Video
                </button>
              </div>

              {/* Preview Image */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.12 + 0.3 }}
                style={{ marginTop: 16 }}
              >
                <button
                  onClick={() => setLightboxIndex(index)}
                  className="w-full cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    padding: 6,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 0 40px hsl(270 91% 55% / 0.08), 0 0 60px hsl(38 95% 54% / 0.05)",
                  }}
                >
                  <div className="relative overflow-hidden" style={{ borderRadius: 10 }}>
                    <img
                      src={desk.preview}
                      alt={`${desk.title} preview`}
                      className="w-full object-cover transition-transform duration-500 hover:scale-110"
                      style={{ height: 180 }}
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(11,8,18,0.6)" }}
                    >
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: "rgba(139,92,246,0.2)",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        <ZoomIn style={{ width: 20, height: 20, color: "rgba(139,92,246,0.8)" }} />
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <ImageLightbox
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        src={lightboxIndex !== null ? allImages[lightboxIndex]?.src : ""}
        alt={lightboxIndex !== null ? allImages[lightboxIndex]?.alt : ""}
        images={allImages}
        currentIndex={lightboxIndex ?? 0}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
};

export default ThreeDesksSection;
