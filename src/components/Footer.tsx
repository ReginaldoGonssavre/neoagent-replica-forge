
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, Mail, Zap, Code } from "lucide-react";

export const Footer = () => {
  const footerSections = [
    {
      title: "Produto",
      links: [
        { name: "Agente IA", href: "#" },
        { name: "API", href: "#" },
        { name: "Integrações", href: "#" },
        { name: "Documentação", href: "#" }
      ]
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre", href: "#" },
        { name: "Blog Técnico", href: "#" },
        { name: "Carreiras", href: "#" },
        { name: "Contato", href: "#" }
      ]
    },
    {
      title: "Suporte",
      links: [
        { name: "Central de Ajuda", href: "#" },
        { name: "Status do Sistema", href: "#" },
        { name: "Relatórios de Bugs", href: "#" },
        { name: "Comunidade", href: "#" }
      ]
    },
    {
      title: "Desenvolvedores",
      links: [
        { name: "API Docs", href: "#" },
        { name: "SDKs", href: "#" },
        { name: "Webhooks", href: "#" },
        { name: "Changelog", href: "#" }
      ]
    }
  ];

  return (
    <footer className="relative bg-gradient-subtle border-t border-white/10">
      {/* Quantum Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
               `,
               backgroundSize: '30px 30px'
             }} 
        />
      </div>

      <div className="relative container mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-quantum">
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
            <p className="text-white/80 mb-6 max-w-md leading-relaxed">
              Agente de inteligência artificial profissional para automação 
              empresarial. Tecnologia comprovada, suporte especializado e 
              integração completa para seu negócio.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-primary-glow hover:bg-white/5 transition-all duration-300">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-primary-glow hover:bg-white/5 transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-primary-glow hover:bg-white/5 transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-primary-glow hover:bg-white/5 transition-all duration-300">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-primary-glow">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-sm flex items-center space-x-2">
              <Code className="w-4 h-4 text-primary-glow" />
              <span>© 2024 Ravian QuantumAi. Todos os direitos reservados.</span>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-300">
                Privacidade
              </a>
              <a href="#" className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-300">
                Termos de Uso
              </a>
              <a href="#" className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-300">
                SLA
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
