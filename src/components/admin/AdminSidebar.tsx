
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  Key, 
  X,
  Shield,
  Database,
  Activity,
  Globe
} from "lucide-react";

type AdminSection = 'dashboard' | 'users' | 'settings' | 'logs' | 'api-keys';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Usuários', icon: Users },
  { id: 'api-keys', label: 'Chaves API', icon: Key },
  { id: 'logs', label: 'Logs de Atividade', icon: FileText },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

export const AdminSidebar = ({ isOpen, onClose, activeSection, onSectionChange }: AdminSidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-black/30 backdrop-blur-sm border-r border-white/10 transform transition-transform duration-300 ease-in-out z-50",
        "lg:relative lg:top-0 lg:h-[calc(100vh-4rem)] lg:transform-none lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full p-4">
          {/* Close button for mobile */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <span className="text-white font-semibold">Menu Admin</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Menu items */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-white/80 hover:text-white hover:bg-white/10",
                    isActive && "bg-white/20 text-white"
                  )}
                  onClick={() => {
                    onSectionChange(item.id as AdminSection);
                    onClose(); // Close sidebar on mobile after selection
                  }}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Status indicators */}
          <div className="mt-auto pt-4 border-t border-white/10">
            <div className="space-y-2 text-xs text-white/60">
              <div className="flex items-center space-x-2">
                <Database className="w-3 h-3" />
                <span>DB: Conectado</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-3 h-3" />
                <span>Sistema: Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-3 h-3" />
                <span>Segurança: Ativa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
