
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { MessageSquare, Zap, Clock, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  userId: string;
}

export const StatsCards = ({ userId }: StatsCardsProps) => {
  const [stats, setStats] = useState({
    totalConversations: 0,
    totalMessages: 0,
    todayRequests: 0,
    remainingRequests: 50
  });

  useEffect(() => {
    fetchStats();
  }, [userId]);

  const fetchStats = async () => {
    try {
      // Buscar total de conversas
      const { count: conversationsCount } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      // Buscar total de mensagens
      const { count: messagesCount } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      // Buscar uso da API hoje
      const today = new Date().toISOString().split('T')[0];
      const { data: apiUsage } = await supabase
        .from('api_usage')
        .select('requests_count')
        .eq('user_id', userId)
        .eq('date', today)
        .maybeSingle();

      const todayRequests = apiUsage?.requests_count || 0;
      const remainingRequests = Math.max(0, 50 - todayRequests); // Limite free: 50 por dia

      setStats({
        totalConversations: conversationsCount || 0,
        totalMessages: messagesCount || 0,
        todayRequests,
        remainingRequests
      });
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6 glass-morphism border-0 hover:shadow-elegant transition-all">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <MessageSquare className="text-white w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{stats.totalConversations}</div>
            <div className="text-white/70 text-sm">Conversas Totais</div>
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-morphism border-0 hover:shadow-elegant transition-all">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Zap className="text-white w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{stats.totalMessages}</div>
            <div className="text-white/70 text-sm">Mensagens Enviadas</div>
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-morphism border-0 hover:shadow-elegant transition-all">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <Clock className="text-white w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{stats.todayRequests}</div>
            <div className="text-white/70 text-sm">Requests Hoje</div>
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-morphism border-0 hover:shadow-elegant transition-all">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{stats.remainingRequests}</div>
            <div className="text-white/70 text-sm">Requests Restantes</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
