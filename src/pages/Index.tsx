
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AdvancedAISection } from "@/components/AdvancedAISection";
import { AICircleSection } from "@/components/AICircleSection";
import { Stats } from "@/components/Stats";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <AdvancedAISection />
      <AICircleSection />
      <Stats />
      <Footer />
    </div>
  );
};

export default Index;
