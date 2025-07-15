
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  Download, 
  Filter, 
  RefreshCw,
  User,
  Shield,
  Database,
  Settings,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  description: string;
  ip: string;
  type: 'info' | 'warning' | 'error' | 'success';
  details?: string;
}

export const ActivityLogs = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    generateMockLogs();
  }, []);

  const generateMockLogs = () => {
    const mockLogs: ActivityLog[] = [
      {
        id: "1",
        timestamp: new Date().toISOString(),
        user: "admin@ravian.ai",
        action: "USER_LOGIN",
        description: "Login administrativo realizado",
        ip: "192.168.1.100",
        type: "success"
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        user: "user@example.com",
        action: "USER_REGISTER",
        description: "Novo usuário cadastrado",
        ip: "203.45.67.89",
        type: "info"
      },
      {
        id: "3",
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        user: "system",
        action: "BACKUP_CREATED",
        description: "Backup automático criado com sucesso",
        ip: "localhost",
        type: "success"
      },
      {
        id: "4",
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        user: "admin@ravian.ai",
        action: "SETTINGS_UPDATED",
        description: "Configurações do sistema atualizadas",
        ip: "192.168.1.100",
        type: "info"
      },
      {
        id: "5",
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        user: "user@test.com",
        action: "LOGIN_FAILED",
        description: "Tentativa de login falhada - senha incorreta",
        ip: "45.67.89.123",
        type: "warning"
      },
      {
        id: "6",
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        user: "system",
        action: "DATABASE_ERROR",
        description: "Erro de conexão com banco de dados detectado",
        ip: "localhost",
        type: "error",
        details: "Connection timeout after 30 seconds"
      }
    ];

    // Simulate loading
    setTimeout(() => {
      setLogs(mockLogs);
      setLoading(false);
    }, 1000);
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = !searchTerm || 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || log.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Shield className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4" />;
      case 'info':
      default:
        return <Database className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'success':
        return <Badge variant="outline" className="text-green-400 border-green-400">Sucesso</Badge>;
      case 'warning':
        return <Badge variant="outline" className="text-yellow-400 border-yellow-400">Aviso</Badge>;
      case 'error':
        return <Badge variant="outline" className="text-red-400 border-red-400">Erro</Badge>;
      case 'info':
      default:
        return <Badge variant="outline" className="text-blue-400 border-blue-400">Info</Badge>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR');
  };

  const handleExportLogs = () => {
    const logsData = JSON.stringify(filteredLogs, null, 2);
    const blob = new Blob([logsData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Logs exportados com sucesso!");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Logs de Atividade</h2>
        </div>
        <Card className="bg-white/5 border-white/20">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-white/10 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Logs de Atividade</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={generateMockLogs}
            className="border-white/20 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button
            variant="outline"
            onClick={handleExportLogs}
            className="border-white/20 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <Input
                  placeholder="Buscar por usuário, ação ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
            >
              <option value="all" className="bg-slate-800">Todos os Tipos</option>
              <option value="success" className="bg-slate-800">Sucesso</option>
              <option value="info" className="bg-slate-800">Informação</option>
              <option value="warning" className="bg-slate-800">Aviso</option>
              <option value="error" className="bg-slate-800">Erro</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="bg-white/5 border-white/20">
        <CardHeader>
          <CardTitle className="text-white">
            Histórico de Atividades ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-white/70">Timestamp</TableHead>
                <TableHead className="text-white/70">Usuário</TableHead>
                <TableHead className="text-white/70">Ação</TableHead>
                <TableHead className="text-white/70">Descrição</TableHead>
                <TableHead className="text-white/70">IP</TableHead>
                <TableHead className="text-white/70">Tipo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="border-white/10">
                  <TableCell className="text-white/70 font-mono text-sm">
                    {formatTimestamp(log.timestamp)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-white/50" />
                      <span className="text-white">{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(log.type)}
                      <code className="text-white/90 bg-white/10 px-2 py-1 rounded text-sm">
                        {log.action}
                      </code>
                    </div>
                  </TableCell>
                  <TableCell className="text-white/70 max-w-xs truncate">
                    {log.description}
                    {log.details && (
                      <div className="text-xs text-white/50 mt-1">
                        {log.details}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-white/70 font-mono text-sm">
                    {log.ip}
                  </TableCell>
                  <TableCell>{getTypeBadge(log.type)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-8 text-white/50">
              Nenhum log encontrado com os filtros aplicados.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
