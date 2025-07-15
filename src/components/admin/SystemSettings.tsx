
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Save, 
  Database, 
  Shield, 
  Mail, 
  Globe, 
  Settings as SettingsIcon,
  Download,
  Upload
} from "lucide-react";

export const SystemSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "Ravian QuantumAI",
    siteDescription: "Plataforma de IA avançada",
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    backupFrequency: "daily",
    maxUsers: 10000,
    maxConversationsPerUser: 100,
    sessionTimeout: 24,
    adminEmail: "admin@ravian.ai",
  });

  const [loading, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage for offline functionality
      localStorage.setItem('systemSettings', JSON.stringify(settings));
      
      toast.success("Configurações salvas com sucesso!");
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast.error("Erro ao salvar configurações");
    } finally {
      setSaving(false);
    }
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `system-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Configurações exportadas com sucesso!");
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string);
        setSettings(prev => ({ ...prev, ...importedSettings }));
        toast.success("Configurações importadas com sucesso!");
      } catch (error) {
        toast.error("Erro ao importar configurações. Arquivo inválido.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Configurações do Sistema</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleExportSettings}
            className="border-white/20 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white"
            onClick={() => document.getElementById('import-file')?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </Button>
          <input
            id="import-file"
            type="file"
            accept=".json"
            onChange={handleImportSettings}
            className="hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="bg-white/5 border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <SettingsIcon className="w-5 h-5" />
              <span>Configurações Gerais</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName" className="text-white">Nome do Site</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="siteDescription" className="text-white">Descrição</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail" className="text-white">Email do Administrador</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings(prev => ({ ...prev, adminEmail: e.target.value }))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* System Controls */}
        <Card className="bg-white/5 border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Controles do Sistema</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Modo Manutenção</Label>
                <p className="text-sm text-white/60">Desabilita o acesso público ao site</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, maintenanceMode: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Cadastro Habilitado</Label>
                <p className="text-sm text-white/60">Permite novos usuários se cadastrarem</p>
              </div>
              <Switch
                checked={settings.registrationEnabled}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, registrationEnabled: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Notificações por Email</Label>
                <p className="text-sm text-white/60">Envia emails para eventos importantes</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Limits & Performance */}
        <Card className="bg-white/5 border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Limites e Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxUsers" className="text-white">Máximo de Usuários</Label>
              <Input
                id="maxUsers"
                type="number"
                value={settings.maxUsers}
                onChange={(e) => setSettings(prev => ({ ...prev, maxUsers: parseInt(e.target.value) }))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxConversations" className="text-white">Máx. Conversas por Usuário</Label>
              <Input
                id="maxConversations"
                type="number"
                value={settings.maxConversationsPerUser}
                onChange={(e) => setSettings(prev => ({ ...prev, maxConversationsPerUser: parseInt(e.target.value) }))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout" className="text-white">Timeout de Sessão (horas)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Backup Settings */}
        <Card className="bg-white/5 border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Configurações de Backup</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Frequência de Backup</Label>
              <select
                value={settings.backupFrequency}
                onChange={(e) => setSettings(prev => ({ ...prev, backupFrequency: e.target.value }))}
                className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
              >
                <option value="hourly" className="bg-slate-800">A cada hora</option>
                <option value="daily" className="bg-slate-800">Diário</option>
                <option value="weekly" className="bg-slate-800">Semanal</option>
                <option value="monthly" className="bg-slate-800">Mensal</option>
              </select>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-white/60 mb-2">Último backup: Hoje às 03:00</p>
              <p className="text-sm text-white/60">Próximo backup: Amanhã às 03:00</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-gradient-primary hover:shadow-quantum min-w-32"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {loading ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </div>
    </div>
  );
};
