
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Cpu, Database, Shield, Zap, Settings, Code, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      title: "Agente IA Conversacional",
      description: "Interface de chat inteligente com processamento de linguagem natural avançado para interações empresariais."
    },
    {
      icon: Cpu,
      title: "Processamento RAG",
      description: "Retrieval-Augmented Generation para respostas precisas baseadas em sua base de conhecimento."
    },
    {
      icon: Database,
      title: "Integração de Dados",
      description: "Conecta-se a bancos de dados, APIs e sistemas existentes para análise em tempo real."
    },
    {
      icon: Shield,
      title: "Segurança Empresarial",
      description: "Criptografia avançada, controle de acesso e conformidade com padrões de segurança."
    },
    {
      icon: Code,
      title: "API Robusta",
      description: "RESTful API completa para integração com sistemas existentes e desenvolvimento personalizado."
    },
    {
      icon: BarChart3,
      title: "Analytics Avançados",
      description: "Dashboard com métricas detalhadas, insights de performance e relatórios executivos."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Tecnologia{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Quântica Real
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Agente de IA desenvolvido com arquitetura avançada para aplicações 
            empresariais críticas. Tecnologia comprovada e testada em produção.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-0 bg-white/50 backdrop-blur-sm group"
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
          <Button 
            variant="cta" 
            size="lg" 
            className="text-lg px-8 py-6 mr-4"
            onClick={() => navigate("/auth")}
          >
            <Zap className="w-5 h-5 mr-2" />
            Teste o Agente
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => navigate("/auth")}
          >
            <Code className="w-5 h-5 mr-2" />
            Documentação API
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Teste gratuito de 14 dias • API completa • Suporte técnico incluído
          </p>
        </div>
      </div>
    </section>
  );
};
