import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-primary-glow/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in">
            O Técnico de{" "}
            <span className="bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              IA
            </span>{" "}
            para sua empresa
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up">
            Frustrado com ferramentas de automação que exigem scripts complexos? 
            Nossa plataforma simplifica a automação. Configure fluxos de trabalho em minutos 
            e economize tempo com processos inteligentes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-6 group"
            >
              Começar Agora
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Play className="mr-2" />
              Ver Demo
            </Button>
          </div>
          
          <div className="mt-12 text-white/70 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm uppercase tracking-wider mb-4">Confiado pelas principais empresas</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold">TechCorp</div>
              <div className="text-2xl font-bold">InnovaSoft</div>
              <div className="text-2xl font-bold">FutureTech</div>
              <div className="text-2xl font-bold">SmartSys</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};