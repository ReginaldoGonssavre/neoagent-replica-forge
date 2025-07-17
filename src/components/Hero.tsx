
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowRight, Play, Shield, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50"></div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <Badge variant="secondary" className="px-6 py-2 text-sm font-medium bg-white/20 backdrop-blur-sm border-white/30">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              Tecnologia Quântica Real • IA Avançada
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="text-white">Ravian</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              QuantumAI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 max-w-4xl mx-auto leading-relaxed">
            Plataforma completa de Inteligência Artificial para automação empresarial
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto">
            Revolucione seus processos com agentes IA avançados, tecnologia RAG+CAG e 
            automação inteligente. A solução definitiva para empresas que buscam inovação.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/70 text-sm">Empresas Atendidas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-white/70 text-sm">Uptime Garantido</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/70 text-sm">Suporte Técnico</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto font-semibold shadow-xl"
              onClick={() => navigate("/auth")}
            >
              <Zap className="w-6 h-6 mr-3" />
              Começar Gratuitamente
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto backdrop-blur-sm"
              onClick={() => navigate("/ai-agent")}
            >
              <Play className="w-6 h-6 mr-3" />
              Ver Demonstração
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/70">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Certificação ISO 27001</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Suporte Premium 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>4.9/5 - 10K+ Avaliações</span>
            </div>
          </div>

          {/* Trial Info */}
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Teste gratuito de 14 dias • Sem compromisso • Cancelamento fácil
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-primary/20 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-float" style={{animationDelay: '4s'}}></div>
    </section>
  );
};
