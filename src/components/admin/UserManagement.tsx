
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Search, 
  MoreHorizontal, 
  UserPlus, 
  Ban, 
  CheckCircle, 
  Crown,
  Filter
} from "lucide-react";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  subscription_plan: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar usuários:', error);
        toast.error("Erro ao carregar usuários");
        return;
      }

      setUsers(data || []);
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error("Erro inesperado ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  const updateUserPlan = async (userId: string, newPlan: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ subscription_plan: newPlan })
        .eq('id', userId);

      if (error) {
        console.error('Erro ao atualizar plano:', error);
        toast.error("Erro ao atualizar plano do usuário");
        return;
      }

      toast.success(`Plano atualizado para ${newPlan}`);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error("Erro inesperado ao atualizar plano");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlan = filterPlan === "all" || user.subscription_plan === filterPlan;
    
    return matchesSearch && matchesPlan;
  });

  const getPlanBadge = (plan: string | null) => {
    switch (plan) {
      case 'free':
        return <Badge variant="outline" className="text-gray-400 border-gray-400">Free</Badge>;
      case 'premium':
        return <Badge variant="outline" className="text-blue-400 border-blue-400">Premium</Badge>;
      case 'enterprise':
        return <Badge variant="outline" className="text-purple-400 border-purple-400">Enterprise</Badge>;
      default:
        return <Badge variant="outline" className="text-gray-400 border-gray-400">Free</Badge>;
    }
  };

  const getUserInitials = (email: string | null) => {
    if (!email) return 'U';
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Gerenciamento de Usuários</h2>
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
        <h2 className="text-2xl font-bold text-white">Gerenciamento de Usuários</h2>
        <Button className="bg-gradient-primary hover:shadow-quantum">
          <UserPlus className="w-4 h-4 mr-2" />
          Adicionar Usuário
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <Input
                  placeholder="Buscar por email ou nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar: {filterPlan === 'all' ? 'Todos' : filterPlan}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterPlan('all')}>
                  Todos os Planos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterPlan('free')}>
                  Free
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterPlan('premium')}>
                  Premium
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterPlan('enterprise')}>
                  Enterprise
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-white/5 border-white/20">
        <CardHeader>
          <CardTitle className="text-white">
            Usuários Cadastrados ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-white/70">Usuário</TableHead>
                <TableHead className="text-white/70">Email</TableHead>
                <TableHead className="text-white/70">Plano</TableHead>
                <TableHead className="text-white/70">Cadastro</TableHead>
                <TableHead className="text-white/70">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-white/10">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar_url || ''} />
                        <AvatarFallback className="bg-gradient-primary text-white text-xs">
                          {getUserInitials(user.email)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white font-medium">
                        {user.full_name || 'Sem nome'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-white/70">{user.email}</TableCell>
                  <TableCell>{getPlanBadge(user.subscription_plan)}</TableCell>
                  <TableCell className="text-white/70">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-white/70">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateUserPlan(user.id, 'premium')}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Promover para Premium
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateUserPlan(user.id, 'enterprise')}>
                          <Crown className="mr-2 h-4 w-4" />
                          Promover para Enterprise
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateUserPlan(user.id, 'free')}>
                          <Ban className="mr-2 h-4 w-4" />
                          Rebaixar para Free
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-white/50">
              Nenhum usuário encontrado com os filtros aplicados.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
