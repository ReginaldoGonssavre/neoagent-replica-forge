
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Remove dark mode for white theme
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Stats />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
