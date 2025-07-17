
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Network, 
  Eye, 
  Cpu, 
  Cog, 
  Target,
  Database,
  Layers,
  GitBranch,
  Workflow,
  Search,
  MessageSquare,
  Server,
  Globe,
  Code,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AdvancedAISection = () => {
  const navigate = useNavigate();

  const aiModels = [
    {
      id: "gpt",
      name: "GPT",
      subtitle: "General Pretrained Transformer",
      description: "Predicts next words to generate fluent text, answer questions, chat, and complete tasks from prompts.",
      icon: Brain,
      color: "bg-blue-500",
      features: ["Massive text corpus training", "Encoder-decoder architecture", "Transformer layers"]
    },
    {
      id: "moe",
      name: "MoE",
      subtitle: "Mixture of Experts",
      description: "Activates select expert networks per input for efficient understanding and generation.",
      icon: Network,
      color: "bg-purple-500",
      features: ["Token routing network", "Multiple expert selection", "Efficient processing"]
    },
    {
      id: "lrm",
      name: "LRM",
      subtitle: "Large Reasoning Model",
      description: "Performs multi-step reasoning and planning for consistent, explainable AI responses.",
      icon: Target,
      color: "bg-green-500",
      features: ["Chain-of-thought reasoning", "Self-reflection capability", "Multi-step planning"]
    },
    {
      id: "vlm",
      name: "VLM",
      subtitle: "Vision Language Model",
      description: "Understands images and text jointly to answer questions and generate multimodal content.",
      icon: Eye,
      color: "bg-orange-500",
      features: ["Image encoding", "Multimodal fusion", "Visual understanding"]
    },
    {
      id: "slm",
      name: "SLM",
      subtitle: "Small Language Model",
      description: "Compact model for efficient on-device language tasks and edge computing.",
      icon: Cpu,
      color: "bg-teal-500",
      features: ["Edge optimization", "Lower resource usage", "Fast inference"]
    },
    {
      id: "lam",
      name: "LAM",
      subtitle: "Large Action Model",
      description: "Plans and executes structured actions or API calls for autonomous task completion.",
      icon: Cog,
      color: "bg-red-500",
      features: ["Action planning", "API integration", "Autonomous execution"]
    }
  ];

  const agenticSystems = [
    {
      name: "Single Agent System",
      description: "Query → Agent → Output with integrated memory and tools",
      icon: MessageSquare,
      type: "simple"
    },
    {
      name: "Multi-Agent System",
      description: "Meta-Agent coordinating multiple specialized agents",
      icon: Network,
      type: "complex"
    },
    {
      name: "ReACT Agent",
      description: "Reasoning + Action pattern with tool integration",
      icon: Brain,
      type: "reasoning"
    },
    {
      name: "Agentic RAG",
      description: "Retrieval Augmented Generation with agent capabilities",
      icon: Search,
      type: "rag"
    }
  ];

  const softwareLayers = [
    {
      name: "UI Layer",
      description: "User interface interaction point",
      icon: Globe,
      techs: ["React", "HTML", "CSS", "JavaScript", "Tailwind"]
    },
    {
      name: "API Layer",
      description: "Application programming interface",
      icon: Server,
      techs: ["REST", "GraphQL", "gRPC", "WebSocket"]
    },
    {
      name: "Logic Layer",
      description: "Business logic and core functionalities",
      icon: Code,
      techs: ["Python", "Java", "Node.js", "C#"]
    },
    {
      name: "Database Layer",
      description: "Data storage and management",
      icon: Database,
      techs: ["PostgreSQL", "MongoDB", "Redis", "Supabase"]
    },
    {
      name: "Infrastructure",
      description: "Hosting and deployment layer",
      icon: Settings,
      techs: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* AI Models Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            6 Tipos de{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Modelos de IA
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Arquiteturas avançadas de inteligência artificial para diferentes casos de uso empresariais
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {aiModels.map((model) => {
            const IconComponent = model.icon;
            return (
              <Card key={model.id} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-12 h-12 ${model.color} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary">{model.name}</h3>
                    <p className="text-sm text-gray-600 font-medium">{model.subtitle}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4">{model.description}</p>
                
                <div className="space-y-2">
                  {model.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Agentic Systems Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Sistemas{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Agênticos
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Arquiteturas de agentes inteligentes para automação empresarial avançada
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {agenticSystems.map((system, index) => {
            const IconComponent = system.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">{system.name}</h3>
                <p className="text-sm text-muted-foreground">{system.description}</p>
                <Badge variant="secondary" className="mt-3">
                  {system.type}
                </Badge>
              </Card>
            );
          })}
        </div>

        {/* Software Architecture Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            5 Camadas de{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Software
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Arquitetura completa para sistemas de IA empresariais robustos
          </p>
        </div>

        <div className="space-y-6 mb-16">
          {softwareLayers.map((layer, index) => {
            const IconComponent = layer.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-foreground">{layer.name}</h3>
                    <p className="text-muted-foreground mb-4">{layer.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {layer.techs.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* RAG vs CAG Section */}
        <div className="bg-gradient-subtle rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              RAG + CAG Integration
            </h2>
            <p className="text-lg text-muted-foreground">
              Fusão de Retrieval Augmented Generation e Cache Augmented Generation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">RAG</h3>
                  <p className="text-sm text-muted-foreground">Retrieval Augmented Generation</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Busca informações em tempo real para complementar as respostas da IA
              </p>
              <Badge className="bg-red-100 text-red-800">Hot Data</Badge>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">CAG</h3>
                  <p className="text-sm text-muted-foreground">Cache Augmented Generation</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Utiliza cache inteligente para respostas mais rápidas e eficientes
              </p>
              <Badge className="bg-blue-100 text-blue-800">Cold Data</Badge>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            onClick={() => navigate("/ai-agent")}
            className="bg-gradient-primary text-lg px-8 py-6 mr-4"
          >
            <Brain className="w-5 h-5 mr-2" />
            Experimentar Agente IA
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate("/auth")}
            className="text-lg px-8 py-6"
          >
            <Layers className="w-5 h-5 mr-2" />
            Começar Agora
          </Button>
        </div>
      </div>
    </section>
  );
};
