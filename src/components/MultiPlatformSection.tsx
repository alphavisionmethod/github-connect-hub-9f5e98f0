import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Smartphone, Glasses, Box, ZoomIn } from "lucide-react";
import ImageLightbox from "./ImageLightbox";
import platformMobile from "@/assets/platform-mobile.jpg";
import platformHolographic from "@/assets/platform-holographic.jpg";
import platformVr from "@/assets/platform-vr.jpg";

const platforms = [
  {
    id: "vr",
    title: "VR Experience",
    icon: Glasses,
    image: platformVr,
    description: "Immersive spatial interfaces",
  },
  {
    id: "mobile",
    title: "Mobile",
    icon: Smartphone,
    image: platformMobile,
    description: "Always in your pocket",
  },
  {
    id: "holographic",
    title: "Holographic",
    icon: Box,
    image: platformHolographic,
    description: "The future of interaction",
  },
];

const MultiPlatformSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const allImages = platforms.map(platform => ({ src: platform.image, alt: platform.title }));

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-radial-center" />
      
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

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
            Multi-Platform
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
          >
            One OS running across{" "}
            <br className="hidden md:block" />
            <span className="gradient-text">VR, mobile, and holographic</span>
            <br />
            <span className="text-accent">masterpiece</span>
          </motion.h2>
        </motion.div>

        {/* Platform showcase grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + index * 0.15 }}
              className="group"
            >
              {/* Image container */}
              <button
                onClick={() => setLightboxIndex(index)}
                className="w-full glass-card p-3 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] group/card"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="relative overflow-hidden rounded-xl">
                  {/* Aspect ratio container - taller for mobile image */}
                  <div className={`relative ${platform.id === 'mobile' ? 'aspect-[3/4]' : 'aspect-video'}`}>
                    <img
                      src={platform.image}
                      alt={platform.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity duration-500" />
                    
                    {/* Zoom icon on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <div className="p-4 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30">
                        <ZoomIn className="w-8 h-8 text-primary" />
                      </div>
                    </div>

                    {/* Platform icon badge */}
                    <div className="absolute top-4 left-4 p-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50">
                      <platform.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Platform info */}
                <div className="p-4 text-left">
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover/card:text-primary transition-colors duration-300">
                    {platform.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {platform.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: "var(--shadow-glow-combined)",
                  }}
                />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-muted-foreground mt-12 max-w-2xl mx-auto"
        >
          Experience SITA OS wherever you are — seamlessly transitioning between devices 
          while maintaining full context and control.
        </motion.p>
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

export default MultiPlatformSection;
