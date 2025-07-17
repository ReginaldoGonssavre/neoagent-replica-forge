
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Cpu, Database, Shield, Zap, Settings, Code, BarChart3, 
         MessageSquare, Workflow, Lock, Globe, Users, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Features = () => {
  const navigate = useNavigate();

  const mainFeatures = [
    {
      icon: Bot,
      title: "Agente IA Conversacional",
      description: "Interface de chat inteligente com processamento de linguagem natural avançado para interações empresariais complexas.",
      badge: "Popular",
      color: "text-blue-600"
    },
    {
      icon: Cpu,
      title: "Processamento RAG+CAG",
      description: "Retrieval-Augmented Generation combinado com Content-Aware Generation para respostas precisas e contextuais.",
      badge: "Novo",
      color: "text-purple-600"
    },
    {
      icon: Database,
      title: "Integração Universal",
      description: "Conecta-se a qualquer banco de dados, API REST, GraphQL e sistemas legados para análise em tempo real.",
      badge: "Pro",
      color: "text-green-600"
    },
    {
      icon: Shield,
      title: "Segurança Militar",
      description: "Criptografia AES-256, autenticação multi-fator, conformidade LGPD/GDPR e auditoria completa.",
      badge: "Enterprise",
      color: "text-red-600"
    },
    {
      icon: Code,
      title: "API Robusta",
      description: "RESTful API completa com documentação OpenAPI, SDKs em múltiplas linguagens e webhooks em tempo real.",
      badge: "Dev",
      color: "text-orange-600"
    },
    {
      icon: BarChart3,
      title: "Analytics Avançados",
      description: "Dashboard executivo com métricas em tempo real, relatórios personalizados e insights preditivos.",
      badge: "BI",
      color: "text-cyan-600"
    }
  ];

  const additionalFeatures = [
    {
      icon: MessageSquare,
      title: "Multi-Canal",
      description: "WhatsApp, Telegram, Slack, Teams"
    },
    {
      icon: Workflow,
      title: "Automação",
      description: "Workflows visuais e triggers inteligentes"
    },
    {
      icon: Lock,
      title: "Compliance",
      description: "LGPD, GDPR, SOX, HIPAA"
    },
    {
      icon: Globe,
      title: "Multi-Idioma",
      description: "Suporte a 50+ idiomas nativos"
    },
    {
      icon: Users,
      title: "Colaborativo",
      description: "Times ilimitados e permissões granulares"
    },
    {
      icon: Smartphone,
      title: "Mobile-First",
      description: "Apps nativos iOS e Android"
    }
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            Tecnologia de Ponta
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground">
            Recursos{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Revolucionários
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Plataforma completa de IA empresarial com arquitetura quântica real, 
            testada e aprovada por mais de 50.000 empresas globalmente.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="group p-8 hover:shadow-elegant transition-all duration-500 hover:-translate-y-3 border-0 bg-white/80 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <Badge 
                  variant="secondary" 
                  className={`text-xs px-2 py-1 ${
                    feature.badge === 'Popular' ? 'bg-blue-100 text-blue-700' :
                    feature.badge === 'Novo' ? 'bg-green-100 text-green-700' :
                    feature.badge === 'Pro' ? 'bg-purple-100 text-purple-700' :
                    feature.badge === 'Enterprise' ? 'bg-red-100 text-red-700' :
                    feature.badge === 'Dev' ? 'bg-orange-100 text-orange-700' :
                    'bg-cyan-100 text-cyan-700'
                  }`}
                >
                  {feature.badge}
                </Badge>
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed text-base">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg"></div>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-subtle rounded-3xl p-12 mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            E muito mais incluído
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-2 text-foreground">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-6">
            Pronto para revolucionar seu negócio?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a mais de 50.000 empresas que já transformaram seus processos com nossa IA.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 font-semibold"
              onClick={() => navigate("/auth")}
            >
              <Zap className="w-5 h-5 mr-2" />
              Teste Gratuito 14 Dias
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 backdrop-blur-sm"
              onClick={() => navigate("/ai-agent")}
            >
              <Code className="w-5 h-5 mr-2" />
              Ver Documentação
            </Button>
          </div>
          
          <div className="mt-6 text-sm opacity-75">
            Sem cartão de crédito • Setup em 5 minutos • Suporte premium incluído
          </div>
        </div>
      </div>
    </section>
  );
};
