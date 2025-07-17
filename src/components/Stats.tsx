
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Globe, Zap, Award, Clock, Shield, Rocket } from "lucide-react";

export const Stats = () => {
  const mainStats = [
    {
      icon: Users,
      value: "50,000+",
      label: "Empresas Ativas",
      description: "Organizações de todos os portes confiam na nossa plataforma",
      trend: "+127% este ano",
      color: "text-blue-600"
    },
    {
      icon: Globe,
      value: "180+",
      label: "Países Atendidos",
      description: "Presença global com data centers regionais",
      trend: "+15 países em 2024",
      color: "text-green-600"
    },
    {
      icon: Zap,
      value: "2.5B+",
      label: "Consultas/Mês",
      description: "Processamento de consultas de IA em tempo real",
      trend: "+89% capacidade",
      color: "text-yellow-600"
    },
    {
      icon: Award,
      value: "99.9%",
      label: "Uptime SLA",
      description: "Disponibilidade garantida por contrato",
      trend: "Líder do setor",
      color: "text-purple-600"
    }
  ];

  const additionalStats = [
    {
      icon: Clock,
      value: "< 100ms",
      label: "Latência Média",
      description: "Resposta ultra-rápida global"
    },
    {
      icon: Shield,
      value: "Zero",
      label: "Vazamentos de Dados",
      description: "Segurança militar comprovada"
    },
    {
      icon: Rocket,
      value: "5min",
      label: "Setup Médio",
      description: "Implementação plug-and-play"
    },
    {
      icon: TrendingUp,
      value: "340%",
      label: "ROI Médio",
      description: "Retorno comprovado em 6 meses"
    }
  ];

  const certifications = [
    { name: "ISO 27001", type: "Segurança" },
    { name: "SOC 2 Type II", type: "Compliance" },
    { name: "GDPR", type: "Privacidade" },
    { name: "LGPD", type: "Brasil" },
    { name: "HIPAA", type: "Saúde" },
    { name: "PCI DSS", type: "Pagamentos" }
  ];

  return (
    <section className="py-32 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            Resultados Comprovados
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground">
            Números que{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Impressionam
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Métricas reais de uma plataforma que está revolucionando a automação 
            empresarial ao redor do mundo.
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mainStats.map((stat, index) => (
            <Card 
              key={index}
              className="group p-8 text-center hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              {/* Icon */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Value */}
                <div className="text-4xl md:text-5xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-lg font-semibold mb-3 text-foreground">
                  {stat.label}
                </div>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {stat.description}
                </p>
                
                {/* Trend */}
                <Badge variant="secondary" className={`text-xs px-3 py-1 ${stat.color} bg-opacity-10`}>
                  {stat.trend}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {additionalStats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/80 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold mb-1 text-foreground">{stat.value}</div>
              <div className="font-semibold text-sm mb-2 text-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-foreground">
            Certificações e Compliance
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="bg-gradient-subtle rounded-xl p-4 text-center hover:shadow-md transition-all duration-300"
              >
                <div className="font-bold text-sm mb-1 text-foreground">{cert.name}</div>
                <div className="text-xs text-muted-foreground">{cert.type}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Auditoria contínua por firmas independentes • Relatórios públicos disponíveis
            </p>
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            Confiança Global
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-lg font-semibold">Fortune 500</div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="text-lg font-semibold">Startups Unicórnio</div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="text-lg font-semibold">Governos</div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="text-lg font-semibold">ONGs</div>
          </div>
        </div>
      </div>
    </section>
  );
};
