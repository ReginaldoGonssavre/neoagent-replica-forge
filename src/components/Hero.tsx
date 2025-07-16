
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Atom, Bot, Cpu, Orbit, Layers, Network, Brain } from "lucide-react";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [quantumIcons, setQuantumIcons] = useState<Array<{id: number, icon: any, delay: number, left: string, top: string}>>([]);

  useEffect(() => {
    // Create quantum icons array with high-quality positioning
    const icons = [Atom, Bot, Cpu, Orbit, Layers, Network, Brain, Zap];
    const newQuantumIcons = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      delay: Math.random() * 3,
      left: Math.random() * 90 + 5 + "%",
      top: Math.random() * 80 + 10 + "%"
    }));
    setQuantumIcons(newQuantumIcons);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Clean White Background */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      
      {/* Floating Quantum Icons - 4K Quality */}
      <div className="absolute inset-0 overflow-hidden">
        {quantumIcons.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="absolute quantum-icon opacity-20 animate-float"
              style={{
                left: item.left,
                top: item.top,
                animationDelay: `${item.delay}s`,
                animationDuration: '6s'
              }}
            >
              <IconComponent className="w-12 h-12 text-primary quantum-icon-4k" />
            </div>
          );
        })}
      </div>

      {/* Quantum Grid Overlay - Subtle */}
      <div className="absolute inset-0 opacity-3">
        <div className="w-full h-full" 
             style={{
               backgroundImage: `
                 linear-gradient(hsl(220 91% 15% / 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, hsl(220 91% 15% / 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '80px 80px'
             }} 
        />
      </div>
      
      {/* Floating Quantum Elements with 4K Icons */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full border-2 border-primary/30 animate-float flex items-center justify-center quantum-icon">
        <Bot className="w-12 h-12 text-primary animate-quantum-pulse quantum-icon-4k" />
      </div>
      <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-primary/10 rounded-full animate-float backdrop-blur-sm quantum-icon" 
           style={{ animationDelay: '2s' }}>
        <div className="w-full h-full rounded-full border-2 border-quantum-cyan/50 flex items-center justify-center">
          <Cpu className="w-10 h-10 text-quantum-cyan quantum-icon-4k" />
        </div>
      </div>
      <div className="absolute top-1/2 right-20 w-24 h-24 border-2 border-primary/40 rounded-full animate-float backdrop-blur-sm quantum-icon" 
           style={{ animationDelay: '4s' }}>
        <div className="w-full h-full rounded-full bg-primary/5 flex items-center justify-center">
          <Atom className="w-8 h-8 text-primary quantum-icon-4k" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Quantum Badge with 4K Icon */}
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/20 mb-8 animate-fade-in">
            <div className="quantum-icon">
              <Atom className="w-6 h-6 text-primary animate-quantum-pulse quantum-icon-4k" />
            </div>
            <span className="text-sm font-medium text-primary">Agente IA Quântico Profissional</span>
            <div className="quantum-icon">
              <Bot className="w-5 h-5 text-primary quantum-icon-4k" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in text-gray-900">
            Agente de IA{" "}
            <span className="bg-gradient-to-r from-primary via-quantum-purple to-quantum-cyan bg-clip-text text-transparent">
              Quântico Real
            </span>{" "}
            para Negócios
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up leading-relaxed">
            <strong className="text-primary">Ravian QuantumAi</strong> é um agente de inteligência artificial 
            desenvolvido para automação empresarial real. Processa dados complexos, gera insights acionáveis 
            e executa tarefas com precisão quântica.
          </p>
          
          {/* Real Performance Stats with Quantum Icons */}
          <div className="flex flex-wrap justify-center gap-12 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-center flex items-center space-x-2">
              <div className="quantum-icon">
                <Network className="w-8 h-8 text-quantum-cyan quantum-icon-4k" />
              </div>
              <div>
                <div className="text-3xl font-bold text-quantum-cyan">95.7%</div>
                <div className="text-sm text-gray-500">Precisão</div>
              </div>
            </div>
            <div className="text-center flex items-center space-x-2">
              <div className="quantum-icon">
                <Orbit className="w-8 h-8 text-primary quantum-icon-4k" />
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-500">Operação</div>
              </div>
            </div>
            <div className="text-center flex items-center space-x-2">
              <div className="quantum-icon">
                <Brain className="w-8 h-8 text-quantum-purple quantum-icon-4k" />
              </div>
              <div>
                <div className="text-3xl font-bold text-quantum-purple">API</div>
                <div className="text-sm text-gray-500">Integração</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 group bg-primary hover:bg-primary/90 text-white hover:shadow-quantum transition-all duration-300 quantum-glow"
            >
              <Bot className="mr-2 w-6 h-6 quantum-icon" />
              Ativar Agente IA
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-primary/30 text-primary hover:bg-primary/5 transition-all duration-300"
            >
              <Play className="mr-2" />
              Ver Demonstração
            </Button>
          </div>
          
          <div className="mt-12 text-gray-600 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm uppercase tracking-wider mb-4 text-primary font-semibold">Solução Empresarial Profissional</p>
            <div className="text-sm flex items-center justify-center space-x-4">
              <span className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-primary quantum-icon" />
                <span>API REST completa</span>
              </span>
              <span className="flex items-center space-x-1">
                <Layers className="w-4 h-4 text-primary quantum-icon" />
                <span>Documentação técnica</span>
              </span>
              <span className="flex items-center space-x-1">
                <Cpu className="w-4 h-4 text-primary quantum-icon" />
                <span>Suporte especializado</span>
              </span>
              <span className="flex items-center space-x-1">
                <Atom className="w-4 h-4 text-primary quantum-icon" />
                <span>SLA garantido</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
