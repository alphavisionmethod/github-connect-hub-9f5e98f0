import HeroSection from "@/components/HeroSection";
import CoreEngineSection from "@/components/CoreEngineSection";
import ThreeDesksSection from "@/components/ThreeDesksSection";
import BoardOfAdvisorsSection from "@/components/BoardOfAdvisorsSection";
import AutonomyLadderSection from "@/components/AutonomyLadderSection";
import MultiPlatformSection from "@/components/MultiPlatformSection";
import FAQSection from "@/components/FAQSection";
import SovereignBackerSection from "@/components/SovereignBackerSection";
import DemoVideoSection from "@/components/DemoVideoSection";
import InvestorDataRoom from "@/components/InvestorDataRoom";
import LiveReceiptMarquee from "@/components/LiveReceiptMarquee";
import FooterSection from "@/components/FooterSection";
import FloatingNav from "@/components/FloatingNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatingNav />
      <HeroSection />
      <CoreEngineSection />
      <ThreeDesksSection />
      <BoardOfAdvisorsSection />
      <AutonomyLadderSection />
      <MultiPlatformSection />
      <SovereignBackerSection />
      <DemoVideoSection />
      <InvestorDataRoom />
      <FAQSection />
      <LiveReceiptMarquee />
      <FooterSection />
    </div>
  );
};

export default Index;
