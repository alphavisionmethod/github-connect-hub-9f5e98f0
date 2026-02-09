import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import sitaLogo from "@/assets/sita-logo.jpeg";

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer
      ref={ref}
      className="relative"
      style={{
        background: "#0B0812",
        padding: "48px 24px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Logo and tagline */}
          <div className="flex items-center gap-4">
            <img
              src={sitaLogo}
              alt="SITA OS"
              style={{ width: 40, height: 40, borderRadius: 10 }}
            />
            <div>
              <span style={{ fontWeight: 600, fontSize: 15, color: "#FFFFFF" }}>SITA OS</span>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>
                Governed Execution OS
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} SITA OS. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex items-center gap-6" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link
              to="/dashboard"
              className="transition-colors"
              style={{ opacity: 0.3, padding: 8, borderRadius: 8 }}
              aria-label="Admin access"
            >
              <Lock style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
