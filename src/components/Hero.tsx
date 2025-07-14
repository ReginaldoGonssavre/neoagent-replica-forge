
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Atom, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [particles, setParticles] = useState<Array<{id: number, delay: number, left: string}>>([]);

  useEffect(() => {
    // Create quantum particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 15,
      left: Math.random() * 100 + "%"
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Galaxy Background */}
      <div className="absolute inset-0 bg-gradient-galaxy" />
      
      {/* Quantum Particles */}
      <div className="quantum-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary-glow rounded-full animate-particle-float opacity-60"
            style={{
              left: particle.left,
              animationDelay: `${particle.delay}s`,
              boxShadow: '0 0 4px hsl(var(--primary-glow))'
            }}
          />
        ))}
      </div>

      {/* Quantum Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }} 
        />
      </div>
      
      {/* Floating Quantum Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full border border-primary-glow/30 animate-float flex items-center justify-center">
        <Atom className="w-8 h-8 text-primary-glow animate-quantum-pulse" />
      </div>
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-primary/20 rounded-full animate-float backdrop-blur-sm" 
           style={{ animationDelay: '2s' }}>
        <div className="w-full h-full rounded-full border border-quantum-cyan/50 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-quantum-cyan" />
        </div>
      </div>
      <div className="absolute top-1/2 right-20 w-16 h-16 border-2 border-quantum-pink/40 rounded-full animate-float backdrop-blur-sm" 
           style={{ animationDelay: '4s' }}>
        <div className="w-full h-full rounded-full bg-quantum-pink/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-quantum-pink" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-5xl mx-auto">
          {/* Quantum Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-morphism border border-primary-glow/30 mb-8 animate-fade-in">
            <Atom className="w-4 h-4 text-primary-glow animate-quantum-pulse" />
            <span className="text-sm font-medium text-primary-glow">Powered by Quantum Intelligence</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in">
            O Futuro da{" "}
            <span className="bg-gradient-to-r from-primary-glow via-quantum-cyan to-quantum-pink bg-clip-text text-transparent animate-quantum-pulse">
              IA Quântica
            </span>{" "}
            está aqui
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up leading-relaxed">
            <strong className="text-primary-glow">Ravian QuantumAi</strong> revoluciona a automação empresarial 
            com processamento quântico avançado. Configure fluxos de trabalho inteligentes em segundos 
            e experimente o poder da computação do futuro.
          </p>
          
          {/* Quantum Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <div className="text-2xl font-bold text-quantum-cyan">1000x</div>
              <div className="text-sm text-white/70">Mais Rápido</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-quantum-pink">99.9%</div>
              <div className="text-sm text-white/70">Precisão</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-glow">∞</div>
              <div className="text-sm text-white/70">Possibilidades</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 group bg-gradient-primary hover:shadow-quantum transition-all duration-300 quantum-glow"
            >
              <Zap className="mr-2 w-5 h-5" />
              Ativar Quantum Mode
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 glass-morphism border-primary-glow/30 text-white hover:bg-white/10 backdrop-blur-sm hover:border-primary-glow/50 transition-all duration-300"
            >
              <Play className="mr-2" />
              Ver Demo Quântica
            </Button>
          </div>
          
          <div className="mt-12 text-white/70 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm uppercase tracking-wider mb-4 text-primary-glow">Confiado pelas Empresas do Futuro</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold">QuantumCorp</div>
              <div className="text-2xl font-bold">NeuralSoft</div>
              <div className="text-2xl font-bold">FutureTech</div>
              <div className="text-2xl font-bold">InfinityAI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
