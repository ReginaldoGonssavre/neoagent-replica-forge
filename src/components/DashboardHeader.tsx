
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Menu, Settings, User as UserIcon, Zap } from "lucide-react";

interface DashboardHeaderProps {
  user: User;
  onSignOut: () => void;
  onToggleSidebar: () => void;
}

export const DashboardHeader = ({ user, onSignOut, onToggleSidebar }: DashboardHeaderProps) => {
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
              <Zap className="text-white w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-white via-primary-glow to-quantum-cyan bg-clip-text text-transparent">
                Ravian QuantumAI
              </span>
              <span className="text-xs text-primary-glow -mt-1">
                Dashboard
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-white/70 text-sm">
            Bem-vindo, {user.user_metadata?.full_name || user.email}
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
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
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
