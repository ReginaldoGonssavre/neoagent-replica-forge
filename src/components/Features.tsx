import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Clock, Shield, BarChart3, Workflow, Settings } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Configuração em 60 segundos",
      description: "Configure fluxos de trabalho poderosos sem código. Comece com nossos modelos e personalize usando linguagem natural."
    },
    {
      icon: Clock,
      title: "Automação 24/7",
      description: "Nunca mais perca tickets ou processos importantes. Nossa IA trabalha continuamente para manter tudo funcionando."
    },
    {
      icon: Shield,
      title: "Segurança Empresarial",
      description: "Proteção de dados de nível empresarial com criptografia avançada e controles de acesso granulares."
    },
    {
      icon: BarChart3,
      title: "Analytics Avançados",
      description: "Dashboards em tempo real com insights acionáveis para otimizar continuamente seus processos."
    },
    {
      icon: Workflow,
      title: "Integrações Nativas",
      description: "Conecte-se facilmente com suas ferramentas existentes. Suporte para 100+ integrações populares."
    },
    {
      icon: Settings,
      title: "Personalização Total",
      description: "Adapte a plataforma às suas necessidades específicas com configurações flexíveis e APIs robustas."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Configure fluxos de trabalho em menos de{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              60 segundos
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma nova geração de plataforma de automação que permite criar fluxos 
            de trabalho poderosos sem código. Comece com nossos modelos e personalize 
            usando linguagem natural.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-0 bg-white/50 backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="cta" size="lg" className="text-lg px-8 py-6">
            Experimentar Gratuitamente
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Sem cartão de crédito • Setup em 2 minutos • Suporte 24/7
          </p>
        </div>
      </div>
    </section>
  );
};