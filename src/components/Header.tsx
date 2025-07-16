
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, LogIn, UserPlus, Settings, Crown, Shield, Atom, Cpu, Bot } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Recursos", href: "#features" },
    { name: "Agente IA", href: "/ai-agent", isRoute: true },
    { name: "Planos", href: "#pricing" },
    { name: "API", href: "#api" },
    { name: "Documentação", href: "#docs" },
    { name: "Suporte", href: "#support" }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isRoute) {
      navigate(item.href);
    } else {
      // Para âncoras, apenas navegue normalmente
      window.location.href = item.href;
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-morphism border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo Quantum with 4K Icons */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate("/")}>
            <div className="relative flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-quantum animate-quantum-pulse quantum-icon">
                <Zap className="text-white w-7 h-7" />
              </div>
              <div className="quantum-icon">
                <Atom className="w-6 h-6 text-white/80" />
              </div>
              <div className="quantum-icon">
                <Cpu className="w-5 h-5 text-primary-glow" />
              </div>
              <div className="quantum-icon">
                <Bot className="w-5 h-5 text-quantum-cyan" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">
                Ravian
              </span>
              <span className="text-sm text-primary-glow font-medium -mt-1">
                QuantumAi
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="relative text-white/90 hover:text-white transition-all duration-300 font-medium group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-glow to-quantum-cyan transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              className="text-white/90 hover:text-white hover:bg-white/10"
              onClick={() => navigate("/auth")}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button 
              variant="ghost" 
              className="text-white/90 hover:text-white hover:bg-white/10"
              onClick={() => navigate("/auth")}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Cadastrar
            </Button>
            <Button 
              className="bg-white text-primary hover:bg-white/90 shadow-quantum transition-all duration-300"
              onClick={() => navigate("/auth")}
            >
              <Crown className="w-4 h-4 mr-2" />
              Teste Grátis
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white/80 hover:text-white quantum-icon"
              onClick={() => navigate("/admin")}
            >
              <Shield className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white quantum-icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/90 hover:text-white transition-colors quantum-icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 glass-morphism">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-left text-white/90 hover:text-white transition-colors font-medium px-4 py-2 hover:bg-white/5 rounded-lg"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4 px-4">
                <Button 
                  variant="ghost" 
                  className="justify-start text-white/90 hover:text-white hover:bg-white/10"
                  onClick={() => {
                    navigate("/auth");
                    setIsMenuOpen(false);
                  }}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start text-white/90 hover:text-white hover:bg-white/10"
                  onClick={() => {
                    navigate("/auth");
                    setIsMenuOpen(false);
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Cadastrar
                </Button>
                <Button 
                  className="justify-start bg-white text-primary hover:bg-white/90"
                  onClick={() => {
                    navigate("/auth");
                    setIsMenuOpen(false);
                  }}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Teste Grátis
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start text-white/90 hover:text-white hover:bg-white/10"
                  onClick={() => {
                    navigate("/admin");
                    setIsMenuOpen(false);
                  }}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
