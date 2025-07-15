
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Key, 
  Plus, 
  MoreHorizontal, 
  Copy, 
  Eye, 
  EyeOff, 
  Trash2,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  created: string;
  lastUsed: string | null;
  active: boolean;
}

export const APIKeys = () => {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: "1",
      name: "OpenAI Integration",
      key: "sk-xxx...xxx123",
      permissions: ["chat", "completions"],
      created: "2024-01-15",
      lastUsed: "2024-01-20",
      active: true
    },
    {
      id: "2",
      name: "Stripe Payments",
      key: "sk-test_xxx...xxx456",
      permissions: ["payments", "webhooks"],
      created: "2024-01-10",
      lastUsed: null,
      active: true
    },
    {
      id: "3",
      name: "Analytics API",
      key: "ak-xxx...xxx789",
      permissions: ["analytics", "reports"],
      created: "2024-01-05",
      lastUsed: "2024-01-19",
      active: false
    }
  ]);

  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>([]);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const availablePermissions = [
    "chat", "completions", "payments", "webhooks", 
    "analytics", "reports", "users", "admin"
  ];

  const generateAPIKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'sk-';
    for (let i = 0; i < 48; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Nome da chave é obrigatório");
      return;
    }

    if (newKeyPermissions.length === 0) {
      toast.error("Selecione pelo menos uma permissão");
      return;
    }

    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: generateAPIKey(),
      permissions: [...newKeyPermissions],
      created: new Date().toISOString().split('T')[0],
      lastUsed: null,
      active: true
    };

    setApiKeys(prev => [newKey, ...prev]);
    setNewKeyName("");
    setNewKeyPermissions([]);
    setShowNewKeyForm(false);
    toast.success("Chave API criada com sucesso!");
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("Chave copiada para a área de transferência!");
  };

  const handleToggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const handleDeleteKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId));
    toast.success("Chave API removida com sucesso!");
  };

  const handleToggleKeyStatus = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId ? { ...key, active: !key.active } : key
    ));
    toast.success("Status da chave atualizado!");
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 8) + '...' + key.substring(key.length - 4);
  };

  const handlePermissionToggle = (permission: string) => {
    setNewKeyPermissions(prev => 
      prev.includes(permission) 
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gerenciamento de Chaves API</h2>
        <Button
          onClick={() => setShowNewKeyForm(true)}
          className="bg-gradient-primary hover:shadow-quantum"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Chave API
        </Button>
      </div>

      {/* New API Key Form */}
      {showNewKeyForm && (
        <Card className="bg-white/5 border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Key className="w-5 h-5" />
              <span>Criar Nova Chave API</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keyName" className="text-white">Nome da Chave</Label>
              <Input
                id="keyName"
                placeholder="Ex: OpenAI Integration"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Permissões</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {availablePermissions.map((permission) => (
                  <label key={permission} className="flex items-center space-x-2 text-white/70">
                    <input
                      type="checkbox"
                      checked={newKeyPermissions.includes(permission)}
                      onChange={() => handlePermissionToggle(permission)}
                      className="rounded border-white/20"
                    />
                    <span className="text-sm">{permission}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowNewKeyForm(false)}
                className="border-white/20 text-white"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateKey}
                className="bg-gradient-primary hover:shadow-quantum"
              >
                Criar Chave
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Keys Table */}
      <Card className="bg-white/5 border-white/20">
        <CardHeader>
          <CardTitle className="text-white">
            Chaves API Cadastradas ({apiKeys.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-white/70">Nome</TableHead>
                <TableHead className="text-white/70">Chave</TableHead>
                <TableHead className="text-white/70">Permissões</TableHead>
                <TableHead className="text-white/70">Criado</TableHead>
                <TableHead className="text-white/70">Último Uso</TableHead>
                <TableHead className="text-white/70">Status</TableHead>
                <TableHead className="text-white/70">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id} className="border-white/10">
                  <TableCell className="text-white font-medium">
                    {apiKey.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <code className="text-white/90 bg-white/10 px-2 py-1 rounded text-sm font-mono">
                        {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleKeyVisibility(apiKey.id)}
                        className="text-white/70 hover:text-white p-1"
                      >
                        {visibleKeys.has(apiKey.id) ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyKey(apiKey.key)}
                        className="text-white/70 hover:text-white p-1"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {apiKey.permissions.slice(0, 2).map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                      {apiKey.permissions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{apiKey.permissions.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-white/70">
                    {new Date(apiKey.created).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-white/70">
                    {apiKey.lastUsed 
                      ? new Date(apiKey.lastUsed).toLocaleDateString('pt-BR')
                      : 'Nunca usado'
                    }
                  </TableCell>
                  <TableCell>
                    {apiKey.active ? (
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        Ativa
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-red-400 border-red-400">
                        Inativa
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-white/70">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleToggleKeyStatus(apiKey.id)}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          {apiKey.active ? 'Desativar' : 'Ativar'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCopyKey(apiKey.key)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copiar Chave
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteKey(apiKey.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Deletar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {apiKeys.length === 0 && (
            <div className="text-center py-8 text-white/50">
              Nenhuma chave API cadastrada ainda.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
