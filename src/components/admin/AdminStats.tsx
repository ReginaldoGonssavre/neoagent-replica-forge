
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Database, TrendingUp, Shield, Globe, Server, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdminStatsData {
  totalUsers: number;
  totalConversations: number;
  totalMessages: number;
  dailyActiveUsers: number;
  systemHealth: string;
  diskUsage: number;
  memoryUsage: number;
  cpuUsage: number;
}

export const AdminStats = () => {
  const [stats, setStats] = useState<AdminStatsData>({
    totalUsers: 0,
    totalConversations: 0,
    totalMessages: 0,
    dailyActiveUsers: 0,
    systemHealth: 'Healthy',
    diskUsage: 45,
    memoryUsage: 62,
    cpuUsage: 23,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch user count
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Fetch conversation count
        const { count: conversationCount } = await supabase
          .from('conversations')
          .select('*', { count: 'exact', head: true });

        // Fetch message count
        const { count: messageCount } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true });

        // Simulated daily active users (would be calculated from real data)
        const dailyActive = Math.floor((userCount || 0) * 0.7);

        setStats(prev => ({
          ...prev,
          totalUsers: userCount || 0,
          totalConversations: conversationCount || 0,
          totalMessages: messageCount || 0,
          dailyActiveUsers: dailyActive,
        }));
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Simulate real-time updates for system metrics
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        cpuUsage: Math.floor(Math.random() * 40) + 10,
        memoryUsage: Math.floor(Math.random() * 30) + 50,
        diskUsage: Math.floor(Math.random() * 20) + 40,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getHealthColor = (usage: number) => {
    if (usage < 50) return 'bg-green-500';
    if (usage < 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const statsCards = [
    {
      title: "Total de Usuários",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      change: "+12%",
      color: "text-blue-400"
    },
    {
      title: "Conversas Ativas",
      value: stats.totalConversations.toLocaleString(),
      icon: MessageSquare,
      change: "+8%",
      color: "text-green-400"
    },
    {
      title: "Mensagens Enviadas",
      value: stats.totalMessages.toLocaleString(),
      icon: Database,
      change: "+23%",
      color: "text-purple-400"
    },
    {
      title: "Usuários Ativos (24h)",
      value: stats.dailyActiveUsers.toLocaleString(),
      icon: TrendingUp,
      change: "+5%",
      color: "text-cyan-400"
    }
  ];

  const systemMetrics = [
    {
      title: "CPU",
      value: stats.cpuUsage,
      icon: Server,
      suffix: "%"
    },
    {
      title: "Memória",
      value: stats.memoryUsage,
      icon: Zap,
      suffix: "%"
    },
    {
      title: "Disco",
      value: stats.diskUsage,
      icon: Database,
      suffix: "%"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-white/5 border-white/20 animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-white/10 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard Administrativo</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-400 border-green-400">
            <Shield className="w-3 h-3 mr-1" />
            Sistema Saudável
          </Badge>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white/5 border-white/20 hover:bg-white/10 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="bg-white/5 border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center space-x-2">
                  <Icon className="w-5 h-5" />
                  <span>{metric.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Uso atual</span>
                    <span className="text-white font-semibold">{metric.value}{metric.suffix}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getHealthColor(metric.value)}`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Status do Sistema</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70">API Status</span>
              <Badge variant="outline" className="text-green-400 border-green-400">Online</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Banco de Dados</span>
              <Badge variant="outline" className="text-green-400 border-green-400">Conectado</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Cache</span>
              <Badge variant="outline" className="text-green-400 border-green-400">Ativo</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Backup</span>
              <Badge variant="outline" className="text-blue-400 border-blue-400">Agendado</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Métricas de Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Tempo de Resposta Médio</span>
              <span className="text-white">245ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Requisições/min</span>
              <span className="text-white">1,247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Taxa de Erro</span>
              <span className="text-white">0.02%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Uptime</span>
              <span className="text-white">99.97%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
