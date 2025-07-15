
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, MessageSquare, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeConversation: string | null;
  onSelectConversation: (id: string | null) => void;
  userId: string;
}

export const DashboardSidebar = ({ 
  isOpen, 
  onClose, 
  activeConversation, 
  onSelectConversation,
  userId 
}: DashboardSidebarProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchConversations();
    }
  }, [isOpen, userId]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) {
        toast.error('Erro ao carregar conversas');
        return;
      }

      setConversations(data || []);
    } catch (error) {
      toast.error('Erro inesperado ao carregar conversas');
    } finally {
      setLoading(false);
    }
  };

  const createNewConversation = async () => {
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
        toast.error('Erro ao criar nova conversa');
        return;
      }

      setConversations(prev => [data, ...prev]);
      onSelectConversation(data.id);
      toast.success('Nova conversa criada!');
    } catch (error) {
      toast.error('Erro inesperado ao criar conversa');
    }
  };

  const deleteConversation = async (conversationId: string) => {
    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', conversationId);

      if (error) {
        toast.error('Erro ao deletar conversa');
        return;
      }

      setConversations(prev => prev.filter(c => c.id !== conversationId));
      if (activeConversation === conversationId) {
        onSelectConversation(null);
      }
      toast.success('Conversa deletada!');
    } catch (error) {
      toast.error('Erro inesperado ao deletar conversa');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      <div className="absolute inset-0 bg-black/50 lg:hidden" onClick={onClose} />
      
      <div className="relative w-80 h-full bg-black/40 backdrop-blur-sm border-r border-white/10 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-white font-semibold">Conversas</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white/80 hover:text-white lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-4">
          <Button
            onClick={createNewConversation}
            className="w-full bg-gradient-primary hover:shadow-quantum"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Conversa
          </Button>
        </div>

        <ScrollArea className="flex-1 px-4">
          {loading ? (
            <div className="text-white/70 text-center py-4">Carregando...</div>
          ) : conversations.length === 0 ? (
            <div className="text-white/70 text-center py-4">
              Nenhuma conversa ainda.
              <br />
              Crie uma nova conversa para começar!
            </div>
          ) : (
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                    activeConversation === conversation.id
                      ? 'bg-primary/20 border border-primary/30'
                      : 'hover:bg-white/5'
                  }`}
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <MessageSquare className="w-4 h-4 text-primary-glow flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">
                        {conversation.title}
                      </div>
                      <div className="text-white/50 text-xs">
                        {new Date(conversation.updated_at).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conversation.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};
