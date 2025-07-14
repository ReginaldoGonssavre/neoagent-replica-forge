
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Atom, Sparkles, Bot, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [particles, setParticles] = useState<Array<{id: number, delay: number, left: string}>>([]);

  useEffect(() => {
    // Create quantum particles
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
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
            className="absolute w-1 h-1 bg-primary-glow rounded-full animate-particle-float opacity-70"
            style={{
              left: particle.left,
              animationDelay: `${particle.delay}s`,
              boxShadow: '0 0 4px hsl(var(--primary-glow))'
            }}
          />
        ))}
      </div>

      {/* Quantum Grid Overlay */}
      <div className="absolute inset-0 opacity-5">
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
        <Bot className="w-8 h-8 text-primary-glow animate-quantum-pulse" />
      </div>
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-primary/20 rounded-full animate-float backdrop-blur-sm" 
           style={{ animationDelay: '2s' }}>
        <div className="w-full h-full rounded-full border border-quantum-cyan/50 flex items-center justify-center">
          <Cpu className="w-6 h-6 text-quantum-cyan" />
        </div>
      </div>
      <div className="absolute top-1/2 right-20 w-16 h-16 border-2 border-quantum-white/40 rounded-full animate-float backdrop-blur-sm" 
           style={{ animationDelay: '4s' }}>
        <div className="w-full h-full rounded-full bg-quantum-white/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-quantum-white" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-5xl mx-auto">
          {/* Quantum Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-morphism border border-primary-glow/30 mb-8 animate-fade-in">
            <Atom className="w-4 h-4 text-primary-glow animate-quantum-pulse" />
            <span className="text-sm font-medium text-primary-glow">Agente IA Quântico Profissional</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in">
            Agente de IA{" "}
            <span className="bg-gradient-to-r from-primary-glow via-quantum-cyan to-quantum-white bg-clip-text text-transparent animate-quantum-pulse">
              Quântico Real
            </span>{" "}
            para Negócios
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up leading-relaxed">
            <strong className="text-primary-glow">Ravian QuantumAi</strong> é um agente de inteligência artificial 
            desenvolvido para automação empresarial real. Processa dados complexos, gera insights acionáveis 
            e executa tarefas com precisão quântica.
          </p>
          
          {/* Real Performance Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <div className="text-2xl font-bold text-quantum-cyan">95.7%</div>
              <div className="text-sm text-white/70">Precisão</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-quantum-white">24/7</div>
              <div className="text-sm text-white/70">Operação</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-glow">API</div>
              <div className="text-sm text-white/70">Integração</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 group bg-gradient-primary hover:shadow-quantum transition-all duration-300 quantum-glow"
            >
              <Bot className="mr-2 w-5 h-5" />
              Ativar Agente IA
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 glass-morphism border-primary-glow/30 text-white hover:bg-white/10 backdrop-blur-sm hover:border-primary-glow/50 transition-all duration-300"
            >
              <Play className="mr-2" />
              Ver Demonstração
            </Button>
          </div>
          
          <div className="mt-12 text-white/70 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm uppercase tracking-wider mb-4 text-primary-glow">Solução Empresarial Profissional</p>
            <div className="text-sm">
              ✓ API REST completa • ✓ Documentação técnica • ✓ Suporte especializado • ✓ SLA garantido
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
