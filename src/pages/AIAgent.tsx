
import { useState } from "react";
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
  Camera,
  Cpu,
  Target,
  Layers
} from "lucide-react";
import { toast } from "sonner";

interface LLMResponse {
  type: string;
  response: string;
  steps?: string[];
}

export default function AIAgent() {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState<LLMResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const models = [
    {
      id: "gpt",
      name: "GPT",
      subtitle: "General Pretrained Transformer",
      description: "Predicts next words to generate fluent text, answer questions, chat, and complete tasks from prompts.",
      icon: Brain,
      color: "bg-blue-500",
      features: ["Pretrained massive text corpus", "Encoder-decoder prompts", "Transformer layers to produce hidden states"]
    },
    {
      id: "moe",
      name: "MoE",
      subtitle: "Mixture of Experts",
      description: "Activates select expert networks per input for efficient understanding and generation.",
      icon: Network,
      color: "bg-purple-500",
      features: ["Token routing through gating network", "Tokenize and embed input text", "Gating network selects 'top-k' experts per token"]
    },
    {
      id: "lrm",
      name: "LRM",
      subtitle: "Large Reasoning Model",
      description: "Performs multi-step reasoning and planning for more consistent, explainable AI responses.",
      icon: Target,
      color: "bg-green-500",
      features: ["Tokenize input and context", "Generate initial chain-of-thought reasoning steps internally", "Evaluate/rank possible response paths (self-reflection)"]
    },
    {
      id: "vlm",
      name: "VLM",
      subtitle: "Vision Action Model",
      description: "Understands images and text jointly to answer questions, describe, or generate multimodal content.",
      icon: Eye,
      color: "bg-orange-500",
      features: ["Encode image", "Tokenize any text input", "Fuse vision & text modalities through transformer layers"]
    },
    {
      id: "slm",
      name: "SLM",
      subtitle: "Small Language Model",
      description: "Compact model for efficient on-device language tasks like generation, summarization, or classification.",
      icon: Cpu,
      color: "bg-teal-500",
      features: ["Tokenize input", "Embed tokens into lower-dimensional space", "Process through fewer transformer layers"]
    },
    {
      id: "lam",
      name: "LAM",
      subtitle: "Large Action Model",
      description: "Plans and executes structured actions or API calls from prompts for autonomous task completion.",
      icon: Cog,
      color: "bg-red-500",
      features: ["Task description and environment state", "Tokenize action description and environment", "Plan sequence of actions (CoT planning)"]
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

  const processWithGPT = (text: string): LLMResponse => {
    return {
      type: "GPT",
      response: `Analisando sua solicitação: "${text}". Como um modelo de linguagem generativo, posso ajudar com texto, conversação e tarefas diversas. Esta é uma resposta simulada demonstrando capacidades de GPT.`
    };
  };

  const processWithMoE = (text: string): LLMResponse => {
    return {
      type: "MoE",
      response: `Ativando especialistas relevantes para: "${text}". Sistema MoE selecionou 3 de 8 especialistas para processar esta entrada de forma eficiente.`,
      steps: ["🔀 Roteamento de tokens", "👥 Seleção de especialistas", "🔄 Agregação de resultados"]
    };
  };

  const processWithLRM = (text: string): LLMResponse => {
    return {
      type: "LRM",
      response: `Processamento multi-etapas para: "${text}". Aplicando raciocínio estruturado e auto-reflexão.`,
      steps: [
        "🧠 Analisando contexto da entrada",
        "🔍 Quebrando problema em subtarefas", 
        "🧩 Planejando sequência de raciocínio",
        "✅ Gerando resposta explicável"
      ]
    };
  };

  const processWithVLM = (text: string): LLMResponse => {
    return {
      type: "VLM",
      response: `Módulo de visão ativado para: "${text}". Capacidade de processamento multimodal (texto + imagem) disponível.`,
      steps: ["📷 Codificação de imagem", "📝 Tokenização de texto", "🔗 Fusão multimodal"]
    };
  };

  const processWithLAM = (text: string): LLMResponse => {
    const actions = [];
    if (text.toLowerCase().includes("ligar")) {
      actions.push("🚜 Enviando comando para ligar equipamento");
    }
    if (text.toLowerCase().includes("executar")) {
      actions.push("⚙️ Executando sequência de ações planejadas");
    }
    if (actions.length === 0) {
      actions.push("📋 Planejando ações estruturadas");
    }

    return {
      type: "LAM",
      response: `Modelo de ação ativado para: "${text}". Executando comandos e interações com APIs.`,
      steps: actions
    };
  };

  const processWithSLM = (text: string): LLMResponse => {
    return {
      type: "SLM",
      response: `Processamento eficiente e compacto para: "${text}". Modelo otimizado para velocidade e recursos limitados.`,
      steps: ["⚡ Tokenização rápida", "🔄 Processamento leve", "📱 Resposta otimizada"]
    };
  };

  const processInput = async (text: string, modelType?: string) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula processamento
      
      const taskType = modelType || classifyTask(text);
      let response: LLMResponse;

      switch (taskType) {
        case "gpt":
          response = processWithGPT(text);
          break;
        case "moe":
          response = processWithMoE(text);
          break;
        case "lrm":
          response = processWithLRM(text);
          break;
        case "vlm":
          response = processWithVLM(text);
          break;
        case "lam":
          response = processWithLAM(text);
          break;
        case "slm":
          response = processWithSLM(text);
          break;
        default:
          response = processWithGPT(text);
      }

      setResponses(prev => [...prev, response]);
      toast.success(`Processado com ${response.type}`);
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
      <div className="bg-gradient-primary text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Agente IA Integrado</h1>
              <p className="text-white/80">6 Tipos de Modelos de Linguagem</p>
            </div>
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
            </div>
            
            <Textarea
              placeholder="Ex: 'Analise esta imagem', 'Planeje passo a passo', 'Execute uma ação', etc."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[100px]"
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
                Limpar Respostas
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
                className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50"
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
                
                <div className="space-y-2">
                  {model.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-4 text-primary hover:bg-primary/10"
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
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary mb-4">Respostas do Agente</h2>
            
            {responses.map((response, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge variant="secondary" className="bg-gradient-primary text-white">
                    {response.type}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Resposta #{responses.length - index}
                  </span>
                </div>
                
                <p className="text-gray-800 mb-4">{response.response}</p>
                
                {response.steps && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-2">Etapas de Processamento:</h4>
                    <div className="space-y-2">
                      {response.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-center text-sm text-gray-700">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 text-xs font-bold text-primary">
                            {stepIndex + 1}
                          </div>
                          {step}
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
          <Card className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <Zap className="w-6 h-6 animate-spin text-primary" />
              <span className="text-primary font-medium">Processando com agente de IA...</span>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
