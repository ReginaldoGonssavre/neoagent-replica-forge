
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Características", href: "#features" },
    { name: "Integrações", href: "#integrations" },
    { name: "Preços", href: "#pricing" },
    { name: "Suporte", href: "#support" }
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass-morphism border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Quantum */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-quantum animate-quantum-pulse">
                <Zap className="text-white w-6 h-6" />
              </div>
              <div className="absolute inset-0 w-10 h-10 bg-gradient-primary rounded-xl opacity-30 animate-ping"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-white via-primary-glow to-quantum-cyan bg-clip-text text-transparent">
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
              <a
                key={item.name}
                href={item.href}
                className="relative text-white/80 hover:text-white transition-all duration-300 font-medium group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-glow to-quantum-cyan transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
              Entrar
            </Button>
            <Button className="bg-gradient-primary hover:shadow-quantum transition-all duration-300 quantum-glow">
              Começar Grátis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
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
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors font-medium px-4 py-2 hover:bg-white/5 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 px-4">
                <Button variant="ghost" className="justify-start text-white/80 hover:text-white hover:bg-white/10">
                  Entrar
                </Button>
                <Button className="justify-start bg-gradient-primary hover:shadow-quantum">
                  Começar Grátis
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
