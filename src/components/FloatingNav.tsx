import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import sitaLogo from "@/assets/sita-logo.jpeg";

const navItems = [
  { label: "Engine", href: "#core-engine" },
  { label: "Desks", href: "#three-desks" },
  { label: "Autonomy", href: "#autonomy-ladder" },
  { label: "Access", href: "#backer" },
  { label: "FAQ", href: "#faq" },
];

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { theme, toggleTheme } = useTheme();

  const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const navY = useTransform(scrollY, [0, 100], [-20, 0]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsVisible(latest > 100);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{ opacity: navOpacity, y: navY }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl"
        >
          <nav className="glass-card px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img
                src={sitaLogo}
                alt="SITA OS"
                className="w-8 h-8 rounded-lg"
              />
              <span className="font-bold text-foreground hidden sm:block">SITA OS</span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? (
                    <Moon className="w-5 h-5 text-primary" />
                  ) : (
                    <Sun className="w-5 h-5 text-accent" />
                  )}
                </motion.div>
              </motion.button>

              {/* CTA Button */}
              <button
                onClick={() => scrollToTop()}
                className="hidden md:inline-flex px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary to-accent text-background hover:opacity-90 transition-opacity"
              >
                Join Beta
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="glass-card mt-2 overflow-hidden"
              >
                <div className="p-4 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50 text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                  <button
                    onClick={() => scrollToTop()}
                    className="px-4 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary to-accent text-background hover:opacity-90 transition-opacity mt-2"
                  >
                    Join Beta
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;
