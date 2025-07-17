
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, 
  Brain, 
  Eye, 
  Cog, 
  Zap, 
  Network,
  MessageSquare,
  Sparkles,
  Target,
  Layers,
  Search,
  Database,
  Cpu
} from "lucide-react";
import { toast } from "sonner";

interface LLMResponse {
  type: string;
  response: string;
  steps?: string[];
  architecture?: string;
}

export default function AIAgent() {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState<LLMResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [agentMode, setAgentMode] = useState<"single" | "multi" | "rag">("single");

  const models = [
    {
      id: "gpt",
      name: "GPT",
      subtitle: "General Pretrained Transformer",
      description: "Predicts next words to generate fluent text, answer questions, chat, and complete tasks from prompts.",
      icon: Brain,
      color: "bg-blue-500",
      features: ["Pretrained massive text corpus", "Encoder-decoder prompts", "Transformer layers to produce hidden states"],
      architecture: "Transformer-based autoregressive model"
    },
    {
      id: "moe",
      name: "MoE",
      subtitle: "Mixture of Experts",
      description: "Activates select expert networks per input for efficient understanding and generation.",
      icon: Network,
      color: "bg-purple-500",
      features: ["Token routing through gating network", "Tokenize and embed input text", "Gating network selects 'top-k' experts per token"],
      architecture: "Sparse expert selection with routing network"
    },
    {
      id: "lrm",
      name: "LRM",
      subtitle: "Large Reasoning Model",
      description: "Performs multi-step reasoning and planning for more consistent, explainable AI responses.",
      icon: Target,
      color: "bg-green-500",
      features: ["Tokenize input and context", "Generate initial chain-of-thought reasoning steps internally", "Evaluate/rank possible response paths (self-reflection)"],
      architecture: "Chain-of-thought with self-reflection capabilities"
    },
    {
      id: "vlm",
      name: "VLM",
      subtitle: "Vision Language Model",
      description: "Understands images and text jointly to answer questions, describe, or generate multimodal content.",
      icon: Eye,
      color: "bg-orange-500",
      features: ["Encode image", "Tokenize any text input", "Fuse vision & text modalities through transformer layers"],
      architecture: "Multimodal transformer with vision encoder"
    },
    {
      id: "slm",
      name: "SLM",
      subtitle: "Small Language Model",
      description: "Compact model for efficient on-device language tasks like generation, summarization, or classification.",
      icon: Cpu,
      color: "bg-teal-500",
      features: ["Tokenize input", "Embed tokens into lower-dimensional space", "Process through fewer transformer layers"],
      architecture: "Compressed transformer for edge deployment"
    },
    {
      id: "lam",
      name: "LAM",
      subtitle: "Large Action Model",
      description: "Plans and executes structured actions or API calls from prompts for autonomous task completion.",
      icon: Cog,
      color: "bg-red-500",
      features: ["Task description and environment state", "Tokenize action description and environment", "Plan sequence of actions (CoT planning)"],
      architecture: "Action-oriented model with tool integration"
    }
  ];

  const agentModes = [
    {
      id: "single",
      name: "Single Agent",
      description: "Query → Agent → Output",
      icon: MessageSquare
    },
    {
      id: "multi", 
      name: "Multi-Agent",
      description: "Meta-Agent coordinating specialists",
      icon: Network
    },
    {
      id: "rag",
      name: "Agentic RAG",
      description: "RAG + CAG Integration",
      icon: Search
    }
  ];

  const classifyTask = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("imagem") || lowerInput.includes("foto") || lowerInput.includes("visual")) {
      return "vlm";
    } else if (lowerInput.includes("passo a passo") || lowerInput.includes("planejar") || lowerInput.includes("raciocinar")) {
      return "lrm";
    } else if (lowerInput.includes("executar") || lowerInput.includes("api") || lowerInput.includes("ação")) {
      return "lam";
    } else if (lowerInput.includes("especialista") || lowerInput.includes("otimizar") || lowerInput.includes("expert")) {
      return "moe";
    } else if (lowerInput.includes("rápido") || lowerInput.includes("leve") || lowerInput.includes("simples")) {
      return "slm";
    } else {
      return "gpt";
    }
  };

  const processWithModel = (text: string, modelId: string, agentType: string): LLMResponse => {
    const model = models.find(m => m.id === modelId);
    const baseResponse = {
      type: model?.name || "GPT",
      response: "",
      architecture: model?.architecture || "",
      steps: []
    };

    switch (modelId) {
      case "gpt":
        return {
          ...baseResponse,
          response: `[${agentType.toUpperCase()}] Analisando: "${text}". Resposta gerada usando arquitetura transformer com predição sequencial de tokens.`,
          steps: ["🔤 Tokenização", "🧠 Processamento transformer", "📝 Geração sequencial"]
        };
      
      case "moe":
        return {
          ...baseResponse,
          response: `[${agentType.toUpperCase()}] Ativando especialistas para: "${text}". Sistema MoE selecionou 3 de 8 especialistas relevantes.`,
          steps: ["🔀 Roteamento de tokens", "👥 Seleção de especialistas", "🔄 Agregação de resultados"]
        };
      
      case "lrm":
        return {
          ...baseResponse,
          response: `[${agentType.toUpperCase()}] Processamento multi-etapas para: "${text}". Aplicando raciocínio estruturado com auto-reflexão.`,
          steps: [
            "🧠 Análise inicial do contexto",
            "🔍 Decomposição em subtarefas", 
            "🧩 Cadeia de raciocínio",
            "🔄 Auto-reflexão e validação",
            "✅ Resposta explicável"
          ]
        };
      
      case "vlm":
        return {
          ...baseResponse,
          response: `[${agentType.toUpperCase()}] Processamento multimodal para: "${text}". Integrando capacidades de visão e linguagem.`,
          steps: ["📷 Codificação visual", "📝 Tokenização textual", "🔗 Fusão multimodal", "🎯 Resposta integrada"]
        };
      
      case "lam":
        return {
          ...baseResponse,
          response: `[${agentType.toUpperCase()}] Planejamento de ações para: "${text}". Preparando execução autônoma.`,
          steps: ["📋 Análise de tarefas", "🎯 Planejamento de ações", "🔧 Integração de ferramentas", "⚡ Execução autônoma"]
        };
      
      case "slm":
        return {
          ...baseResponse,
          response: `[${agentType.toUpperCase()}] Processamento eficiente para: "${text}". Modelo compacto otimizado para edge computing.`,
          steps: ["⚡ Tokenização rápida", "🔄 Processamento leve", "📱 Resposta otimizada"]
        };
      
      default:
        return baseResponse;
    }
  };

  const processInput = async (text: string, modelType?: string) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const taskType = modelType || classifyTask(text);
      const response = processWithModel(text, taskType, agentMode);

      setResponses(prev => [...prev, response]);
      toast.success(`Processado com ${response.type} (${agentMode})`);
    } catch (error) {
      toast.error("Erro no processamento");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    processInput(input, selectedModel);
    setInput("");
    setSelectedModel(null);
  };

  const handleModelClick = (modelId: string) => {
    if (!input.trim()) {
      toast.error("Digite uma entrada primeiro");
      return;
    }
    setSelectedModel(modelId);
    processInput(input, modelId);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <Bot className="w-9 h-9 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Agente IA Avançado</h1>
              <p className="text-white/80 text-lg">6 Modelos + 3 Arquiteturas Agênticas</p>
            </div>
          </div>

          {/* Agent Mode Selector */}
          <div className="flex flex-wrap gap-3">
            {agentModes.map((mode) => {
              const IconComponent = mode.icon;
              return (
                <Button
                  key={mode.id}
                  variant={agentMode === mode.id ? "secondary" : "ghost"}
                  onClick={() => setAgentMode(mode.id as any)}
                  className="text-white hover:bg-white/20"
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {mode.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Input Section */}
        <Card className="p-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Digite sua solicitação</h2>
              <Badge variant="outline">{agentMode} mode</Badge>
            </div>
            
            <Textarea
              placeholder="Ex: 'Analise esta imagem', 'Planeje passo a passo uma estratégia', 'Execute uma integração de API', etc."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px]"
            />
            
            <div className="flex space-x-2">
              <Button 
                onClick={handleSubmit}
                disabled={loading || !input.trim()}
                className="bg-gradient-primary"
              >
                {loading ? <Zap className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                Processar Automaticamente
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setResponses([])}
                disabled={responses.length === 0}
              >
                Limpar Histórico
              </Button>
            </div>
          </div>
        </Card>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {models.map((model) => {
            const IconComponent = model.icon;
            return (
              <Card 
                key={model.id}
                className="p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                onClick={() => handleModelClick(model.id)}
              >
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
                
                <div className="space-y-2 mb-4">
                  {model.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Badge variant="secondary" className="text-xs mb-3">
                  {model.architecture}
                </Badge>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-primary hover:bg-primary/10"
                  disabled={!input.trim() || loading}
                >
                  Usar {model.name}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Responses Section */}
        {responses.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
              <Database className="w-6 h-6 mr-2" />
              Respostas do Agente ({responses.length})
            </h2>
            
            {responses.map((response, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-gradient-primary text-white">
                      {response.type}
                    </Badge>
                    <Badge variant="outline">
                      Resposta #{responses.length - index}
                    </Badge>
                    {response.architecture && (
                      <Badge variant="outline" className="text-xs">
                        {response.architecture}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-800 mb-4 font-medium">{response.response}</p>
                
                {response.steps && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-3 flex items-center">
                      <Layers className="w-4 h-4 mr-2" />
                      Pipeline de Processamento:
                    </h4>
                    <div className="space-y-3">
                      {response.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-center text-sm text-gray-700">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3 text-xs font-bold text-primary">
                            {stepIndex + 1}
                          </div>
                          <span className="flex-1">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {loading && (
          <Card className="p-8">
            <div className="flex items-center justify-center space-x-4">
              <Zap className="w-8 h-8 animate-spin text-primary" />
              <div className="text-center">
                <p className="text-primary font-medium text-lg">Processando com agente {agentMode}...</p>
                <p className="text-gray-500 text-sm">Aplicando arquitetura avançada de IA</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
