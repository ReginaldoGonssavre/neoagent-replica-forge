
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Ativar modo dark automaticamente para o tema quântico
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-galaxy">
      <Header />
      <Hero />
      <Stats />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
