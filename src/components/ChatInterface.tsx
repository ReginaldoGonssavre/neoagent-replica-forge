
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
}

interface ChatInterfaceProps {
  userId: string;
  conversationId: string | null;  
  onConversationChange: (id: string) => void;
}

export const ChatInterface = ({ userId, conversationId, onConversationChange }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationTitle, setConversationTitle] = useState("Nova Conversa");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
      fetchConversationTitle();
    } else {
      setMessages([]);
      setConversationTitle("Nova Conversa");
    }
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    if (!conversationId) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) {
        toast.error('Erro ao carregar mensagens');
        return;
      }

      setMessages(data || []);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    }
  };

  const fetchConversationTitle = async () => {
    if (!conversationId) return;

    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('title')
        .eq('id', conversationId)
        .single();

      if (error) return;
      setConversationTitle(data.title);
    } catch (error) {
      console.error('Erro ao buscar título da conversa:', error);
    }
  };

  const createConversationIfNeeded = async () => {
    if (conversationId) return conversationId;

    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert([
          {
            user_id: userId,
            title: 'Nova Conversa'
          }
        ])
        .select()
        .single();

      if (error) {
        toast.error('Erro ao criar conversa');
        return null;
      }

      onConversationChange(data.id);
      return data.id;
    } catch (error) {
      toast.error('Erro inesperado ao criar conversa');
      return null;
    }
  };

  const updateApiUsage = async () => {
    const today = new Date().toISOString().split('T')[0];
    
    try {
      const { data: existingUsage } = await supabase
        .from('api_usage')
        .select('requests_count')
        .eq('user_id', userId)
        .eq('date', today)
        .single();

      if (existingUsage) {
        await supabase
          .from('api_usage')
          .update({ requests_count: existingUsage.requests_count + 1 })
          .eq('user_id', userId)
          .eq('date', today);
      } else {
        await supabase
          .from('api_usage')
          .insert([
            {
              user_id: userId,
              date: today,
              requests_count: 1
            }
          ]);
      }
    } catch (error) {
      console.error('Erro ao atualizar uso da API:', error);
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      `Entendo sua pergunta sobre "${userMessage}". Como agente IA da Ravian QuantumAI, posso ajudá-lo com análises avançadas e insights empresariais.`,
      `Interessante questão! Com base em "${userMessage}", posso sugerir algumas estratégias usando nossa tecnologia quântica de processamento.`,
      `Vou analisar "${userMessage}" com nossos algoritmos avançados. Nossa plataforma oferece soluções personalizadas para cada necessidade empresarial.`,
      `Obrigado por sua pergunta sobre "${userMessage}". Nossa IA está projetada para fornecer respostas precisas e contextualmente relevantes.`,
      `Com relação a "${userMessage}", nossa tecnologia RAG permite análises profundas baseadas em sua base de conhecimento específica.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const currentConversationId = await createConversationIfNeeded();
    if (!currentConversationId) return;

    setLoading(true);
    const userMessageContent = inputMessage.trim();
    setInputMessage("");

    try {
      // Adicionar mensagem do usuário
      const { data: userMessage, error: userError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: currentConversationId,
            user_id: userId,
            content: userMessageContent,
            role: 'user'
          }
        ])
        .select()
        .single();

      if (userError) {
        toast.error('Erro ao enviar mensagem');
        return;
      }

      setMessages(prev => [...prev, userMessage]);

      // Simular resposta da IA
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse = generateAIResponse(userMessageContent);

      const { data: aiMessage, error: aiError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: currentConversationId,
            user_id: userId,
            content: aiResponse,
            role: 'assistant'
          }
        ])
        .select()
        .single();

      if (aiError) {
        toast.error('Erro na resposta da IA');
        return;
      }

      setMessages(prev => [...prev, aiMessage]);

      // Atualizar título da conversa se for a primeira mensagem
      if (messages.length === 0) {
        const newTitle = userMessageContent.length > 30 
          ? userMessageContent.substring(0, 30) + "..." 
          : userMessageContent;
        
        await supabase
          .from('conversations')
          .update({ title: newTitle })
          .eq('id', currentConversationId);

        setConversationTitle(newTitle);
      }

      await updateApiUsage();

    } catch (error) {
      toast.error('Erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="h-[600px] glass-morphism border-0 flex flex-col">
      <div className="border-b border-white/10 p-4">
        <h2 className="text-white font-semibold text-lg">{conversationTitle}</h2>
        <p className="text-white/70 text-sm">Converse com o agente IA da Ravian QuantumAI</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-white/70">
            <Bot className="w-16 h-16 mb-4 text-primary-glow" />
            <h3 className="text-xl font-semibold mb-2">Olá! Como posso ajudá-lo?</h3>
            <p className="text-center max-w-md">
              Sou o agente IA da Ravian QuantumAI. Posso ajudá-lo com análises, 
              insights empresariais e responder suas perguntas.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                        : 'bg-gradient-primary'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-2 opacity-70">
                      {new Date(message.created_at).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Loader className="w-4 h-4 animate-spin text-primary-glow" />
                      <span className="text-white text-sm">IA está pensando...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      <div className="border-t border-white/10 p-4">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            disabled={loading}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Button
            onClick={sendMessage}
            disabled={loading || !inputMessage.trim()}
            className="bg-gradient-primary hover:shadow-quantum"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-white/50 mt-2 text-center">
          Pressione Enter para enviar • Limite: 50 mensagens/dia (plano gratuito)
        </p>
      </div>
    </Card>
  );
};
