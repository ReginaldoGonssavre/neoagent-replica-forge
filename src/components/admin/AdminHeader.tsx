
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Menu, Settings, Shield, Download, Wifi, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface AdminHeaderProps {
  user: User;
  onSignOut: () => void;
  onToggleSidebar: () => void;
}

export const AdminHeader = ({ user, onSignOut, onToggleSidebar }: AdminHeaderProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastBackup, setLastBackup] = useState<string | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load last backup time from localStorage
    const savedBackup = localStorage.getItem('lastBackupTime');
    if (savedBackup) {
      setLastBackup(savedBackup);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleOfflineBackup = () => {
    try {
      const backupData = {
        timestamp: new Date().toISOString(),
        userSession: user,
        localData: localStorage.getItem('adminData') || '{}',
      };

      const blob = new Blob([JSON.stringify(backupData, null, 2)], {
        type: 'application/json'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `admin-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      const backupTime = new Date().toLocaleString('pt-BR');
      setLastBackup(backupTime);
      localStorage.setItem('lastBackupTime', backupTime);

      toast.success("Backup offline criado com sucesso!");
    } catch (error) {
      console.error('Erro ao criar backup:', error);
      toast.error("Erro ao criar backup offline");
    }
  };

  const getUserInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="text-white/80 hover:text-white lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-quantum">
              <Shield className="text-white w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-white via-primary-glow to-quantum-cyan bg-clip-text text-transparent">
                Ravian Admin
              </span>
              <span className="text-xs text-primary-glow -mt-1">
                Painel Administrativo
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-400" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-400" />
            )}
            <span className="text-sm text-white/70">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleOfflineBackup}
            className="text-white/80 hover:text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Backup
          </Button>

          {lastBackup && (
            <div className="hidden md:block text-xs text-white/50">
              Último backup: {lastBackup}
            </div>
          )}

          <div className="hidden md:block text-white/70 text-sm">
            Admin: {user.user_metadata?.full_name || user.email}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-gradient-primary text-white">
                    {getUserInitials(user.email || '')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleOfflineBackup} className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                <span>Backup Offline</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center text-red-600"
                onClick={onSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
